import type { Metadata, Viewport } from "next";
import { Caveat, Geist_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Devanagari } from "next/font/google";
import { meta } from "@/content/site";
import { SmoothScroll } from "@/components/smooth-scroll";
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

// Plex's Devanagari cut, for the Hindi and Marathi the captions card shows.
const plexDeva = IBM_Plex_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400"],
  variable: "--font-plex-deva",
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
  // Set NEXT_PUBLIC_SITE_URL once the page has its own domain; until then the
  // app's own address stands in, so shared links unfurl with a full URL.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://onmorse.com"),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    siteName: "Morse",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: meta.title }],
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#f4f0e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plex.variable} ${geistMono.variable} ${caveat.variable} ${plexDeva.variable}`}>
      <body>
        <SmoothScroll />
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
