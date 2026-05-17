export async function submitToIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !Array.isArray(urls) || urls.length === 0) return;
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.syrentravel.com",
        key,
        keyLocation: "https://www.syrentravel.com/f99cd52b68ad45bc928b7bdb9f922d13.txt",
        urlList: urls,
      }),
    });
  } catch (e) {
    console.error("IndexNow submission failed:", e);
  }
}
