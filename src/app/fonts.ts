import { Hanken_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";

/** Wordmark only. */
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

export const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/** Section numbers, eyebrows and small data. */
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${serif.variable} ${sans.variable} ${mono.variable}`;
