// Section 7, the questions. Four layouts, same five questions in each.
const fs = require("fs");
const icons = { ...JSON.parse(fs.readFileSync(__dirname + "/icons.json", "utf8")), ...JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8")) };
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;
const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const css = `
.h2{font-weight:300;font-size:58px;line-height:1.05;letter-spacing:-.03em}
.h2 span{color:var(--soft)}
.lead{font-size:19px;color:var(--soft);line-height:1.55}
.q{font-size:23px;color:var(--ink)}
.a{font-size:18px;color:var(--soft);line-height:1.6}
.rule{border-top:1px solid var(--hair)}
.plus{color:var(--soft)}
.pane{background:var(--raised);border-radius:26px;box-shadow:var(--raise)}
.tag{font-family:"Geist Mono",monospace;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;font-weight:600;color:var(--faint)}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8">${base}<style>${css}</style></head><body>${body}</body></html>`;

const QA = [
  ["What is Morse?", "Morse is a video meeting app. It takes notes and action items for you, answers questions from your notes during the call, and books follow-ups. It also has booking pages and a calendar synced with Google."],
  ["Does a bot join my meetings?", "No. Morse transcribes the call itself, so no extra attendee appears in the meeting. Everyone can see when recording is on."],
  ["Can Morse replace my scheduling tool?", "For one-to-one meetings, yes. You get a booking page with the meeting lengths and hours you choose, and it’s tied to your calendar. Team pages, round-robin and payments aren’t available."],
  ["What happens after a meeting?", "You get notes with a summary, decisions and action items, including who owns each one and when it’s due. The recording and transcript are there too, and you can share the notes by email."],
  ["What can I customize?", "Light or dark, one of five accent colours, your photo, a background (blur or a picture), and a camera style such as Warm, Film or Mono."],
];
const OPEN = 1; // the one shown open in every mockup

// ── 1 · Title left, list right ──────────────────────────────────────────
const L1 = page(`
<section style="padding:150px 90px;display:grid;grid-template-columns:380px 1fr;gap:100px">
  <div>
    <h2 class="h2">Questions,<br><span>answered.</span></h2>
    <p class="lead" style="margin-top:20px">Anything else, and there’s a person at the other end of <span style="color:var(--ink)">hello@neuralarc.ai</span>.</p>
  </div>
  <div>
    ${QA.map(([q, a], i) => `<div class="${i ? "rule" : ""}" style="padding:26px 0">
      <div style="display:flex;justify-content:space-between;gap:40px;align-items:center"><p class="q">${q}</p><span class="plus" style="${i === OPEN ? "transform:rotate(45deg)" : ""}">${ic("Add01Icon", 22)}</span></div>
      ${i === OPEN ? `<p class="a" style="margin-top:14px;max-width:70ch">${a}</p>` : ""}
    </div>`).join("")}
  </div>
</section>`);

// ── 2 · Centred, big questions, quiet rules ────────────────────────────
const L2 = page(`
<section style="padding:150px 90px;text-align:center">
  <h2 class="h2">A few things you<br><span>might be wondering.</span></h2>
  <div style="max-width:860px;margin:64px auto 0;text-align:left">
    ${QA.map(([q, a], i) => `<div class="${i ? "rule" : ""}" style="padding:28px 0">
      <div style="display:flex;justify-content:space-between;gap:40px;align-items:center"><p class="q" style="font-size:25px">${q}</p><span class="plus" style="${i === OPEN ? "transform:rotate(45deg)" : ""}">${ic("Add01Icon", 22)}</span></div>
      ${i === OPEN ? `<p class="a" style="margin-top:14px;max-width:66ch">${a}</p>` : ""}
    </div>`).join("")}
  </div>
  <p class="lead" style="margin-top:48px">Still wondering? <span style="color:var(--ink)">hello@neuralarc.ai</span></p>
</section>`);

// ── 3 · The list on the left, the answer held on the right ─────────────
const L3 = page(`
<section style="padding:150px 90px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2">Questions,<br><span>answered.</span></h2>
    <p class="lead" style="max-width:380px">Pick one. The answer sits beside it, so you keep your place in the list.</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:20px;margin-top:64px;align-items:start">
    <div class="pane" style="padding:14px">
      ${QA.map(([q], i) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 22px;border-radius:18px;${i === OPEN ? "background:var(--overlay)" : ""}">
        <p style="font-size:20px;color:${i === OPEN ? "var(--ink)" : "var(--soft)"}">${q}</p>${i === OPEN ? `<span style="color:var(--ink)">${ic("ArrowRight01Icon", 20)}</span>` : ""}
      </div>`).join("")}
    </div>
    <div class="pane" style="padding:38px 40px;min-height:430px">
      <p class="tag">Answer</p>
      <p class="q" style="font-size:27px;margin-top:14px">${QA[OPEN][0]}</p>
      <p class="a" style="margin-top:16px">${QA[OPEN][1]}</p>
    </div>
  </div>
</section>`);

// ── 4 · Two columns of cards ───────────────────────────────────────────
const L4 = page(`
<section style="padding:150px 90px">
  <div style="text-align:center"><h2 class="h2">A few things you<br><span>might be wondering.</span></h2></div>
  <div style="columns:2;column-gap:20px;margin-top:64px;max-width:1160px;margin-left:auto;margin-right:auto">
    ${QA.map(([q, a], i) => `<div class="pane" style="break-inside:avoid;margin-bottom:20px;padding:30px 32px">
      <div style="display:flex;justify-content:space-between;gap:24px;align-items:flex-start"><p class="q" style="font-size:21px">${q}</p><span class="plus" style="${i === OPEN ? "transform:rotate(45deg)" : ""}">${ic("Add01Icon", 20)}</span></div>
      ${i === OPEN ? `<p class="a" style="margin-top:14px;font-size:17px">${a}</p>` : ""}
    </div>`).join("")}
  </div>
  <p class="lead" style="text-align:center;margin-top:36px">Still wondering? <span style="color:var(--ink)">hello@neuralarc.ai</span></p>
</section>`);

for (const [n, html] of Object.entries({ 1: L1, 2: L2, 3: L3, 4: L4 })) fs.writeFileSync(`${__dirname}/s7-${n}.html`, html);
console.log("built");
