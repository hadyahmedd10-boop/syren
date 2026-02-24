// Production "Get a Quote" test - sends a test request to the live API
const base = process.env.BASE_URL || 'https://www.syrentravel.com';

async function main() {
  const payload = {
    name: 'Automation Smoke Test',
    email: 'automation-quote@syrentravel.com',
    phone: '',
    trip_dates: '2026-12',
    budget: '$2,000 - $4,000',
    message: `TEST QUOTE SUBMISSION – PLEASE IGNORE – ${new Date().toISOString()}`,
  };

  const res = await fetch(`${base}/api/notify/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }

  console.log('Status:', res.status);
  console.log('Response:', json);
}

main().catch((e) => {
  console.error('Quote test failed:', e);
  process.exit(1);
});

