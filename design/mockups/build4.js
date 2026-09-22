// Section 3 ("everything else"), four layouts. The six feature animations are
// written once, in CSS and SVG, and reused by every layout.
const fs = require("fs");
const icons = JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8"));
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;
const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const av = (c, s) => `<span class="ava" style="width:${s}px;height:${s}px;background-image:url(a/neuralarc-avatar-${c}-512.webp)"></span>`;

// ── Shared styles and keyframes ─────────────────────────────────────────
const LANGS = ["English", "हिन्दी", "Español", "Français", "Deutsch", "Русский", "Português", "日本語", "Italiano", "Nederlands", "मराठी", "தமிழ்", "తెలుగు", "বাংলা", "ಕನ್ನಡ", "ગુજરાતી", "ਪੰਜਾਬੀ", "اردو"];
const ROW = 64;
// The language roll: steps from one to the next, resting on each.
const langKeys = LANGS.map((_, i) => {
  const a = (i / LANGS.length) * 100;
  const b = a + (100 / LANGS.length) * 0.72;
  return `${a.toFixed(3)}%{transform:translateY(${-i * ROW}px)}${b.toFixed(3)}%{transform:translateY(${-i * ROW}px)}`;
}).join("") + `100%{transform:translateY(${-LANGS.length * ROW}px)}`;

const css = `
.h2{font-weight:300;font-size:56px;line-height:1.06;letter-spacing:-.03em}
.h2 span{color:var(--soft)}
.lead{font-size:20px;color:var(--soft);line-height:1.55}
.ava{display:inline-block;flex:none;border-radius:50%;background-size:cover;background-position:center}
.stage{position:relative;overflow:hidden;border-radius:26px;background:var(--raised);box-shadow:var(--raise);width:100%;height:100%}
.hand{font-family:"Caveat",cursive}
.ft{font-size:21px;color:var(--ink)} .fb{font-size:16px;color:var(--soft);margin-top:4px;line-height:1.5}

/* captions: words stream in, the line clears, the next line streams */
@keyframes capword{0%{opacity:0;filter:blur(3px)}3%{opacity:1;filter:none}100%{opacity:1}}
@keyframes capline{0%,46%{opacity:1}50%,100%{opacity:0}}
.cap-line{grid-area:1/1;animation:capline 10s infinite both}
.cap-line span{opacity:0;animation:capword 10s infinite both}

/* languages */
@keyframes roll{${langKeys}}
.roll{animation:roll ${LANGS.length * 1.7}s cubic-bezier(.65,0,.35,1) infinite}

/* drawn strokes: pathLength=1 lines drawn in; the whole drawing fades before it restarts */
@keyframes draw{0%{stroke-dashoffset:1}14%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
@keyframes sheet{0%,86%{opacity:1}94%,100%{opacity:0}}
.sheet{animation:sheet 10s infinite}
.ink{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 10s infinite both}
@keyframes pop{0%{opacity:0;transform:scale(.4)}6%{opacity:1;transform:scale(1.08)}9%,100%{opacity:1;transform:scale(1)}}
.pop{opacity:0;transform-box:fill-box;transform-origin:center;animation:pop 10s infinite both}
@keyframes fadein{0%{opacity:0}6%,100%{opacity:1}}
.fade{opacity:0;animation:fadein 10s infinite both}

/* reactions: emoji rise up the stage and fade */
@keyframes rise{0%{transform:translate(0,0) scale(.6);opacity:0}12%{opacity:1;transform:translate(6px,-40px) scale(1)}50%{transform:translate(-8px,-150px)}80%{opacity:1}100%{transform:translate(4px,-260px);opacity:0}}
.float{position:absolute;bottom:-10px;width:44px;height:44px;opacity:0;animation:rise 4.2s ease-out infinite}
@keyframes handpop{0%,20%{opacity:0;transform:translateY(10px) scale(.9)}26%,70%{opacity:1;transform:none}76%,100%{opacity:0;transform:translateY(-6px)}}
.handpill{animation:handpop 7s infinite}
`;
const page = (body, extra = "") =>
  `<!doctype html><html><head><meta charset="utf-8">${base}<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&display=block" rel="stylesheet"><style>${css}${extra}</style></head><body>${body}</body></html>`;

// ── The six features ────────────────────────────────────────────────────
const words = (line, start) =>
  line.split(" ").map((w, i) => `<span style="animation-delay:${(start + i * 0.16).toFixed(2)}s">${w}</span>`).join(" ");
const F = {
  captions: {
    title: "Captions, in the languages you mix",
    body: "Hindi and English in one sentence? Morse follows along.",
    art: () => `<div class="stage" style="background:url(a/ember.webp) center/cover">
      <span style="position:absolute;left:50%;top:40%;transform:translate(-50%,-50%)">${av("ember", 96)}</span>
      <span style="position:absolute;left:16px;top:16px;padding:4px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.72);font-size:14px">Priya Shah</span>
      <div style="position:absolute;left:16px;right:16px;bottom:16px;padding:14px 18px;border-radius:16px;background:oklch(0.142 0.008 55/.82);display:grid;font-size:19px;line-height:1.45;min-height:88px">
        <p class="cap-line" style="animation-delay:0s">${words("Onboarding pe dhyaan dena padega, people sign up and never come back.", 0.3)}</p>
        <p class="cap-line" style="animation-delay:5s">${words("Toh second meeting ka nudge try karte hain, starting this week.", 5.3)}</p>
      </div></div>`,
  },
  languages: {
    title: "18 languages",
    body: "Ten understood without a setting, eight more when you ask.",
    art: () => `<div class="stage" style="display:grid;place-items:center">
      <div style="position:relative;height:${ROW * 5}px;width:100%;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 30%,#000 70%,transparent)">
        <div style="position:absolute;left:0;right:0;top:${ROW * 2}px;height:${ROW}px;background:var(--overlay);margin:0 28px;border-radius:999px"></div>
        <div class="roll" style="position:absolute;left:0;right:0;top:${ROW * 2}px;text-align:center">
          ${[...LANGS, ...LANGS.slice(0, 3)].map((l) => `<div style="height:${ROW}px;display:grid;place-items:center;font-size:30px;font-weight:300">${l}</div>`).join("")}
        </div>
      </div></div>`,
  },
  whiteboard: {
    title: "A whiteboard in the call",
    body: "Sketch it out together, everyone’s cursor on the board.",
    art: () => `<div class="stage" style="background:oklch(0.19 0.009 52)">
      <svg viewBox="0 0 420 300" style="position:absolute;inset:0;width:100%;height:100%" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g class="sheet">
          <path class="ink" pathLength="1" style="animation-delay:.2s" stroke="#F7EFE8" stroke-width="2.2" d="M52 78 C 110 74, 150 76, 158 80 C 162 104, 160 122, 156 136 C 110 140, 70 139, 50 136 C 47 112, 48 96, 52 78 Z"/>
          <text class="fade hand" style="animation-delay:.9s" x="72" y="115" fill="#F7EFE8" font-size="26">Sign up</text>
          <path class="ink" pathLength="1" style="animation-delay:1.6s" stroke="#a9be8c" stroke-width="2.6" d="M168 108 C 205 104, 232 104, 262 108"/>
          <path class="ink" pathLength="1" style="animation-delay:2.4s" stroke="#a9be8c" stroke-width="2.6" d="M250 98 L 264 108 L 250 119"/>
          <path class="ink" pathLength="1" style="animation-delay:2.8s" stroke="#F7EFE8" stroke-width="2.2" d="M274 76 C 330 72, 368 74, 378 80 C 382 106, 380 124, 376 140 C 330 144, 294 142, 272 140 C 268 116, 270 96, 274 76 Z"/>
          <text class="fade hand" style="animation-delay:3.5s" x="288" y="115" fill="#F7EFE8" font-size="24">2nd call</text>
          <path class="ink" pathLength="1" style="animation-delay:4.4s" stroke="#FFB48E" stroke-width="2.6" d="M214 150 C 190 168, 196 212, 232 214 C 270 216, 282 178, 256 158 C 244 150, 226 150, 214 156"/>
          <text class="fade hand" style="animation-delay:5.4s" x="206" y="250" fill="#FFB48E" font-size="28">70% stop here</text>
        </g>
        <g>
          <animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.16;0.24;0.44;0.54;1" keyPoints="0;0;0.35;0.35;1;1" path="M168 108 C 205 104, 232 104, 262 108 C 280 130, 250 160, 232 214 L 280 250"/>
          <path d="M0 0 L 0 16 L 5 12 L 9 20 L 12 18 L 8 11 L 14 10 Z" fill="#94b6d2" stroke="#0c0907" stroke-width="1"/>
          <rect x="12" y="18" width="52" height="20" rx="10" fill="#94b6d2"/><text x="20" y="32" font-size="12" fill="#111c27" font-family="IBM Plex Sans">Arjun</text>
        </g>
      </svg></div>`,
  },
  annotate: {
    title: "Draw on what’s shared",
    body: "Circle the number that matters while you present.",
    art: () => `<div class="stage" style="background:#1c1714">
      <span style="position:absolute;left:16px;top:16px;display:flex;gap:8px;align-items:center;padding:4px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.72);font-size:14px">${ic("ComputerScreenShareIcon", 15)} Priya is presenting</span>
      <svg viewBox="0 0 420 300" style="position:absolute;inset:0;width:100%;height:100%" fill="none" stroke-linecap="round">
        <text x="40" y="84" fill="#F7EFE8" font-size="17" font-family="IBM Plex Sans">Meetings per new account</text>
        ${[[60, 150], [120, 118], [180, 60], [240, 44], [300, 40]].map(([x, h], i) => `<rect x="${x}" y="${250 - h}" width="38" height="${h}" rx="6" fill="${i === 1 ? "#FFB48E" : "#3a302a"}"/><text x="${x + 8}" y="272" fill="#9c8b7e" font-size="12" font-family="IBM Plex Sans">${["1st", "2nd", "3rd", "4th", "5th"][i]}</text>`).join("")}
        <g class="sheet">
          <path class="ink" pathLength="1" style="animation-delay:.8s" stroke="#e8927c" stroke-width="3.2" d="M110 118 C 96 100, 150 88, 170 110 C 184 130, 160 150, 130 146 C 108 142, 102 126, 118 112"/>
          <path class="ink" pathLength="1" style="animation-delay:2s" stroke="#e8927c" stroke-width="3.2" d="M270 140 C 240 136, 210 128, 178 118"/>
          <path class="ink" pathLength="1" style="animation-delay:2.6s" stroke="#e8927c" stroke-width="3.2" d="M190 108 L 176 118 L 192 126"/>
          <text class="fade hand" style="animation-delay:3.2s" x="276" y="150" fill="#e8927c" font-size="28">the drop</text>
        </g>
        <g><animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.08;0.2;0.26;1" keyPoints="0;0;0.5;1;1" path="M110 118 C 96 100, 150 88, 170 110 C 184 130, 160 150, 130 146 M 270 140 C 240 136, 210 128, 178 118"/>
          <circle r="6" fill="#e8927c"/><circle r="11" fill="#e8927c" opacity=".25"/></g>
      </svg></div>`,
  },
  reactions: {
    title: "Reactions and raised hands",
    body: "Pixel emoji float up the stage; hands wait their turn.",
    art: () => `<div class="stage" style="background:url(a/lagoon.webp) center/cover">
      <span style="position:absolute;left:50%;top:42%;transform:translate(-50%,-50%)">${av("lagoon", 96)}</span>
      ${["red-heart", "party-popper", "thumbs-up", "fire", "clapping-hands", "face-with-tears-of-joy", "red-heart"].map((e, i) => `<img class="float" src="a/${e}.svg" style="left:${[18, 34, 52, 66, 78, 42, 88][i]}%;animation-delay:${(i * 0.62).toFixed(2)}s">`).join("")}
      <span class="handpill" style="position:absolute;left:16px;top:16px;display:flex;gap:8px;align-items:center;padding:6px 14px 6px 8px;border-radius:999px;background:oklch(0.142 0.008 55/.78);font-size:15px"><img src="a/raising-hands.svg" style="width:22px">Arjun raised a hand</span>
      <span style="position:absolute;left:16px;bottom:16px;padding:4px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.72);font-size:14px">Arjun Mehta</span>
    </div>`,
  },
  mindmap: {
    title: "Notes, drawn as a map",
    body: "Every meeting’s notes branch out, section by section.",
    art: () => {
      const sections = [
        ["Onboarding", "#FF8FB1", ["Drop after sign-up", "Try a nudge"]],
        ["Acme renewal", "#E8C98A", ["This year’s rate", "Two extra seats"]],
        ["Next steps", "#8FD9C4", ["Arjun: the nudge", "Priya: the terms"]],
      ];
      let t = 0.4;
      const parts = [];
      sections.forEach(([name, col, items], si) => {
        const sy = 70 + si * 80;
        parts.push(`<path class="ink" pathLength="1" style="animation-delay:${t}s" stroke="${col}" stroke-opacity=".7" stroke-width="1.6" d="M88 150 C 120 150, 120 ${sy}, 150 ${sy}"/>`);
        parts.push(`<circle class="pop" style="animation-delay:${t + 0.5}s" cx="154" cy="${sy}" r="5" fill="${col}"/><text class="fade" style="animation-delay:${t + 0.6}s" x="166" y="${sy + 5}" fill="#F7EFE8" font-size="14" font-family="IBM Plex Sans">${name}</text>`);
        t += 0.7;
        items.forEach((it, ii) => {
          const iy = sy - 14 + ii * 28;
          parts.push(`<path class="ink" pathLength="1" style="animation-delay:${t}s" stroke="${col}" stroke-opacity=".45" stroke-width="1.3" d="M262 ${sy} C 280 ${sy}, 280 ${iy}, 298 ${iy}"/><circle class="pop" style="animation-delay:${t + 0.4}s" cx="302" cy="${iy}" r="3.5" fill="${col}"/><text class="fade" style="animation-delay:${t + 0.45}s" x="312" y="${iy + 4}" fill="#b3a194" font-size="12" font-family="IBM Plex Sans">${it}</text>`);
          t += 0.35;
        });
      });
      return `<div class="stage"><svg viewBox="0 0 420 300" style="position:absolute;inset:0;width:100%;height:100%" fill="none" stroke-linecap="round">
        <g class="sheet"><circle class="pop" style="animation-delay:0s" cx="70" cy="150" r="7" fill="#F7EFE8"/><text class="fade" style="animation-delay:.1s" x="22" y="180" fill="#F7EFE8" font-size="13" font-family="IBM Plex Sans">Design review</text>${parts.join("")}</g>
      </svg></div>`;
    },
  },
};
const ORDER = ["captions", "languages", "whiteboard", "annotate", "reactions", "mindmap"];
const HEAD = (align = "split") =>
  align === "split"
    ? `<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px"><h2 class="h2">Everything else<br><span>you’d expect, done properly.</span></h2><p class="lead" style="max-width:400px">The small things that make a call feel easy, each one as considered as the big ones.</p></div>`
    : `<div style="text-align:center"><h2 class="h2">Everything else<br><span>you’d expect, done properly.</span></h2></div>`;

// ── 1 · Index and stage ────────────────────────────────────────────────
const L1 = page(`
<section style="padding:140px 120px 140px">
  ${HEAD()}
  <div style="display:grid;grid-template-columns:420px 1fr;gap:96px;margin-top:88px;align-items:center">
    <ol id="index" style="list-style:none;padding:0">
      ${ORDER.map((k, i) => `<li data-k="${k}" style="padding:18px 0;cursor:pointer;transition:opacity .4s">
        <p style="font-size:30px;font-weight:300;letter-spacing:-.02em">${F[k].title}</p>
        <p class="fb" style="max-height:0;overflow:hidden;opacity:0;transition:all .5s">${F[k].body}</p></li>`).join("")}
    </ol>
    <div style="position:relative;height:560px">
      ${ORDER.map((k) => `<div data-stage="${k}" style="position:absolute;inset:0;transition:opacity .6s, transform .6s">${F[k].art()}</div>`).join("")}
    </div>
  </div>
</section>
<script>
  const keys=${JSON.stringify(ORDER)};let i=0;
  function show(n){i=n;document.querySelectorAll('#index li').forEach((li,j)=>{li.style.opacity=j===i?1:.32;const b=li.querySelector('.fb');b.style.maxHeight=j===i?'60px':'0';b.style.opacity=j===i?1:0;b.style.marginTop=j===i?'6px':'0'});
    document.querySelectorAll('[data-stage]').forEach(s=>{const on=s.dataset.stage===keys[i];s.style.opacity=on?1:0;s.style.transform=on?'none':'scale(.97)';s.style.pointerEvents=on?'auto':'none'})}
  document.querySelectorAll('#index li').forEach((li,j)=>li.onmouseenter=()=>show(j));
  show(${ORDER.indexOf("whiteboard")});setInterval(()=>show((i+1)%keys.length),7000);
</script>`);

// ── 2 · Constellation: scattered, with room to breathe ─────────────────
const spots = { captions: [40, 0, 520, 360], languages: [680, 110, 300, 300], whiteboard: [1100, 20, 440, 320], annotate: [180, 560, 460, 330], reactions: [760, 600, 300, 380], mindmap: [1140, 520, 420, 300] };
const L2 = page(`
<section style="padding:140px 60px 160px">
  ${HEAD("center")}
  <div style="position:relative;height:1080px;margin-top:96px;left:50%;width:1600px;transform:translateX(-50%) scale(.82);transform-origin:top center">
    ${ORDER.map((k) => { const [x, y, w, h] = spots[k]; return `<figure style="position:absolute;left:${x}px;top:${y}px;width:${w}px"><div style="height:${h}px">${F[k].art()}</div><figcaption style="margin-top:16px"><p class="ft">${F[k].title}</p><p class="fb">${F[k].body}</p></figcaption></figure>`; }).join("")}
  </div>
</section>`);

// ── 3 · Filmstrip: tall cards, one row, drag to see more ──────────────
const L3 = page(`
<section style="padding:140px 0 140px">
  <div style="padding:0 120px">${HEAD()}</div>
  <div style="display:flex;gap:40px;margin-top:88px;padding:0 120px;overflow-x:auto;scrollbar-width:none">
    ${ORDER.map((k) => `<figure style="flex:none;width:380px"><div style="height:500px">${F[k].art()}</div><figcaption style="margin-top:22px"><p class="ft">${F[k].title}</p><p class="fb">${F[k].body}</p></figcaption></figure>`).join("")}
  </div>
</section>`);

// ── 4 · Stacked: one feature per card, cards stack as you scroll ──────
const L4 = page(`
<section style="padding:140px 120px 200px">
  ${HEAD()}
  <div style="margin-top:88px">
    ${ORDER.map((k, i) => `<div style="position:sticky;top:${110 + i * 18}px;margin-bottom:80px">
      <div style="display:grid;grid-template-columns:1fr 1.25fr;gap:64px;align-items:center;padding:48px 56px;border-radius:34px;background:oklch(0.175 0.009 52);box-shadow:var(--floatsh);height:540px">
        <div><p style="font-size:40px;font-weight:300;letter-spacing:-.02em;line-height:1.1">${F[k].title}</p><p class="lead" style="margin-top:16px">${F[k].body}</p></div>
        <div style="height:100%">${F[k].art()}</div>
      </div></div>`).join("")}
  </div>
</section>`);

for (const [n, html] of Object.entries({ 1: L1, 2: L2, 3: L3, 4: L4 })) fs.writeFileSync(`${__dirname}/s3b-${n}.html`, html);
console.log("built");
