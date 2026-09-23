"use client";

import { useState } from "react";
import {
  ArrowUpRight01Icon,
  Github01Icon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { footer } from "@/content/site";
import { Logo } from "./logo";
import { UnifiedMachinesLogo } from "./unified-machines-logo";
import { EASE, Icon, PRIMARY, UNDERLINE, WRAP } from "./ui";

const SOCIAL = {
  x: NewTwitterIcon,
  linkedin: Linkedin01Icon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  github: Github01Icon,
};

const CELL = "p-8 sm:p-10 lg:p-12";

/**
 * The footer as a grid: the note and the mark on the left, the pages and the
 * accounts beside them, and how to reach us underneath. The cells are divided
 * by the page's hairline rather than a drawn rule, so the arrangement reads
 * without the grid shouting.
 *
 * The mark runs the full width of its cell, which puts its left edge on the
 * same line as everything above it — sized by the column, not by eye.
 */
export function SiteFooter() {
  return (
    <footer className={WRAP}>
      <div className="grid border-t border-hairline lg:grid-cols-[1.35fr_1fr_1fr]">
        <div className={`${CELL} flex flex-col border-b border-hairline lg:row-span-2 lg:border-r lg:border-b-0`}>
          <Loop />
          <a
            href="#"
            aria-label="Morse, back to top"
            className="mt-14 block text-ink transition-opacity duration-500 hover:opacity-70 lg:mt-auto lg:pt-20"
            style={{ transitionTimingFunction: EASE }}
          >
            <Logo className="w-full" />
          </a>
        </div>

        <nav className={`${CELL} border-b border-hairline sm:border-r`} aria-label={footer.pages.title}>
          <Title>{footer.pages.title}</Title>
          {/* Down first, then across — a list of pages should read as a list. */}
          <ul className="mt-6 grid grid-flow-col grid-rows-4 gap-x-6 gap-y-3">
            {footer.pages.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`${CELL} border-b border-hairline`}>
          <Title>{footer.social.title}</Title>
          <ul className="mt-4">
            {footer.social.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="group flex items-center gap-4 py-2">
                  <Icon icon={SOCIAL[link.icon as keyof typeof SOCIAL]} className="size-[18px] shrink-0 text-ink-soft transition-colors duration-300 group-hover:text-ink" />
                  {/* The leader line reaches across to the name, as a contents page does. */}
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 border-t border-dashed border-hairline transition-colors duration-500 group-hover:border-ink-faint"
                    style={{ transitionTimingFunction: EASE }}
                  />
                  <span className="text-[17px] text-ink-soft transition-colors duration-300 group-hover:text-ink">{link.label}</span>
                  <Icon
                    icon={ArrowUpRight01Icon}
                    className="size-4 shrink-0 text-ink-faint transition-[transform,color] duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${CELL} sm:col-span-2`}>
          <Title>{footer.touch.title}</Title>
          <p className="mt-5 max-w-[46ch] text-[17px]/[1.55] text-ink-soft">{footer.touch.body}</p>
          <a href={`mailto:${footer.touch.email}`} className={`${UNDERLINE} mt-4 inline-block text-[19px] text-ink`}>
            {footer.touch.email}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-hairline py-8 text-[15px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Unified Machines</p>
        <nav className="flex gap-7" aria-label="Legal">
          {footer.legal.map((link) => (
            <a key={link.label} href={link.href} className={`${UNDERLINE} transition-colors duration-300 hover:text-ink-soft`}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="flex items-center gap-2.5">
          {footer.maker}
          <UnifiedMachinesLogo className="h-[15px] w-auto shrink-0" />
        </p>
      </div>
    </footer>
  );
}

const LINK = `${UNDERLINE} text-[17px] text-ink-soft transition-colors duration-300 hover:text-ink`;

function Title({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-label text-ink-faint uppercase">{children}</p>;
}

/**
 * There is no mailing list behind this yet, so rather than swallow the address
 * and say nothing, it writes the mail for you and lets you send it.
 */
function Loop() {
  const [email, setEmail] = useState("");
  const { loop } = footer;

  return (
    <div>
      <p className="max-w-[16ch] text-[30px]/[1.15] font-light tracking-[-0.02em] text-ink sm:text-[34px]/[1.12]">{loop.title}</p>
      <p className="mt-4 max-w-[38ch] text-[17px]/[1.55] text-ink-soft">{loop.body}</p>

      <form
        className="mt-7 flex items-center gap-2 rounded-full bg-overlay p-1.5 pl-6 transition-colors duration-300 focus-within:bg-overlay-hover"
        onSubmit={(e) => {
          e.preventDefault();
          const body = encodeURIComponent(`Please add ${email} to the list.`);
          window.location.href = `mailto:${loop.mailto}?subject=${encodeURIComponent(loop.subject)}&body=${body}`;
        }}
      >
        <label className="sr-only" htmlFor="loop-email">
          {loop.placeholder}
        </label>
        <input
          id="loop-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={loop.placeholder}
          className="min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-ink-faint"
        />
        <button type="submit" className={PRIMARY}>
          {loop.action}
        </button>
      </form>
    </div>
  );
}
