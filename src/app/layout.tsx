import type { Metadata, Viewport } from "next";
import { Caveat, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { meta } from "@/content/site";
import "./globals.css";

// The app's two registers (contract #3): Plex for what people say, mono for
// labels and exact strings. Named apart from Tailwind's --font-sans/--font-mono.
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Handwriting, only for what people draw on the whiteboard and shared screens.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: { title: meta.title, description: meta.description, type: "website", siteName: "Morse" },
};

export const viewport: Viewport = {
  themeColor: "#0c0907",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plex.variable} ${geistMono.variable} ${caveat.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-4 z-50 -translate-y-[200%] rounded-full bg-action px-4 py-2 text-[15px] text-action-foreground focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
