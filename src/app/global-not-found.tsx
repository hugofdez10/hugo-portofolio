import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/i18n";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Page not found | Hugo Fernández Díez",
};
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="not-found">
          <div className="container">
            <span className="eyebrow">404 / NOT FOUND</span>
            <h1>This page has not shipped.</h1>
            <p>The link may have changed. The work is still here.</p>
            <Link className="button button-primary" href="/en">
              Back home →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
