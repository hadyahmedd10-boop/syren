// SEO audit for the festival travel pages.
//
// Fails (exit code 1) on any of the following, across every audited page:
//   - a duplicated brand ("Syren") in the <title>
//   - a <title> longer than 60 characters
//   - a meta description outside 140–155 characters
//   - a missing or wrong canonical
//   - an <h1> count other than 1
//   - a JSON-LD block that does not parse
//   - an Offer with no real price
//   - a rendered "From" price / deposit line when the package price is null
//   - a rendered package item that is confirmed: false in the data
//   - an unencoded space inside a wa.me link
//   - a broken internal link
//
// Usage:
//   1. npm run build
//   2. npm run start            (or) npm run dev
//   3. node scripts/audit-seo.mjs
//
// Override the target with AUDIT_BASE_URL (default http://localhost:3000).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const SITE_URL = "https://www.syrentravel.com";

/** Pages that must pass every check. */
const PAGES = [
  "/festival-travel-egypt",
  "/anyma-egypt-2027",
  "/starlight-festival-egypt",
  "/zamna-egypt-travel",
  "/events/anyma-pyramids",
  "/events/starlight-festival-2027",
  "/events/zamna-giza-10th-anniversary",
  "/events/zamna-south-sinai",
  "/events",
  "/experiences",
  "/guides",
  "/home",
];

/**
 * Pre-existing deliberate cross-canonicals between the splash page and the home
 * page. Every other audited page must canonicalise to itself.
 */
const CANONICAL_OVERRIDE = {
  "/": "/home",
  "/home": "/",
};

/** Festival pages -> the festivalPackages eventSlug rendered on them. */
const PAGE_EVENT_SLUG = {
  "/anyma-egypt-2027": "anyma-pyramids",
  "/starlight-festival-egypt": "starlight-festival-2027",
  "/zamna-egypt-travel": "zamna-giza-10th-anniversary",
  "/events/anyma-pyramids": "anyma-pyramids",
  "/events/starlight-festival-2027": "starlight-festival-2027",
  "/events/zamna-giza-10th-anniversary": "zamna-giza-10th-anniversary",
};

const __dirname = dirname(fileURLToPath(import.meta.url));

// ----------------------------------------------------------------------------
// Read the single data source so the audit checks what the data actually says.
// ----------------------------------------------------------------------------
function readPackages() {
  const raw = readFileSync(join(__dirname, "..", "src", "data", "festivalPackages.ts"), "utf8");
  const chunks = raw.split(/\n\s*id:\s*"/).slice(1);
  return chunks.map((chunk) => {
    const id = chunk.slice(0, chunk.indexOf('"'));
    const grab = (re) => (chunk.match(re) || [])[1];
    const falseIncludes = [];
    const includesBlock = chunk.slice(chunk.indexOf("includes:"), chunk.indexOf("excludes:"));
    const incRe = /\{\s*text:\s*"([^"]+)"\s*,\s*confirmed:\s*(true|false)\s*\}/g;
    let m;
    while ((m = incRe.exec(includesBlock))) {
      if (m[2] === "false") falseIncludes.push(m[1]);
    }
    const excludesBlock = chunk.slice(chunk.indexOf("excludes:"), chunk.indexOf("hotelOptions:"));
    const excludes = [];
    const exRe = /"([^"]+)"/g;
    while ((m = exRe.exec(excludesBlock))) excludes.push(m[1]);
    return {
      id,
      eventSlug: grab(/eventSlug:\s*"([^"]+)"/),
      name: grab(/name:\s*"([^"]+)"/),
      priceNull: /priceFrom:\s*null/.test(chunk),
      status: grab(/status:\s*"([^"]+)"/),
      falseIncludes,
      excludes,
    };
  });
}

// ----------------------------------------------------------------------------
// Tiny HTML helpers (no DOM dependency).
// ----------------------------------------------------------------------------
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const stripTags = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ").trim();

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? (m[2] ?? m[3] ?? "") : null;
}

const normPath = (p) => {
  if (!p) return "";
  let s = p.trim();
  if (s.length > 1) s = s.replace(/\/+$/, "");
  return s;
};

// ----------------------------------------------------------------------------
// Checks
// ----------------------------------------------------------------------------
const failures = [];
const fail = (path, message) => failures.push(`${path}: ${message}`);

function checkPage(path, html, packages) {
  // <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(titleMatch[1]).trim() : "";
  if (!title) fail(path, "missing <title>");
  const brandCount = (title.match(/syren/gi) || []).length;
  if (brandCount > 1) fail(path, `duplicated brand in title: "${title}"`);
  if (title.length > 60) fail(path, `title is ${title.length} chars (> 60): "${title}"`);

  // meta description
  const descTag = html.match(/<meta[^>]+name=["']description["'][^>]*>/i);
  const desc = descTag ? decode(attr(descTag[0], "content") || "").trim() : "";
  if (!desc) fail(path, "missing meta description");
  else if (desc.length < 140 || desc.length > 155)
    fail(path, `description is ${desc.length} chars (want 140-155)`);

  // canonical
  const linkTags = html.match(/<link\b[^>]*>/gi) || [];
  const canonicalTag = linkTags.find((t) => /rel=["']canonical["']/i.test(t));
  const canonical = canonicalTag ? (attr(canonicalTag, "href") || "").trim() : "";
  const canonicalPath = CANONICAL_OVERRIDE[path] ?? path;
  const expected = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath}`;
  if (!canonical) fail(path, "missing canonical");
  else if (normPath(canonical) !== normPath(expected))
    fail(path, `canonical "${canonical}" != "${expected}"`);

  // h1
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) fail(path, `h1 count is ${h1Count} (want 1)`);

  // JSON-LD
  const ldRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let ld;
  while ((ld = ldRe.exec(html))) {
    let parsed;
    try {
      parsed = JSON.parse(ld[1]);
    } catch (e) {
      fail(path, `JSON-LD parse error: ${e.message}`);
      continue;
    }
    const offers = [];
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(walk);
      const type = node["@type"];
      if (type === "Offer" || (Array.isArray(type) && type.includes("Offer"))) offers.push(node);
      Object.values(node).forEach(walk);
    };
    walk(parsed);
    for (const offer of offers) {
      const price = Number(offer.price);
      if (!Number.isFinite(price) || price <= 0)
        fail(path, `Offer without a real price (price=${JSON.stringify(offer.price)})`);
    }
  }

  // ---- Rendered-content checks, scoped to the packages block ----
  // Other sections of these pages legitimately mention similar phrases, so the
  // package rendering rules are only asserted inside the packages <section>.
  const pkgMarker = html.search(/id=["']packages["']/i);
  if (pkgMarker !== -1) {
    const start = html.lastIndexOf("<section", pkgMarker);
    const nextStart = html.indexOf("<section", pkgMarker + 1);
    const sectionHtml = html.slice(
      start === -1 ? pkgMarker : start,
      nextStart === -1 ? html.length : nextStart
    );
    const sectionText = stripTags(sectionHtml);

    const slug = PAGE_EVENT_SLUG[path];
    const pagePkgs = slug ? packages.filter((p) => p.eventSlug === slug) : [];
    const allNullPriced = pagePkgs.length > 0 && pagePkgs.every((p) => p.priceNull);

    if (/From\s+Price on request/i.test(sectionText))
      fail(path, 'rendered "From Price on request" (price line shown when price is null)');
    if (allNullPriced) {
      if (/From\s+USD/i.test(sectionText))
        fail(path, 'rendered "From USD …" while every package price is null');
      if (/\bdeposit\b/i.test(sectionText))
        fail(path, "rendered a deposit line while every package price is null");
    }

    // confirmed: false items must never render
    const excludedFromCheck = (t, pkg) => pkg.excludes.some((ex) => ex.includes(t));
    const falseTexts = new Set();
    for (const pkg of pagePkgs)
      for (const t of pkg.falseIncludes) if (!excludedFromCheck(t, pkg)) falseTexts.add(t);
    for (const t of falseTexts)
      if (sectionText.includes(t)) fail(path, `rendered an unconfirmed item: "${t}"`);
  }

  // wa.me links must be encoded
  const hrefs = [];
  const aRe = /<a\b[^>]*href\s*=\s*("([^"]*)"|'([^']*)')/gi;
  let a;
  while ((a = aRe.exec(html))) hrefs.push(a[2] ?? a[3] ?? "");
  for (const href of hrefs) {
    if (/wa\.me/i.test(href) && /\s/.test(href))
      fail(path, `unencoded space in wa.me link: ${href.slice(0, 80)}`);
  }
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------
async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { "user-agent": "syren-seo-audit" } });
  const html = res.ok ? await res.text() : "";
  return { res, html };
}

async function main() {
  console.log(`🔎 SEO audit against ${BASE}\n`);
  const packages = readPackages();
  const internalLinks = new Set();

  for (const path of PAGES) {
    let html;
    try {
      ({ html } = await get(path));
    } catch (e) {
      fail(path, `could not fetch: ${e.message}`);
      continue;
    }
    if (!html) {
      fail(path, "returned an empty body");
      continue;
    }
    checkPage(path, html, packages);

    // Collect internal anchors for the broken-link check.
    const aRe = /<a\b[^>]*href\s*=\s*("([^"]*)"|'([^']*)')/gi;
    let a;
    while ((a = aRe.exec(html))) {
      const href = (a[2] ?? a[3] ?? "").trim();
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      internalLinks.add(href.split("#")[0].split("?")[0]);
    }
  }

  // Broken internal link check (dedup against the pages we already know exist).
  const known = new Set(PAGES.map(normPath));
  for (const href of internalLinks) {
    const clean = normPath(href) || "/";
    if (known.has(clean)) continue;
    try {
      const res = await fetch(`${BASE}${href}`, {
        redirect: "manual",
        headers: { "user-agent": "syren-seo-audit" },
      });
      if (res.status >= 400) fail(href, `broken internal link (status ${res.status})`);
    } catch (e) {
      fail(href, `broken internal link (${e.message})`);
    }
  }

  if (failures.length === 0) {
    console.log(`✅ Passed: ${PAGES.length} pages, all checks green.`);
    return;
  }
  console.error(`❌ ${failures.length} issue(s) found:\n`);
  for (const f of failures) console.error(`   - ${f}`);
  process.exitCode = 1;
}

main().catch((e) => {
  console.error("Audit crashed:", e);
  process.exit(1);
});
