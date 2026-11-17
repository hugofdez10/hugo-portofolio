import "../globals.css";
import { fontVariables } from "../fonts";
import { themeScript } from "@/lib/theme";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/i18n";
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };
export default function RedirectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
