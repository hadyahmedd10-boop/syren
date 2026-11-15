export const WHATSAPP_NUMBER = "201016015723";

/**
 * Build a wa.me link. Always encode the message: an unencoded space in a
 * wa.me URL is invalid and is caught by scripts/audit-seo.mjs.
 */
export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
