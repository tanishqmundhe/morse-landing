# Morse landing page

Next.js 16 · React 19 · Tailwind v4. Same stack as the Morse app and the Neural Arc site.

```sh
npm install
npm run dev      # http://localhost:3300
npm run build
```

## Where things live

- `src/content/site.ts`: every word on the page. Change copy here, not in components.
- `src/components/`: one component per section. The interactive demos (tour, workflow tabs, booking, teleprompter, theme swatches, action demo) are client components.
- `src/app/globals.css`: design tokens (`:root`, mapped into Tailwind's `@theme`) and the section styles ported from the static starter.
- `public/product/morse-workspace.png`: hero product screenshot.
- `docs/DESIGN.md`: the design system of record. Update it with every visual change.

The booking, action and teleprompter demos are illustrative. They create no meetings and send no data.
