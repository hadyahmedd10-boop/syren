async function submitToIndexNow(urls) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !Array.isArray(urls) || urls.length === 0) return;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.syrentravel.com",
        key,
        keyLocation: `https://www.syrentravel.com/${key}.txt`,
        urlList: urls,
      }),
    });
    const text = await res.text();
    console.log("IndexNow response status:", res.status);
    console.log(text);
  } catch (e) {
    console.error("IndexNow submission failed:", e);
  }
}

// Fallback: use real key locally if env var is not set
process.env.INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'f99cd52b68ad45bc928b7bdb9f922d13';

const urls = [
  'https://www.syrentravel.com/',
  'https://www.syrentravel.com/experiences',
  'https://www.syrentravel.com/excursions',
  'https://www.syrentravel.com/events',
  'https://www.syrentravel.com/destinations',
  'https://www.syrentravel.com/partner',
  'https://www.syrentravel.com/faq',
  'https://www.syrentravel.com/is-egypt-safe',
  'https://www.syrentravel.com/best-time-to-visit-egypt',
  'https://www.syrentravel.com/egypt-travel-tips',
  'https://www.syrentravel.com/hurghada-to-cairo-day-trip',
  'https://www.syrentravel.com/egypt-holiday-packages',
  'https://www.syrentravel.com/egypt-music-festivals-2026',
  'https://www.syrentravel.com/things-to-do-cairo',
  'https://www.syrentravel.com/zamna-egypt-travel',
  'https://www.syrentravel.com/sandbox-festival-egypt',
  'https://www.syrentravel.com/events/zamna-festival',
  'https://www.syrentravel.com/events/noart-festival',
  'https://www.syrentravel.com/events/sandbox-festival',
  'https://www.syrentravel.com/events/shakira-live-performance',
  'https://www.syrentravel.com/events/the-moment-festival'
]

await submitToIndexNow(urls)
console.log('Submitted', urls.length, 'URLs to IndexNow')
