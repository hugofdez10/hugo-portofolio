import "../globals.css";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/i18n";
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };
export default function RedirectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
