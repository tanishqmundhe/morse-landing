import type { Metadata } from "next";
import { QuietOptions } from "@/components/quiet-options";

/** Not part of the site: a private gallery, kept out of search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return <QuietOptions />;
}
