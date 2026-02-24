// Local smoke test for Contact and Quote APIs against the dev server
const base = process.env.BASE_URL || 'http://localhost:3000';

async function post(path, body) {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, json };
}

async function main() {
  console.log('🌡️  Smoke test base:', base);
  // Contact
  const contactBody = {
    name: 'Local Smoke Tester',
    email: 'local-test-contact@syrentravel.com',
    phone: '',
    subject: 'SMOKE TEST',
    message: `TEST - PLEASE IGNORE - ${new Date().toISOString()}`,
    pathname: '/contact',
  };
  const contactRes = await post('/api/notify/contact', contactBody);
  console.log('Contact ->', contactRes);

  // Quote
  const quoteBody = {
    name: 'Local Smoke Tester',
    email: 'local-test-quote@syrentravel.com',
    phone: '',
    trip_dates: '2026-12',
    budget: '$2,000 - $4,000',
    message: `TEST - PLEASE IGNORE - ${new Date().toISOString()}`,
  };
  const quoteRes = await post('/api/notify/quote', quoteBody);
  console.log('Quote ->', quoteRes);
}

main().catch((e) => {
  console.error('Smoke test failed:', e);
  process.exit(1);
});

