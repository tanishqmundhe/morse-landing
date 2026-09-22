import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { meta } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.ogTitle, description: meta.ogDescription, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#110e0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
