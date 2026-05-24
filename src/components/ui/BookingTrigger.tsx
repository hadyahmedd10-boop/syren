"use client";

interface BookingTriggerProps {
  title: string;
  slug?: string;
  buttonLabel?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

function buildWhatsAppUrl(title: string) {
  const text = `Hi Syren, I'm interested in booking ${title}. I'd love to know more about available packages.`;
  return `https://wa.me/201016015723?text=${encodeURIComponent(text)}`;
}

export default function BookingTrigger({
  title,
  buttonLabel = "Reserve Now →",
  className = "",
  variant = "primary",
}: BookingTriggerProps) {
  const btnClass = variant === "secondary" ? "syren-btn-secondary" : "syren-btn";

  return (
    <a
      href={buildWhatsAppUrl(title)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btnClass} ${className}`}
    >
      {buttonLabel}
    </a>
  );
}
