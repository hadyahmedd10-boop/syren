// Contrast audit for syrentravel.com (WCAG 2.1 AA).
//
// The URL list is read from the site's own /sitemap.xml (never hard-coded), so
// every indexable page is covered. For each page, in light AND dark mode, at a
// mobile and a desktop width, the script finds every visible
//   a, button, [role=button], input, select, textarea, label, summary,
//   [role=tab], .syren-pill / [class*="badge"] / [class*="chip"] / [class*="tab"]
// and measures the real rendered contrast:
//   - it reads the element's computed text colour (or its ::placeholder),
//   - it sets `color: transparent !important` inline on every element (inline
//     `!important` outranks every stylesheet rule, including the `!important`
//     ones in globals.css), screenshots each candidate's box and samples the
//     real background pixels behind the element's own text lines, so images,
//     gradients and translucent surfaces are handled correctly (worst-case
//     pixel wins),
//   - it also forces :hover / :focus-visible / :active / :disabled via CDP
//     (`CSS.forcePseudoState`) and re-measures, resolving the state's background
//     from the element + ancestor background colours.
// Fixed overlays are audited in their own pass: the full-screen mobile menu
// (page content is measured with it closed, since the overlay covers
// everything) and the cookie banner / floating WhatsApp button (the page is
// measured with those nodes removed, so nothing is sampled through them).
// Failures: text < 4.5:1 (3:1 for large >=24px or >=18.66px bold); any control
// whose fill/border/text is < 3:1.
//
// Usage:
//   1. npm run build
//   2. npm run start        (or) npm run dev
//   3. node scripts/audit-contrast.mjs
//
// Env overrides:
//   AUDIT_BASE_URL      target origin              (default http://localhost:3000)
//   AUDIT_PATHS         comma list OR /regex/ of paths to keep
//   AUDIT_MODES         light,dark                 (default both)
//   AUDIT_VIEWPORTS     390,1440                   (default both)
//   AUDIT_MAX_ELEMENTS  per page cap               (default 400)
//   AUDIT_REPORT        write the table to this file as well as stdout
//   AUDIT_SHOTS         1 = also write hero before/after screenshots to docs/audit/
//   AUDIT_LABEL         label used in the screenshot filenames ("before" / "after")

import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const MODES = (process.env.AUDIT_MODES || "light,dark").split(",").map((s) => s.trim());
const VIEWPORTS = (process.env.AUDIT_VIEWPORTS || "390,1440")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter(Boolean);
const MAX_ELEMENTS = Number(process.env.AUDIT_MAX_ELEMENTS || 400);
const WANT_SHOTS = process.env.AUDIT_SHOTS === "1";
const SHOT_LABEL = process.env.AUDIT_LABEL || "run";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SHOT_DIR = join(__dirname, "..", "docs", "audit");

// ----------------------------------------------------------------------------
// Colour parsing — handles rgb()/rgba(), #hex, color(srgb …) and oklab()/oklch()
// (Tailwind v4 emits the modern syntaxes for color-mix / opacity modifiers).
// ----------------------------------------------------------------------------
function gammaToLinear(v) {
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function linearToGamma(v) {
  v = Math.max(0, Math.min(1, v));
  return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}
function oklabToRgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return {
    r: Math.round(linearToGamma(r) * 255),
    g: Math.round(linearToGamma(g) * 255),
    b: Math.round(linearToGamma(bb) * 255),
  };
}

function parseColor(str) {
  if (!str) return null;
  const s = String(str).trim();
  if (s === "transparent" || s === "none") return { r: 0, g: 0, b: 0, a: 0 };

  let m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    const [r, g, b, a = 1] = p;
    if ([r, g, b].some((v) => !Number.isFinite(v))) return null;
    return { r, g, b, a };
  }

  m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    if (h.length === 6) h += "ff";
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: parseInt(h.slice(6, 8), 16) / 255,
    };
  }

  m = s.match(/^color\(srgb\s+([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\)$/i);
  if (m) {
    return {
      r: Number(m[1]) * 255,
      g: Number(m[2]) * 255,
      b: Number(m[3]) * 255,
      a: m[4] === undefined ? 1 : Number(m[4]),
    };
  }

  m = s.match(/^oklab\(\s*([\d.eE+-]+%?)\s+([\d.eE+-]+%?)\s+([\d.eE+-]+%?)(?:\s*\/\s*([\d.eE+-]+%?))?\s*\)$/i);
  if (m) {
    const num = (v) => (v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v));
    const { r, g, b } = oklabToRgb(num(m[1]), num(m[2]), num(m[3]));
    return { r, g, b, a: m[4] === undefined ? 1 : num(m[4]) };
  }

  m = s.match(/^oklch\(\s*([\d.eE+-]+%?)\s+([\d.eE+-]+%?)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+%?))?\s*\)$/i);
  if (m) {
    const num = (v) => (v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v));
    const L = num(m[1]);
    const C = num(m[2]);
    const h = (Number(m[3]) * Math.PI) / 180;
    const { r, g, b } = oklabToRgb(L, C * Math.cos(h), C * Math.sin(h));
    return { r, g, b, a: m[4] === undefined ? 1 : num(m[4]) };
  }

  return null;
}

/** Flatten `fg` (possibly translucent) over opaque `bg`. */
function composite(fg, bg) {
  const a = fg.a ?? 1;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function luminance({ r, g, b }) {
  return (
    0.2126 * gammaToLinear(r / 255) +
    0.7152 * gammaToLinear(g / 255) +
    0.0722 * gammaToLinear(b / 255)
  );
}

function ratio(fg, bg) {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

const round = (n) => Math.round(n * 100) / 100;
const rgbCss = (c) => `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;
const WHITE = { r: 255, g: 255, b: 255, a: 1 };

// ----------------------------------------------------------------------------
// Page-side collector (runs in the browser)
// ----------------------------------------------------------------------------
const COLLECT = (opts) => {
  const max = (opts && opts.max) || 400;
  const scope = (opts && opts.scope) || "all";
  const CANDIDATE = [
    "a",
    "button",
    "[role=button]",
    "input",
    "select",
    "textarea",
    "label",
    "summary",
    "[role=tab]",
    ".syren-pill",
    "[class*=badge]",
    "[class*=chip]",
    "[class*=tab]",
  ].join(",");

  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    // Walk the ancestor chain for opacity:0 too. framer-motion leaves a
    // scroll-reveal wrapper at opacity:0 until it enters the viewport; an
    // element inside it is not rendered, so sampling it would capture whatever
    // sits *behind* the wrapper (e.g. a hero photo) and report a bogus failure.
    // opacity is not overridable by descendants, so this is exact and mirrors
    // axe-core's handling of hidden ancestors.
    let n = el;
    for (let i = 0; n && n.nodeType === 1 && i < 30; i++) {
      if (getComputedStyle(n).opacity === "0") return false;
      n = n.parentElement;
    }
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    return true;
  };

  const bgChain = (el) => {
    const chain = [];
    let n = el;
    let i = 0;
    while (n && n.nodeType === 1 && i < 12) {
      const cs = getComputedStyle(n);
      chain.push(cs.backgroundColor);
      if (cs.backgroundImage && cs.backgroundImage !== "none") chain.push("__image__");
      n = n.parentElement;
      i++;
    }
    return chain;
  };

  // Every text-node client rect of this element, relative to the element box.
  // The contrast sample must cover the region *behind the text*, not the whole
  // control and not a bounding box spanning unrelated content — otherwise a
  // logo glyph, a chevron icon, a card photo or (as in an "On the ground" tile)
  // the vehicle thumbnails between two paragraphs are mistaken for the
  // background.
  const textRects = (el) => {
    const er = el.getBoundingClientRect();
    const rects = [];
    // The candidate is judged using its OWN computed colour, which is only the
    // colour its own text renders in. A descendant that sets its own `color`
    // (e.g. a gold price badge sitting on a card photo inside a whole-card
    // link) is not painted in the candidate's colour, so measuring it against
    // the candidate's colour would be a false positive. Such text is measured
    // by its own candidate when it is interactive/label-like.
    const ownColor = getComputedStyle(el).color;
    // Text inside a hover-only tooltip (opacity-0 / visibility:hidden) is not
    // rendered, so its rects must not be used as sampling regions.
    const hidden = (node) => {
      let n = node.parentElement;
      while (n && n !== el && el.contains(n)) {
        const cs = getComputedStyle(n);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return true;
        n = n.parentElement;
      }
      return false;
    };
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.textContent || !n.textContent.trim()) continue;
      if (hidden(n)) continue;
      if (n.parentElement && getComputedStyle(n.parentElement).color !== ownColor) continue;
      const rg = document.createRange();
      rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) {
        if (r.width < 2 || r.height < 2) continue;
        rects.push({ x: r.left - er.left, y: r.top - er.top, w: r.width, h: r.height });
        if (rects.length >= 12) break;
      }
      if (rects.length >= 12) break;
    }
    return rects;
  };

  // Fixed overlays are audited in their own passes: while the mobile menu is
  // open it covers the whole page, and the cookie banner / floating WhatsApp
  // button sit on top of whatever is scrolled behind them. For the page pass
  // those nodes are removed from the DOM first, so no sample is taken through
  // them.
  const collectWithin = (roots, limit) => {
    const out = [];
    for (const el of Array.from(document.querySelectorAll(CANDIDATE))) {
      if (out.length >= limit) break;
      if (roots && !roots.some((r) => r === el || r.contains(el))) continue;
      if (el.closest("[data-contrast-ignore]")) continue;
      if (el.getAttribute("aria-hidden") === "true") continue;
      if (el.hasAttribute("hidden")) continue;
      if (el.closest("[aria-hidden=true]")) continue;
      if (!visible(el)) continue;

      const cs = getComputedStyle(el);
      const isInput = /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName);
      const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
      const icon = el.querySelector("svg,img");
      const rects = textRects(el);
      const iconColor = icon ? getComputedStyle(icon).color : null;
      // Nothing visible to measure — e.g. an anchor whose only text lives in a
      // hover-only tooltip. Skip it unless it holds an icon (an icon-only
      // control is judged by its icon) or is a form control.
      if (!rects.length && !iconColor && !isInput) continue;

      const idx = out.length;
      el.setAttribute("data-audit-idx", String(idx));

      const fs = parseFloat(cs.fontSize) || 16;
      const fw = Number(cs.fontWeight) || 400;
      const placeholder = isInput ? getComputedStyle(el, "::placeholder").color : null;
      const usePlaceholder = isInput && !el.value && !!placeholder;

      // Element box in document coordinates (the page is at scroll 0 here, and
      // the page pass captures one full-page screenshot, so these map 1:1 onto
      // that image).
      const bx = el.getBoundingClientRect();
      out.push({
        idx,
        tag: el.tagName.toLowerCase(),
        cls: (el.className && String(el.className).slice(0, 80)) || "",
        text,
        top: Math.round(bx.top + window.scrollY),
        left: Math.round(bx.left + window.scrollX),
        w: Math.round(bx.width),
        h: Math.round(bx.height),
        isInput,
        large: fs >= 24 || (fs >= 18.66 && fw >= 700),
        fs,
        fw,
        locked: el.disabled === true || el.getAttribute("aria-disabled") === "true",
        textColor: usePlaceholder ? placeholder : cs.color,
        iconColor,
        iconOnly: !rects.length && !!iconColor && !isInput,
        bgChain: bgChain(el),
        textRects: rects,
        borderColor: cs.borderTopColor,
        borderWidth: parseFloat(cs.borderTopWidth) || 0,
      });
    }
    return out;
  };

  if (scope === "menu") {
    const menuRoot = [...document.body.children].find((el) => {
      const c = getComputedStyle(el);
      return (
        c.position === "fixed" &&
        Number(c.zIndex || 0) >= 1000 &&
        el.getBoundingClientRect().height > window.innerHeight * 0.8
      );
    });
    if (!menuRoot) return [];
    return collectWithin([menuRoot], max);
  }
  if (scope === "overlays") {
    // The fixed bottom bars (mobile booking bars, the festival sticky CTA) are
    // detached during the page pass (they overlay whatever is scrolled behind
    // them), so they are measured here instead — forced into their visible
    // position first, since at scroll 0 they are translated off-screen.
    for (const el of document.querySelectorAll("body *")) {
      const c = getComputedStyle(el);
      if (c.position !== "fixed") continue;
      const r = el.getBoundingClientRect();
      const fullWidth = r.width >= window.innerWidth * 0.6;
      const anchoredBottom = r.top >= window.innerHeight - 4 || r.bottom >= window.innerHeight - 4;
      if (fullWidth && anchoredBottom && r.height > 8 && r.height <= 120) {
        el.classList.remove("translate-y-full");
        el.setAttribute("data-audit-overlay", "1");
      }
    }
    const roots = [
      document.querySelector('[aria-label="Cookie consent"]'),
      document.querySelector('a[aria-label="Chat with us on WhatsApp"]'),
      ...document.querySelectorAll('[data-audit-overlay]'),
    ].filter(Boolean);
    if (!roots.length) return [];
    return collectWithin(roots, max);
  }
  return collectWithin(null, max);
};

// ----------------------------------------------------------------------------
// Worst-case background sampling from a screenshot
// ----------------------------------------------------------------------------
async function decodeImage(buf) {
  try {
    const raw = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { data, info } = raw;
    if (!info.width || !info.height) return null;
    return { data, width: info.width, height: info.height, channels: info.channels };
  } catch {
    return null;
  }
}

function sampleBgRaw(img, fgRgb, subs) {
  if (!img) return null;
  const { data, width, height, channels } = img;

  const boxRatio = (x0, y0, x1, y1) => {
    let worst = null;
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      for (let j = 0; j <= steps; j++) {
        const x = Math.min(width - 1, Math.max(0, Math.round(x0 + ((x1 - x0) * i) / steps)));
        const y = Math.min(height - 1, Math.max(0, Math.round(y0 + ((y1 - y0) * j) / steps)));
        const o = (y * width + x) * channels;
        const px = { r: data[o], g: data[o + 1], b: data[o + 2], a: data[o + 3] / 255 };
        const bg = px.a < 0.999 ? composite(px, WHITE) : px;
        const r = ratio(fgRgb, bg);
        if (!worst || r < worst.ratio) worst = { ratio: r, bg };
      }
    }
    return worst;
  };

  // Prefer the element's own text boxes — the regions the text actually sits on.
  let worst = null;
  const list = Array.isArray(subs) ? subs : [];
  for (const s of list) {
    const x0 = Math.max(0, Math.round(s.x) + 1);
    const y0 = Math.max(0, Math.round(s.y) + 1);
    const x1 = Math.min(width - 1, Math.round(s.x + s.w) - 1);
    const y1 = Math.min(height - 1, Math.round(s.y + s.h) - 1);
    if (x1 - x0 < 1 || y1 - y0 < 1) continue;
    const w = boxRatio(x0, y0, x1, y1);
    if (w && (!worst || w.ratio < worst.ratio)) worst = w;
  }
  if (worst) return worst;

  // Otherwise (e.g. an <input>, which has no text nodes) fall back to a central
  // band, inset so whatever shows through a rounded corner or anti-aliased edge
  // is not mistaken for the background.
  const insetBase = Math.max(3, Math.floor(Math.min(width, height) * 0.18));
  const insetX = Math.min(insetBase, Math.floor(width / 3));
  const insetY = Math.min(insetBase, Math.floor(height / 3));
  return boxRatio(insetX, insetY, Math.max(insetX, width - 1 - insetX), Math.max(insetY, height - 1 - insetY));
}

async function sampleBgBuffer(buf, fgRgb, subs) {
  return sampleBgRaw(await decodeImage(buf), fgRgb, subs);
}

/** Resolve a background colour from an element's ancestor background chain. */
function resolveFromChain(chain, fallback) {
  const list = chain || [];
  // Emulate CSS stacking: find the nearest fully-opaque layer (an image stops
  // the walk — its pixels are unknown here), then composite every translucent
  // layer in front of it, front-to-back, over that base.
  let base = null;
  let k = list.length;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === "__image__") {
      k = i;
      break;
    }
    const p = parseColor(list[i]);
    if (p && p.a >= 0.999) {
      k = i;
      base = p;
      break;
    }
  }
  if (!base) base = fallback;
  for (let i = k - 1; i >= 0; i--) {
    if (list[i] === "__image__") continue;
    const p = parseColor(list[i]);
    if (!p || p.a <= 0) continue;
    base = p.a >= 0.999 ? p : composite(p, base);
  }
  return base;
}

const same = (a, b) =>
  a && b && Math.abs(a.r - b.r) < 2 && Math.abs(a.g - b.g) < 2 && Math.abs(a.b - b.b) < 2;

// ----------------------------------------------------------------------------
// Audit one page in one mode at one viewport
// ----------------------------------------------------------------------------
async function auditPage(browser, path, mode, width, failures, stats, scope = "page") {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await context.addInitScript((m) => {
    try {
      localStorage.setItem("syren_theme", m);
    } catch {}
  }, mode);

  const page = await context.newPage();
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 45000 });
  } catch (e) {
    failures.push({ path, mode, width, state: "load", sel: "-", ratio: 0, need: 4.5, text: e.message });
    await context.close();
    return;
  }
  await page.evaluate((m) => {
    const d = document.documentElement;
    d.classList.remove("theme-transition");
    d.classList.toggle("dark", m === "dark");
  }, mode);
  await page.waitForTimeout(400);

  // Fixed overlays (cookie banner, floating WhatsApp button) sit on top of
  // whatever is scrolled behind them, so for the page pass they are removed
  // from the DOM before any sample is taken; they are audited in the
  // dedicated "overlays" pass instead.
  if (scope === "page") {
    await page.evaluate(() => {
      document.querySelector('[aria-label="Cookie consent"]')?.remove();
      document.querySelector('a[aria-label="Chat with us on WhatsApp"]')?.remove();
      // Fixed bottom bars overlay whatever is scrolled behind them, and
      // `scrollIntoViewIfNeeded` parks elements right at the viewport bottom —
      // so without this they would be sampled *through* the bar. They are
      // audited in the dedicated "overlays" pass instead.
      for (const el of Array.from(document.querySelectorAll("body *"))) {
        const c = getComputedStyle(el);
        if (c.position !== "fixed") continue;
        const r = el.getBoundingClientRect();
        const fullWidth = r.width >= window.innerWidth * 0.6;
        const anchoredBottom = r.top >= window.innerHeight - 4 || r.bottom >= window.innerHeight - 4;
        if (fullWidth && anchoredBottom && r.height > 8 && r.height <= 120) el.remove();
      }
    });
  }

  // The mobile menu is a full-screen overlay portaled to <body>: while it is
  // open it covers the whole page, so it is audited in its own pass (only its
  // own elements) with the page content measured separately (menu closed).
  if (scope === "menu") {
    if (width >= 768) {
      await context.close();
      return;
    }
    const burger = page
      .locator(
        'header button[aria-label*="enu"], header button[aria-label*="avigation"], header button[aria-expanded]'
      )
      .first();
    try {
      if (await burger.isVisible({ timeout: 800 })) {
        await burger.click({ timeout: 1500 });
        await page.waitForTimeout(450);
      } else {
        await context.close();
        return;
      }
    } catch {
      await context.close();
      return;
    }
  }

  // Settle scroll-reveal animations before collecting. framer-motion's
  // `whileInView` leaves a wrapper at opacity:0 until it enters the viewport,
  // so an element below the fold is not yet painted and would be sampled
  // through its wrapper (capturing the page *behind* it). Scroll the whole
  // page once so each once-only reveal fires, then return to the top and let
  // the 400ms animations finish. Reveals only translate/opacity, so layout is
  // unchanged.
  if (scope !== "menu") {
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const step = Math.max(200, Math.round(window.innerHeight * 0.8));
      const max = document.documentElement.scrollHeight;
      for (let y = 0; y <= max; y += step) {
        window.scrollTo(0, y);
        await wait(40);
      }
      window.scrollTo(0, 0);
      await wait(450);
    });
  }

  const candidates = await page.evaluate(COLLECT, { max: MAX_ELEMENTS, scope });
  if (!candidates.length) {
    await context.close();
    return;
  }

  // Hide the foreground of everything on the page (text AND icons) so the
  // screenshot shows only the background. Inline `color: transparent` marked
  // `!important` is used because such declarations outrank *every* author
  // `!important` rule in globals.css (`html.light .syren-btn-primary`, the
  // `#hero …` overrides, …) regardless of selector specificity. Descendants
  // that set their own colour (e.g. an <svg className="text-accent-gold"> in
  // the logo) would otherwise be sampled as if their colour were the
  // background. The previous inline colours are restored verbatim afterwards so
  // the interaction-state pass still sees the real styles.
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important}" });
  const hideFg = await page.addStyleTag({
    content: "html ::placeholder{color:transparent!important}",
  });
  await page.evaluate(() => {
    const prev = [];
    for (const el of document.querySelectorAll("*")) {
      prev.push([el, el.style.getPropertyValue("color"), el.style.getPropertyPriority("color")]);
      el.style.setProperty("color", "transparent", "important");
    }
    window.__auditPrevColor = prev;
  });
  await page.waitForTimeout(150);

  const byIdx = new Map(candidates.map((c) => [c.idx, c]));
  const resolved = new Map();
  // The page pass samples from ONE full-page screenshot instead of taking a
  // screenshot per element (which dominated the run time). For this pass the
  // cookie banner, floating WhatsApp button and fixed bottom bars are removed
  // first, so nothing is position:fixed — a full-page capture lines up 1:1 with
  // the elements' document coordinates. The menu / overlays passes keep the
  // per-element path, because their targets ARE fixed overlays that a full-page
  // capture would place misleadingly.
  const useFullPage = scope === "page";
  let fullImg = null;
  if (useFullPage) {
    try {
      const buf = await page.screenshot({ fullPage: true, timeout: 30000 });
      const docH = await page.evaluate(() => document.documentElement.scrollHeight);
      const img = await decodeImage(buf);
      // Guard: Chromium caps very tall captures — if the image is materially
      // shorter than the document, elements below the cap would sample the wrong
      // rows, so fall back to the per-element path.
      if (img && img.height + 24 >= docH) fullImg = img;
    } catch {
      fullImg = null;
    }
  }
  const handles = await page.$$("[data-audit-idx]");
  for (const h of handles) {
    const idx = Number(await h.getAttribute("data-audit-idx"));
    const c = byIdx.get(idx);
    if (!c) continue;
    const fg = c.iconOnly
      ? parseColor(c.iconColor) || parseColor(c.textColor) || { r: 0, g: 0, b: 0, a: 1 }
      : parseColor(c.textColor) || { r: 0, g: 0, b: 0, a: 1 };
    // If the element paints its own opaque background, that colour *is* the
    // rendered background — prefer it over pixel sampling, which can otherwise
    // land on the page showing through a rounded pill's corners.
    const own = parseColor(c.bgChain && c.bgChain[0]);
    const ownOpaque = !!(own && own.a >= 0.999);
    let worst = null;
    if (!ownOpaque) {
      if (fullImg) {
        // Text rects are relative to the element box; lift them into document
        // coordinates. A control with no text nodes (an icon-only button such
        // as the wishlist heart, an input) must be sampled from a *centred
        // inset* box, never the full box: a rounded-full control's square
        // corners lie outside its own fill, so the card photo behind them would
        // be mistaken for the background. The rects are then clamped to the
        // captured image — an element scrolled out of an overflow-x-auto row
        // has a document x beyond the image width, and sampling there would
        // wrap into an unrelated row and report a bogus colour.
        const src = c.textRects && c.textRects.length
          ? c.textRects
          : (() => {
              const base = Math.max(3, Math.floor(Math.min(c.w, c.h) * 0.18));
              const ix = Math.min(base, Math.floor(c.w / 3));
              const iy = Math.min(base, Math.floor(c.h / 3));
              return [{ x: ix, y: iy, w: Math.max(1, c.w - 2 * ix), h: Math.max(1, c.h - 2 * iy) }];
            })();
        const abs = src
          .map((r) => ({ x: c.left + r.x, y: c.top + r.y, w: r.w, h: r.h }))
          .map((r) => {
            const x0 = Math.max(0, Math.floor(r.x));
            const y0 = Math.max(0, Math.floor(r.y));
            const x1 = Math.min(fullImg.width, Math.ceil(r.x + r.w));
            const y1 = Math.min(fullImg.height, Math.ceil(r.y + r.h));
            return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
          })
          .filter((r) => r.w >= 2 && r.h >= 2);
        if (abs.length) worst = sampleBgRaw(fullImg, fg, abs) || null;
      }
      // Per-element fallback: used by the menu / overlays passes (no full-page
      // image) and whenever the element lies outside the full-page capture
      // (e.g. clipped by an overflow-x-auto row) — scrolling it into view first
      // yields a correct sample.
      if (!worst) {
        try {
          await h.scrollIntoViewIfNeeded({ timeout: 1500 });
          const shot = await h.screenshot({ timeout: 4000 });
          worst = await sampleBgBuffer(shot, fg, c.textRects);
        } catch {
          worst = null;
        }
      }
    }
    const useBg = ownOpaque ? own : (worst && worst.bg) || resolveFromChain(c.bgChain, WHITE);
    const fgEff = fg.a < 1 ? composite(fg, useBg) : fg;
    resolved.set(idx, { useBg, fgEff });
  }

  await page.evaluate(() => {
    const prev = window.__auditPrevColor || [];
    for (const [el, v, p] of prev) {
      if (v) el.style.setProperty("color", v, p);
      else el.style.removeProperty("color");
    }
    window.__auditPrevColor = null;
  });
  // NOTE: `hideFg` (placeholder colour -> transparent) is deliberately kept
  // active through the interaction-state pass below. An empty <input> has no
  // text nodes, so the state pass falls back to pixel-sampling the control's
  // interior; if the placeholder glyphs were still painted they would be
  // mistaken for the background.

  const record = (c, state, fg, bg) => {
    // Icons / non-text graphics use the 3:1 graphical-object threshold.
    const thr = c.iconOnly ? 3 : c.large ? 3 : 4.5;
    const r = ratio(fg, bg);
    stats.checked++;
    if (r + 0.001 < thr) {
      failures.push({
        path,
        mode,
        width,
        pass: scope,
        state,
        sel: `${c.tag}.${(c.cls || "").split(" ")[0] || ""}`,
        cls: c.cls,
        tag: c.tag,
        top: c.top,
        text: c.text,
        ratio: round(r),
        need: thr,
        fg: rgbCss(fg),
        bg: rgbCss(bg),
      });
    }
  };

  // --- default state ---
  for (const c of candidates) {
    const res = resolved.get(c.idx);
    if (!res) continue;
    record(c, "default", res.fgEff, res.useBg);
  }

  // --- interaction states via CDP forcePseudoState ---
  try {
    const client = await page.context().newCDPSession(page);
    await client.send("DOM.enable");
    await client.send("CSS.enable");
    const { root } = await client.send("DOM.getDocument", { depth: -1 });

    for (const c of candidates) {
      const interactive =
        /^(a|button|input|select|textarea|label|summary)$/.test(c.tag) ||
        /(syren-btn|btn-|syren-pill)/.test(c.cls);
      if (!interactive) continue;
      const sel = `[data-audit-idx="${c.idx}"]`;
      let nodeId;
      try {
        ({ nodeId } = await client.send("DOM.querySelector", { nodeId: root.nodeId, selector: sel }));
      } catch {
        continue;
      }
      if (!nodeId) continue;

      const states = ["hover", "focus-visible", "active"];
      if (c.locked) states.push("disabled");
      const def = resolved.get(c.idx);

      for (const pseudo of states) {
        try {
          await client.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [pseudo] });
        } catch {
          continue;
        }
        const st = await page.evaluate((s) => {
          const el = document.querySelector(s);
          if (!el) return null;
          const cs = getComputedStyle(el);
          const chain = [];
          let n = el;
          let i = 0;
          while (n && n.nodeType === 1 && i < 12) {
            const nc = getComputedStyle(n);
            chain.push(nc.backgroundColor);
            if (nc.backgroundImage && nc.backgroundImage !== "none") chain.push("__image__");
            n = n.parentElement;
            i++;
          }
          const iconEl = el.querySelector("svg,img");
          return {
            color: cs.color,
            chain,
            border: cs.borderTopColor,
            bw: parseFloat(cs.borderTopWidth) || 0,
            iconColor: iconEl ? getComputedStyle(iconEl).color : null,
          };
        }, sel);

        if (!st) {
          try {
            await client.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] });
          } catch {}
          continue;
        }

        const fgSource = c.iconOnly && st.iconColor ? st.iconColor : st.color;
        const fgRaw = parseColor(fgSource) || { r: 0, g: 0, b: 0, a: 1 };

        // Resolve the state's background while the pseudo-state is still forced.
        // If the element paints its own opaque fill, that colour IS the
        // background. Otherwise the state is pixel-sampled with the element's
        // own foreground hidden — the real background may come from a *sibling*
        // layer (e.g. a hero <img> plus gradient overlay) that the ancestor
        // background-colour walk cannot see.
        const ownState = parseColor(st.chain && st.chain[0]);
        let bg;
        if (ownState && ownState.a >= 0.999) {
          bg = ownState;
        } else {
          bg = null;
          const handle = await page.$(`[data-audit-idx="${c.idx}"]`);
          if (handle) {
            try {
              await handle.scrollIntoViewIfNeeded({ timeout: 1500 });
              await page.evaluate((s) => {
                const root = document.querySelector(s);
                if (!root) return;
                const prev = [];
                for (const el of [root, ...root.querySelectorAll("*")]) {
                  prev.push([el, el.style.getPropertyValue("color"), el.style.getPropertyPriority("color")]);
                  el.style.setProperty("color", "transparent", "important");
                }
                window.__statePrev = prev;
              }, sel);
              try {
                const shot = await handle.screenshot({ timeout: 4000 });
                const sampled = await sampleBgBuffer(shot, fgRaw, c.textRects);
                bg = (sampled && sampled.bg) || null;
              } finally {
                // MUST run even when the screenshot times out: otherwise the
                // inline `color: transparent !important` stays on the page and
                // every later measurement reads a transparent foreground
                // (reported as a bogus 1:1 failure).
                await page.evaluate(() => {
                  const prev = window.__statePrev || [];
                  for (const [el, v, p] of prev) {
                    if (v) el.style.setProperty("color", v, p);
                    else el.style.removeProperty("color");
                  }
                  window.__statePrev = null;
                });
              }
            } catch {
              bg = null;
            }
          }
          if (!bg) bg = resolveFromChain(st.chain, def ? def.useBg : WHITE);
        }

        try {
          await client.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] });
        } catch {}

        const fg = fgRaw.a < 1 ? composite(fgRaw, bg) : fgRaw;
        if (def && same(fg, def.fgEff) && same(bg, def.useBg)) continue; // no change vs default
        record(c, pseudo, fg, bg);

        // button fill vs its own text
        if (/^(button)$/.test(c.tag) || /(syren-btn|btn-)/.test(c.cls)) {
          const fill = resolveFromChain(st.chain.slice(0, 1), null);
          if (fill && fill.a >= 0.999) {
            const r = ratio(fg, fill);
            stats.checked++;
            if (r + 0.001 < 3) {
              failures.push({
                path, mode, width, pass: scope, state: `${pseudo}-fill`, sel: `${c.tag}.${(c.cls || "").split(" ")[0]}`,
                cls: c.cls, tag: c.tag, top: c.top, text: c.text, ratio: round(r), need: 3,
                fg: rgbCss(fg), bg: rgbCss(fill),
              });
            }
          }
        }
      }
    }
  } catch {
    // best-effort
  }

  try {
    await hideFg.evaluate((el) => el.remove());
  } catch {}

  await context.close();
}

// ----------------------------------------------------------------------------
// Sitemap
// ----------------------------------------------------------------------------
async function readSitemapPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`, {
    headers: { "user-agent": "syren-contrast-audit" },
  });
  if (!res.ok) throw new Error(`sitemap returned status ${res.status}`);
  const xml = await res.text();
  return [
    ...new Set(
      [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((m) => {
          try {
            return new URL(m[1]).pathname.replace(/\/+$/, "") || "/";
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    ),
  ];
}

function filterPaths(paths) {
  const raw = process.env.AUDIT_PATHS;
  if (!raw) return paths;
  if (raw.startsWith("/") && raw.endsWith("/") && raw.length > 2) {
    const re = new RegExp(raw.slice(1, -1));
    return paths.filter((p) => re.test(p));
  }
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return paths.filter((p) => list.includes(p));
}

// ----------------------------------------------------------------------------
// Hero before/after screenshots
// ----------------------------------------------------------------------------
async function takeHeroShots(browser) {
  mkdirSync(SHOT_DIR, { recursive: true });
  for (const mode of ["light", "dark"]) {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width < 768 ? 844 : 900 },
        reducedMotion: "reduce",
      });
      await context.addInitScript((m) => {
        try {
          localStorage.setItem("syren_theme", m);
        } catch {}
      }, mode);
      const page = await context.newPage();
      try {
        await page.goto(`${BASE}/`, { waitUntil: "load" });
        await page.evaluate((m) => {
          const d = document.documentElement;
          d.classList.remove("theme-transition");
          d.classList.toggle("dark", m === "dark");
        }, mode);
        await page.waitForTimeout(600);
        const file = join(SHOT_DIR, `hero-${SHOT_LABEL}-${mode}-${width}.png`);
        await page.screenshot({ path: file });
        console.log(`   📸 ${file}`);
      } catch (e) {
        console.warn(`   ⚠️  hero screenshot failed (${mode} ${width}): ${e.message}`);
      }
      await context.close();
    }
  }
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------
async function main() {
  console.log(`🔎 Contrast audit against ${BASE}\n`);

  let paths;
  try {
    paths = await readSitemapPaths();
  } catch (e) {
    console.error(`❌ could not read sitemap: ${e.message}`);
    process.exit(1);
  }
  paths = filterPaths(paths);
  if (!paths.length) {
    console.error("❌ no URLs to audit");
    process.exit(1);
  }
  console.log(`   ${paths.length} URLs · modes: ${MODES.join("/")} · widths: ${VIEWPORTS.join("/")}\n`);

  const browser = await chromium.launch();
  const failures = [];
  const stats = { checked: 0 };

  if (WANT_SHOTS) {
    console.log("   capturing hero screenshots…");
    await takeHeroShots(browser);
  }

  for (const path of paths) {
    for (const mode of MODES) {
      for (const width of VIEWPORTS) {
        // Page content is measured first, then the open states from the brief:
        // the full-screen mobile menu (mobile only) and the fixed overlays
        // (cookie banner / floating WhatsApp button).
        const passes = ["page"];
        if (width < 768) passes.push("menu");
        passes.push("overlays");
        for (const scope of passes) {
          const before = failures.length;
          const label = scope === "page" ? "" : ` ${scope}`;
          try {
            await auditPage(browser, path, mode, width, failures, stats, scope);
          } catch (e) {
            console.warn(`   ⚠️  ${path} (${mode} ${width}${label}): ${e.message}`);
          }
          const found = failures.length - before;
          process.stdout.write(
            `   ${found ? "✗" : "✓"} ${path} [${mode} ${width}${label}]${found ? ` — ${found}` : ""}\n`
          );
        }
      }
    }
  }

  await browser.close();

  console.log(`\n   ${stats.checked} elements measured.\n`);
  if (!failures.length) {
    console.log("✅ Contrast audit passed — no failures.");
    return;
  }

  const lines = [];
  lines.push("❌ Contrast failures:\n");
  lines.push(
    "URL".padEnd(24) +
      "MODE".padEnd(7) +
      "W".padEnd(6) +
      "PASS".padEnd(10) +
      "Y".padEnd(7) +
      "STATE".padEnd(17) +
      "RATIO".padEnd(8) +
      "NEED".padEnd(6) +
      "SEL".padEnd(26) +
      "FG → BG".padEnd(40) +
      "TEXT"
  );
  for (const f of failures) {
    lines.push(
      String(f.path).slice(0, 23).padEnd(24) +
        String(f.mode).padEnd(7) +
        String(f.width).padEnd(6) +
        String(f.pass ?? "").padEnd(10) +
        String(f.top ?? "").padEnd(7) +
        String(f.state).padEnd(17) +
        `${f.ratio}:1`.padEnd(8) +
        `${f.need}:1`.padEnd(6) +
        String(f.sel).slice(0, 25).padEnd(26) +
        `${f.fg} → ${f.bg}`.slice(0, 39).padEnd(40) +
        `${(f.text || "").slice(0, 45)}`
    );
  }
  lines.push(`\n${failures.length} failure(s).`);
  const report = lines.join("\n");
  console.log(report);
  if (process.env.AUDIT_REPORT) {
    try {
      writeFileSync(process.env.AUDIT_REPORT, report, "utf8");
    } catch {}
  }
  process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
