/**
 * Service claims shown across the site.
 *
 * Every flag is `false` until the owner confirms the claim is true. A claim is
 * only rendered when its flag is `true`, so no unverified promise can appear.
 * See the "NEEDS OWNER INPUT" section of the audit report.
 */
export const claims = {
  licensedGuides: false,
  securePayments: false,
  sustainableTravel: false,
  crew: false,
} as const;

export type ClaimKey = keyof typeof claims;

export type TrustClaim = { label: string };

/** Claims about our own service. Rendered only when the matching flag is true. */
export function getServiceClaims(): TrustClaim[] {
  const items: TrustClaim[] = [];
  if (claims.licensedGuides) items.push({ label: "Licensed guides" });
  if (claims.securePayments) items.push({ label: "Secure payments" });
  if (claims.sustainableTravel) items.push({ label: "Sustainable travel" });
  if (claims.crew) items.push({ label: "Crew on all experiences" });
  return items;
}

/** The four service pillars that are always true of how Syren works. */
export const SERVICE_PILLARS: TrustClaim[] = [
  { label: "Local-led tours" },
  { label: "Tailored experiences" },
  { label: "Private transfers" },
  { label: "24/7 concierge" },
];
