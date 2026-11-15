/**
 * Renders a JSON-LD block. Content must mirror what is visible on the page.
 * `<` is escaped so the payload can never break out of the script tag.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
