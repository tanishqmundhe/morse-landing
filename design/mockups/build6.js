// Section 4, four framings. The two cards in the middle stay exactly as built
// (cards.png is a capture of them); only what surrounds them changes.
const fs = require("fs");
const icons = JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8"));
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;
const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const css = `
.h2{font-weight:300;letter-spacing:-.03em;line-height:1.05}
.h2 span{color:var(--soft)}
.lead{color:var(--soft);line-height:1.55}
.cards{width:1000px;max-width:100%}
.link{display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 8px 0 20px;border-radius:999px;background:var(--raised);box-shadow:var(--raise);font-size:17px}
.link b{font-weight:400;color:var(--ink)}
.copybtn{display:inline-flex;align-items:center;gap:8px;height:34px;padding:0 16px;border-radius:999px;background:var(--overlay);font-size:15px;color:var(--ink)}
.point{display:flex;gap:12px;align-items:flex-start;font-size:17px;color:var(--ink)}
.point svg{margin-top:3px;color:var(--faint)}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8">${base}<style>${css}</style></head><body>${body}</body></html>`;
const CARDS = `<img class="cards" src="cards.png" alt="">`;
const POINTS = ["Meeting types from 15 to 90 minutes", "Your usual hours, and your country’s holidays", "Ten minutes to undo, for them and for you"];
const LINK = `<span class="link">${ic("Link01Icon", 18)}<b>onmorse.com/priya</b><span class="copybtn">${ic("Copy01Icon", 15)} Copy</span></span>`;

// ── 1 · Centred. Title, one line, the link, then the cards. ───────────────
const S1 = page(`
<section style="padding:150px 60px 150px;text-align:center">
  <h2 class="h2" style="font-size:64px">One link, and your<br><span>calendar does the rest.</span></h2>
  <p class="lead" style="font-size:20px;max-width:620px;margin:22px auto 0">Share it once. People pick from the times you actually have free, in their own time zone.</p>
  <div style="margin-top:30px">${LINK}</div>
  <div style="display:flex;justify-content:center;margin-top:60px">${CARDS}</div>
  <div style="display:flex;justify-content:center;gap:56px;margin-top:48px;color:var(--soft);font-size:17px">
    ${POINTS.map((t) => `<span>${t}</span>`).join("")}
  </div>
</section>`);

// ── 2 · Copy on the left, cards on the right, nothing above them. ─────────
const S2 = page(`
<section style="padding:150px 80px;display:grid;grid-template-columns:400px 1fr;gap:80px;align-items:center">
  <div>
    <h2 class="h2" style="font-size:56px">Booked before<br><span>you reply.</span></h2>
    <p class="lead" style="font-size:19px;margin-top:22px">One link, on your calendar’s terms. They see the times you have free, in their own time zone; you get the meeting with a Morse link already on it.</p>
    <div style="display:flex;flex-direction:column;gap:14px;margin-top:32px">
      ${POINTS.map((t) => `<span class="point">${ic("Tick02Icon", 18)}${t}</span>`).join("")}
    </div>
    <div style="margin-top:32px">${LINK}</div>
  </div>
  <div style="display:flex;justify-content:flex-end">${CARDS}</div>
</section>`);

// ── 3 · On a band, with the link as the page's own address bar. ───────────
const S3 = page(`
<section style="padding:120px 0 130px;background:var(--sunken)">
  <div style="max-width:1200px;margin:0 auto;padding:0 60px;display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2" style="font-size:58px">Your hours,<br><span>their time zone.</span></h2>
    <p class="lead" style="font-size:19px;max-width:420px">A booking page that reads your calendar, offers only what’s free, and puts the meeting on your week with a Morse link.</p>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;margin-top:64px">
    <div style="width:1000px;max-width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px 12px 22px;border-radius:22px 22px 0 0;background:var(--raised);box-shadow:var(--raise)">
      ${ic("Link01Icon", 18)}<span style="font-size:17px;color:var(--soft)">onmorse.com/<b style="color:var(--ink);font-weight:400">priya</b></span>
      <span class="copybtn" style="margin-left:auto">${ic("Copy01Icon", 15)} Copy link</span>
    </div>
    ${CARDS}
  </div>
  <div style="max-width:1200px;margin:52px auto 0;padding:0 60px;display:grid;grid-template-columns:repeat(3,1fr);gap:40px">
    ${POINTS.map((t) => `<span class="point">${ic("Tick02Icon", 18)}${t}</span>`).join("")}
  </div>
</section>`);

// ── 4 · Big type on the left, the cards bleeding off the right. ──────────
const S4 = page(`
<section style="padding:150px 0 150px;overflow:hidden">
  <div style="display:grid;grid-template-columns:520px 1fr;gap:60px;align-items:center;padding-left:90px">
    <div>
      <h2 class="h2" style="font-size:76px">Let them<br>pick the<br><span>time.</span></h2>
      <p class="lead" style="font-size:19px;margin-top:26px;max-width:420px">Your booking page offers only the times your calendar has free, and the meeting lands on your week with a Morse link.</p>
      <div style="margin-top:30px">${LINK}</div>
    </div>
    <div style="margin-right:-160px">${CARDS}</div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:1160px;margin:70px auto 0;padding:0 90px">
    ${POINTS.map((t) => `<span class="point">${ic("Tick02Icon", 18)}${t}</span>`).join("")}
  </div>
</section>`);

for (const [n, html] of Object.entries({ 1: S1, 2: S2, 3: S3, 4: S4 })) fs.writeFileSync(`${__dirname}/s4b-${n}.html`, html);
console.log("built");
