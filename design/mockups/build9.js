// Section 8: the closing and the footer. Four layouts.
const fs = require("fs");
const icons = { ...JSON.parse(fs.readFileSync(__dirname + "/icons.json", "utf8")), ...JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8")) };
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;
const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const css = `
.h2{font-weight:300;line-height:1.04;letter-spacing:-.035em}
.h2 span{color:var(--soft)}
.lead{font-size:19px;color:var(--soft);line-height:1.55}
.foot{font-size:15px;color:var(--faint)}
.foot a{color:var(--soft);text-decoration:none;margin-left:28px}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8">${base}<style>${css}</style></head><body>${body}</body></html>`;
const LINKS = ["Product", "Features", "Booking", "Questions"];
const UM = `<span style="display:flex;align-items:center;gap:10px" class="foot">A product by <img src="um.svg" style="height:26px;opacity:.8"></span>`;
const CTA = (size = 17) => `<span class="btn pri" style="height:${size === 17 ? 52 : 56}px;font-size:${size}px;padding:0 28px">Open Morse ${ic("ArrowRight01Icon", 18, 2)}</span>`;

// ── 1 · A last film, with the words over it ────────────────────────────
const C1 = page(`
<section style="padding:0 14px 14px">
  <div style="position:relative;height:620px;border-radius:32px;overflow:hidden;display:grid;place-items:center;text-align:center">
    <video src="a/ringed-meadow-loop.mp4" poster="a/ringed-meadow.png" autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>
    <div style="position:absolute;inset:0;background:linear-gradient(0deg,oklch(0.142 0.008 55/.92),oklch(0.142 0.008 55/.55))"></div>
    <div style="position:relative">
      <img src="mark.svg" style="height:46px;opacity:.85">
      <h2 class="h2" style="font-size:62px;margin-top:26px">Less meeting admin.<br><span>More meeting of minds.</span></h2>
      <div style="margin-top:34px">${CTA()}</div>
    </div>
  </div>
</section>
<footer style="display:flex;align-items:center;justify-content:space-between;gap:30px;padding:34px 44px 44px">
  <img src="logo.svg" style="height:20px;opacity:.75">
  <nav class="foot">${LINKS.map((l) => `<a>${l}</a>`).join("")}</nav>
  ${UM}
</footer>`);

// ── 2 · Quiet centre, giant wordmark as the footer ─────────────────────
const C2 = page(`
<section style="padding:170px 60px 90px;text-align:center">
  <img src="mark.svg" style="height:44px;opacity:.8">
  <h2 class="h2" style="font-size:66px;margin-top:28px">Less meeting admin.<br><span>More meeting of minds.</span></h2>
  <p class="lead" style="max-width:520px;margin:22px auto 0">Google sign-in, your calendar connected, and your first meeting in a minute.</p>
  <div style="margin-top:36px">${CTA()}</div>
</section>
<footer style="padding:40px 44px 0">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:30px;padding-bottom:26px">
    <nav class="foot" style="margin-left:-28px">${LINKS.map((l) => `<a>${l}</a>`).join("")}</nav>
    ${UM}
  </div>
  <img src="logo.svg" style="width:100%;opacity:.1;display:block">
</footer>`);

// ── 3 · Split: the line on one side, the way in on the other ───────────
const C3 = page(`
<section style="padding:150px 60px 100px">
  <div style="border-radius:34px;background:var(--raised);box-shadow:var(--raise);padding:80px;display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:center">
    <h2 class="h2" style="font-size:58px">Less meeting admin.<br><span>More meeting of minds.</span></h2>
    <div>
      <p class="lead">Google sign-in, your calendar connected, and your first meeting in a minute.</p>
      <div style="margin-top:28px;display:flex;gap:12px;align-items:center">${CTA()}<span class="btn sec" style="height:52px;font-size:17px;padding:0 24px">See the product</span></div>
    </div>
  </div>
</section>
<footer style="display:flex;align-items:center;justify-content:space-between;gap:30px;padding:0 60px 54px">
  <img src="logo.svg" style="height:20px;opacity:.75">
  <nav class="foot">${LINKS.map((l) => `<a>${l}</a>`).join("")}</nav>
  ${UM}
</footer>`);

// ── 4 · The name in code, one last time ────────────────────────────────
const CODE = { M: "--", O: "---", R: ".-.", S: "...", E: "." };
let x = 0;
const bars = [];
for (const ch of "MORSE") {
  for (const s of CODE[ch]) {
    const w = s === "-" ? 30 : 7;
    bars.push(`<rect x="${x}" y="0" width="${w}" height="7" rx="3.5" fill="#F7EFE8" opacity=".85"/>`);
    x += w + 7;
  }
  x += 16;
}
const C4 = page(`
<section style="padding:170px 60px 90px;text-align:center">
  <svg width="${x}" height="7" viewBox="0 0 ${x} 7" style="max-width:70%">${bars.join("")}</svg>
  <h2 class="h2" style="font-size:64px;margin-top:38px">Less meeting admin.<br><span>More meeting of minds.</span></h2>
  <div style="margin-top:34px">${CTA()}</div>
  <p class="lead" style="font-size:16px;margin-top:18px">Google sign-in · Your calendar connected in a minute</p>
</section>
<footer style="margin-top:70px;border-top:1px solid var(--hair);display:flex;align-items:center;justify-content:space-between;gap:30px;padding:30px 60px 44px">
  <img src="logo.svg" style="height:20px;opacity:.75">
  <nav class="foot">${LINKS.map((l) => `<a>${l}</a>`).join("")}</nav>
  ${UM}
</footer>`);

for (const [n, html] of Object.entries({ 1: C1, 2: C2, 3: C3, 4: C4 })) fs.writeFileSync(`${__dirname}/s8-${n}.html`, html);
console.log("built");
