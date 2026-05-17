"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/providers/ThemeProvider";

interface TrustpilotWidgetProps {
  variant?: "micro" | "mini" | "carousel" | "grid" | "list";
  height?: string;
  className?: string;
  showAllReviews?: boolean;
}

const BUSINESS_UNIT_ID = "69eb718d9dcde9e52f8623f4";

const TEMPLATE_IDS = {
  micro: "5419b6ffb0d04a076446a9af",
  mini: "53aa8807dec7e10d38f59f32",
  carousel: "53aa8912dec7e10e38f59f36",
  grid: "539adbd6dec7e10e686debee",
  list: "539ad60defb9600b94d7df2c",
  reviewCollector: "56278e9abfbbba0bdcd568bc",
};

export default function TrustpilotWidget({
  variant = "carousel",
  height = "240px",
  className = "",
  showAllReviews = true,
}: TrustpilotWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const loadWidget = () => {
      if (typeof window !== "undefined" && (window as any).Trustpilot && ref.current) {
        (window as any).Trustpilot.loadFromElement(ref.current, true);
      }
    };
    loadWidget();
    const t1 = setTimeout(loadWidget, 1000);
    const t2 = setTimeout(loadWidget, 2500);
    const t3 = setTimeout(loadWidget, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isDark]);

  return (
    <div className={className}>
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id={TEMPLATE_IDS[variant]}
        data-businessunit-id={BUSINESS_UNIT_ID}
        data-style-height={height}
        data-style-width="100%"
        data-theme={isDark ? "dark" : "light"}
        data-text-color={isDark ? "#ffffff" : "#111111"}
        data-stars={showAllReviews ? "1,2,3,4,5" : "4,5"}
      >
        <a
          href="https://www.trustpilot.com/review/syrentravel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-gold hover:underline text-sm"
        >
          Read our reviews on Trustpilot
        </a>
      </div>
    </div>
  );
}
