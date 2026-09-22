// Builds static mockups of the hero options. Stills stand in for the looping films.
const fs = require("fs");
const icons = JSON.parse(fs.readFileSync(__dirname + "/icons.json", "utf8"));
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;

// Morse code for M O R S E, drawn with the logo's own geometry: 5px bars, r2.5 dots.
const CODE = { M: "--", O: "---", R: ".-.", S: "...", E: "." };
function morse(word, { unit = 5, gap = 5, letterGap = 16, color = "#F7EFE8", lit = null } = {}) {
  let x = 0, parts = [], k = 0, centers = [];
  for (const ch of word) {
    const start = x;
    for (const s of CODE[ch]) {
      const w = s === "-" ? unit * 4.4 : unit;
      const c = typeof lit === "function" ? lit(k) : color;
      parts.push(`<rect x="${x}" y="0" width="${w}" height="${unit}" rx="${unit / 2}" fill="${c}"/>`);
      x += w + gap; k++;
    }
    centers.push((start + x - gap) / 2);
    x += letterGap - gap;
  }
  return { svg: `<svg width="${x}" height="${unit}" viewBox="0 0 ${x} ${unit}">${parts.join("")}</svg>`, width: x, centers };
}

const base = `
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Geist+Mono:wght@500;600&display=block" rel="stylesheet">
<style>
:root{--sunken:oklch(0.165 0.008 52);--canvas:oklch(0.142 0.008 55);--raised:oklch(0.205 0.01 50);--float:oklch(0.25 0.008 55);--overlay:oklch(0.28 0.01 52);--overlay-h:oklch(0.315 0.011 52);--ink:oklch(0.9564 0.0127 63.92);--soft:oklch(0.72 0.028 56);--faint:oklch(0.66 0.033 55);--hair:oklch(0.3 0.012 50);--signal:oklch(0.78 0.125 36);--action:#a9be8c;--action-fg:#1a2112;
--raise:0 0 0 1px oklch(0.9564 0.0127 63.92/.04),0 1px 2px oklch(0.06 0.006 50/.3),0 10px 28px -16px oklch(0.06 0.006 50/.5);
--floatsh:0 0 0 1px oklch(0.9564 0.0127 63.92/.07),0 18px 44px -14px oklch(0.06 0.006 50/.7)}
*{box-sizing:border-box;margin:0}
body{background:var(--canvas);color:var(--ink);font:400 18px/1.55 "IBM Plex Sans",sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.mono{font-family:"Geist Mono",monospace}
.btn{display:inline-flex;align-items:center;gap:10px;height:48px;padding:0 24px;border-radius:999px;font-size:17px;font-weight:500;white-space:nowrap}
.pri{background:var(--action);color:var(--action-fg)}
.sec{background:var(--overlay);color:var(--ink)}
.ghost{color:var(--soft)}
h1{font-weight:300;letter-spacing:-.03em;line-height:1.02}
h1 span{color:var(--soft)}
.nav a{color:var(--soft);font-size:16px;text-decoration:none}
.dot{width:8px;height:8px;border-radius:50%;background:var(--signal);box-shadow:0 0 0 4px oklch(0.78 0.125 36/.18)}
.film{background-size:cover;background-position:center}
.tag{font-family:"Geist Mono",monospace;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;font-weight:600}
</style>`;

const page = (title, body, extra = "") =>
  `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>${base}<style>${extra}</style></head><body>${body}</body></html>`;

const navLinks = ["Product", "Teleprompter", "Booking", "Questions"];

// ── A · Film window ─────────────────────────────────────────────────────────
const A = page(
  "A",
  `
<div style="position:absolute;inset:14px;border-radius:30px;overflow:hidden" class="film" >
  <div class="film" style="position:absolute;inset:0;background-image:url(signal.png);background-position:60% 40%"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,oklch(0.142 0.008 55/.92) 0%,oklch(0.142 0.008 55/.55) 45%,transparent 75%),linear-gradient(0deg,oklch(0.142 0.008 55/.85),transparent 45%)"></div>

  <header class="nav" style="position:absolute;top:0;left:0;right:0;height:88px;display:flex;align-items:center;justify-content:space-between;padding:0 36px">
    <img src="logo.svg" style="height:24px">
    <nav style="display:flex;gap:6px;padding:6px;border-radius:999px;background:oklch(0.142 0.008 55/.55);box-shadow:0 0 0 1px oklch(0.9564 0.0127 63.92/.06)">
      ${navLinks.map((l, i) => `<a style="padding:8px 16px;border-radius:999px;${i == 0 ? "background:var(--overlay);color:var(--ink)" : ""}">${l}</a>`).join("")}
    </nav>
    <div style="display:flex;gap:10px;align-items:center"><a class="ghost" style="font-size:16px;margin-right:10px">Sign in</a><span class="btn pri" style="height:42px;padding:0 20px;font-size:16px">Open Morse</span></div>
  </header>

  <div style="position:absolute;left:56px;bottom:64px;max-width:640px">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:28px">${morse("MORSE", { unit: 5 }).svg}<span class="tag" style="color:var(--soft)">Video meetings, written down</span></div>
    <h1 style="font-size:92px">Good conversations.<br><span>Real progress.</span></h1>
    <p style="margin-top:26px;font-size:20px;color:var(--soft);max-width:520px">Meetings that take their own notes, answer questions from what you know, and book the next one before you hang up.</p>
    <div style="display:flex;gap:14px;margin-top:34px;align-items:center"><span class="btn pri">Open Morse ${ic("ArrowRight01Icon", 18, 2)}</span><span class="btn sec">${ic("PlayIcon", 18)} Watch a meeting</span></div>
  </div>

  <div style="position:absolute;right:40px;bottom:64px;width:380px;border-radius:24px;background:var(--float);box-shadow:var(--floatsh);padding:18px 20px">
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:15px;color:var(--soft)">Weekly product sync</span><span class="tag" style="color:var(--signal);display:flex;gap:8px;align-items:center"><i class="dot"></i>Recording</span></div>
    <p style="margin-top:14px;font-size:15px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Priya</b> 10:04</p>
    <p style="font-size:17px;color:var(--ink)">Can we get the launch brief ready for Friday?</p>
    <div style="margin-top:14px;padding:12px 14px;border-radius:16px;background:var(--sunken);font-size:15px;color:var(--soft);display:flex;gap:10px;align-items:center">${ic("Note01Icon", 18)} Action item added: <span style="color:var(--ink)">Launch brief · Fri</span></div>
  </div>
</div>`
);

// ── B · Split stage (closest to the reference) ─────────────────────────────
const B = page(
  "B",
  `
<div style="position:absolute;inset:0 48px;border-left:1px solid var(--hair);border-right:1px solid var(--hair)"></div>
<header class="nav" style="position:relative;height:76px;margin:0 48px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--hair)">
  <div style="display:flex;align-items:center;gap:48px"><img src="logo.svg" style="height:22px"><nav style="display:flex;gap:30px">${navLinks.map((l) => `<a>${l}</a>`).join("")}</nav></div>
  <div style="display:flex;gap:10px"><span class="btn sec" style="height:42px;padding:0 20px;font-size:16px">Sign in</span><span class="btn pri" style="height:42px;padding:0 20px;font-size:16px">Open Morse</span></div>
</header>
<section style="position:relative;margin:0 48px;height:700px;display:grid;grid-template-columns:1fr 1.08fr">
  <div style="padding:120px 56px 0 56px">
    <span style="display:inline-flex;gap:10px;align-items:center;padding:6px 14px 6px 10px;border-radius:999px;background:var(--raised);box-shadow:var(--raise);font-size:15px;color:var(--soft)"><span style="color:var(--action)">${ic("SparklesIcon", 16)}</span>New: the teleprompter answers from your notes</span>
    <h1 style="font-size:64px;margin-top:30px;white-space:nowrap">Meetings that write<br><span>themselves down.</span></h1>
    <p style="margin-top:24px;font-size:20px;color:var(--soft);max-width:470px">Video calls with notes, action items and follow-ups, and a booking page on the same calendar.</p>
    <div style="display:flex;gap:14px;margin-top:36px"><span class="btn pri">Open Morse ${ic("ArrowRight01Icon", 18, 2)}</span><span class="btn sec">See how it works</span></div>
  </div>
  <div style="position:relative;border-left:1px solid var(--hair);overflow:hidden">
    <div class="film" style="position:absolute;inset:0;background-image:url(ringed-meadow.png);background-position:50% 50%"></div>
    <div style="position:absolute;inset:0;background:radial-gradient(70% 70% at 50% 50%,transparent,oklch(0.142 0.008 55/.75))"></div>
    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-52%);width:470px;border-radius:26px;background:var(--float);box-shadow:var(--floatsh);padding:22px 24px">
      <div style="display:flex;justify-content:space-between"><span class="tag" style="color:var(--faint)">Teleprompter</span><span class="tag" style="color:var(--signal);display:flex;gap:8px;align-items:center"><i class="dot"></i>Live</span></div>
      <p style="margin-top:16px;font-size:15px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Daniel</b> asked “What did we agree with Acme on renewal pricing?”</p>
      <p style="margin-top:8px;font-size:22px;line-height:1.45">The annual plan at this year’s rate, fixed until March, with two extra seats included.</p>
      <p style="margin-top:12px;font-size:15px;color:var(--faint)">From Acme renewal notes</p>
    </div>
    <div style="position:absolute;left:50%;bottom:44px;transform:translateX(-50%);display:flex;gap:10px;padding:8px;border-radius:999px;background:oklch(0.142 0.008 55/.7);box-shadow:0 0 0 1px oklch(0.9564 0.0127 63.92/.07)">
      ${["Mic01Icon", "Video01Icon", "ClosedCaptionIcon", "UserGroupIcon"].map((n) => `<span style="width:46px;height:46px;border-radius:50%;background:var(--overlay);display:grid;place-items:center">${ic(n, 20)}</span>`).join("")}
      <span style="width:62px;height:46px;border-radius:999px;background:oklch(0.7 0.17 25);display:grid;place-items:center;color:oklch(0.2 0.03 25)">${ic("CallEnd01Icon", 20)}</span>
    </div>
  </div>
</section>
<div style="position:relative;margin:0 48px;height:44px;border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);display:flex;align-items:center;gap:26px;overflow:hidden;padding-left:32px">
  ${Array.from({ length: 12 }, () => morse("MORSE", { unit: 4, color: "oklch(0.42 0.015 50)" }).svg).join("")}
</div>
<p style="text-align:center;margin:56px auto 0;max-width:760px;font-size:32px;font-weight:300;line-height:1.35">Morse is a video meeting app <span style="color:var(--faint)">that listens, takes the notes, and keeps the work moving after everyone leaves.</span></p>
`
);

// ── C · Rooms: a row of films as meeting backgrounds ──────────────────────
const cards = [
  { img: "grass.png", w: 210, name: "Jamie" },
  { img: "desk.png", w: 250, name: "Sofia" },
  { img: "signal.png", w: 420, name: "Priya", main: true },
  { img: "meadow.png", w: 250, name: "Daniel" },
  { img: "postbox.png", w: 210, name: "Arjun" },
];
const C = page(
  "C",
  `
<header class="nav" style="position:absolute;top:22px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:28px;padding:8px 8px 8px 22px;border-radius:999px;background:var(--raised);box-shadow:var(--raise)">
  <img src="mark.svg" style="height:26px"><nav style="display:flex;gap:26px">${navLinks.map((l) => `<a>${l}</a>`).join("")}</nav><span class="btn pri" style="height:40px;padding:0 18px;font-size:16px">Open Morse</span>
</header>
<section style="text-align:center;padding-top:150px">
  <h1 style="font-size:84px">Good conversations.<br><span>Real progress.</span></h1>
  <p style="margin:24px auto 0;font-size:20px;color:var(--soft);max-width:600px">A video meeting app that takes its own notes, answers from what you know, and books the follow-up.</p>
  <div style="display:flex;gap:14px;margin-top:34px;justify-content:center"><span class="btn pri">Open Morse ${ic("ArrowRight01Icon", 18, 2)}</span><span class="btn sec">See how it works</span></div>
</section>
<div style="position:absolute;left:0;right:0;bottom:-6px;display:flex;justify-content:center;align-items:flex-end;gap:14px">
  ${cards
    .map(
      (c) => `<div style="position:relative;width:${c.w}px;height:${c.main ? 330 : 240}px;border-radius:24px;overflow:hidden;box-shadow:var(--raise);${c.main ? "" : "opacity:.7"}">
    <div class="film" style="position:absolute;inset:0;background-image:url(${c.img})"></div>
    <span style="position:absolute;left:12px;bottom:${c.main ? 70 : 52}px;display:flex;align-items:center;gap:8px;padding:4px 12px 4px 8px;border-radius:999px;background:oklch(0.142 0.008 55/.7);font-size:14px">${c.main ? '<i class="dot" style="background:var(--action);box-shadow:0 0 0 4px #a9be8c33"></i>' : ic("Mic01Icon", 14)} ${c.name}</span>
    ${c.main ? `<div style="position:absolute;left:12px;right:12px;bottom:14px;padding:9px 14px;border-radius:14px;background:oklch(0.142 0.008 55/.78);font-size:15px;text-align:left">Let’s pick this up on Thursday at two.</div>` : ""}
  </div>`
    )
    .join("")}
</div>
<div style="position:absolute;left:0;right:0;bottom:0;height:40px;background:linear-gradient(transparent,var(--canvas))"></div>
`
);

// ── D · Signal: the name as code, the product rising under it ─────────────
const sig = morse("MORSE", { unit: 12, gap: 12, letterGap: 44, lit: (k) => (k === 6 ? "var(--signal)" : "#F7EFE8") });
const D = page(
  "D",
  `
<div class="film" style="position:absolute;inset:0;background-image:url(gold-8.png);opacity:.28"></div>
<div style="position:absolute;inset:0;background:radial-gradient(60% 55% at 50% 30%,transparent,var(--canvas) 80%)"></div>
<header class="nav" style="position:absolute;top:0;left:0;right:0;height:86px;padding:0 56px;display:flex;align-items:center;justify-content:space-between">
  <img src="logo.svg" style="height:22px"><div style="display:flex;align-items:center;gap:34px"><nav style="display:flex;gap:30px">${navLinks.map((l) => `<a>${l}</a>`).join("")}</nav><span class="btn sec" style="height:42px;padding:0 20px;font-size:16px">Open Morse</span></div>
</header>
<section style="position:relative;text-align:center;padding-top:128px">
  <div style="display:inline-flex;flex-direction:column;align-items:center;gap:14px">
    ${sig.svg}
    <div class="mono" style="position:relative;height:16px;width:${sig.width}px;font-size:13px;color:var(--faint)">${"MORSE".split("").map((c,i)=>`<span style="position:absolute;left:${sig.centers[i]}px;transform:translateX(-50%)">${c}</span>`).join("")}</div>
  </div>
  <h1 style="font-size:80px;margin-top:44px">Every meeting,<br><span>written down.</span></h1>
  <p style="margin:22px auto 0;font-size:20px;color:var(--soft);max-width:580px">Notes, action items and the follow-up, from the call itself. No bot in the room.</p>
  <div style="display:flex;gap:14px;margin-top:32px;justify-content:center"><span class="btn pri">Open Morse ${ic("ArrowRight01Icon", 18, 2)}</span><span class="btn sec">${ic("PlayIcon", 18)} Watch it work</span></div>
</section>
<div style="position:absolute;left:50%;bottom:-400px;transform:translateX(-50%);width:1000px;padding:10px;border-radius:32px;background:var(--raised);box-shadow:var(--floatsh)">
  <img src="today.jpg" style="width:100%;display:block;border-radius:24px">
</div>
`
);

for (const [n, html] of Object.entries({ A, B, C, D })) fs.writeFileSync(`${__dirname}/hero-${n}.html`, html);
console.log("built");
