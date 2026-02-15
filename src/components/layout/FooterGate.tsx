"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterGate() {
  const pathname = usePathname();
  const hideOn = new Set(["/home", "/"]);
  if (hideOn.has(pathname)) {
    return null;
  }
  return <Footer />;
}
