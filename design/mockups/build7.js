// Section 5, four options. Each is a story the page still hasn't told, and
// each one animates. 1 trust · 2 make it yours · 3 the follow-up · 4 the notes.
const fs = require("fs");
const icons = { ...JSON.parse(fs.readFileSync(__dirname + "/icons.json", "utf8")), ...JSON.parse(fs.readFileSync(__dirname + "/icons2.json", "utf8")), ...JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8")) };
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;
const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const av = (c, s) => `<span class="ava" style="width:${s}px;height:${s}px;background-image:url(a/neuralarc-avatar-${c}-512.webp)"></span>`;
const css = `
.h2{font-weight:300;font-size:60px;line-height:1.05;letter-spacing:-.03em}
.h2 span{color:var(--soft)}
.lead{font-size:20px;color:var(--soft);line-height:1.55}
.ava{display:inline-block;flex:none;border-radius:50%;background-size:cover;background-position:center}
.tile{position:relative;border-radius:22px;overflow:hidden;background-size:cover;background-position:center}
.name{position:absolute;left:12px;bottom:12px;padding:4px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.72);font-size:14px;display:flex;gap:6px;align-items:center}
.pane{background:var(--raised);border-radius:26px;box-shadow:var(--raise)}
.sunk{background:var(--sunken);box-shadow:inset 0 1px 2px oklch(0.06 0.006 50/.45),inset 0 0 0 1px oklch(0.9564 0.0127 63.92/.04);border-radius:18px}
.tag{font-family:"Geist Mono",monospace;font-size:13px;letter-spacing:1.6px;text-transform:uppercase;font-weight:600;color:var(--faint)}
@keyframes seat{0%{opacity:0;transform:translateY(16px) scale(.96);filter:blur(6px)}100%{opacity:1;transform:none;filter:none}}
@keyframes dash{to{stroke-dashoffset:0}}
@keyframes breathe{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes bgc{0%{opacity:0}4%,18%{opacity:1}22%,100%{opacity:0}}
@keyframes lab{0%{opacity:0;transform:translateY(6px)}4%,18%{opacity:1;transform:none}22%,100%{opacity:0}}
@keyframes tick{0%,55%{opacity:0;transform:scale(.4)}62%,100%{opacity:1;transform:scale(1)}}
@keyframes strike{0%,55%{width:0}66%,100%{width:100%}}
@keyframes drop{0%,40%{opacity:0;transform:translateY(-16px) scale(.97)}48%,100%{opacity:1;transform:none}}
@keyframes cardin{0%,15%{opacity:0;transform:translateY(14px)}24%,100%{opacity:1;transform:none}}
`;
const page = (body) => `<!doctype html><html><head><meta charset="utf-8">${base}<style>${css}</style></head><body>${body}</body></html>`;
const seat = (bg, c, name, delay) =>
  `<div class="tile" style="background-image:url(a/${bg});animation:seat .9s cubic-bezier(.16,1,.3,1) ${delay}s both"><span style="position:absolute;inset:0;display:grid;place-items:center">${av(c, 58)}</span><span class="name">${name}</span></div>`;

// ── 1 · Nobody else joins the call ──────────────────────────────────────
const S1 = page(`
<section style="padding:150px 56px">
  <div style="position:relative;height:700px;border-radius:36px;overflow:hidden;box-shadow:var(--floatsh)">
    <video src="a/ringed-meadow-loop.mp4" poster="a/ringed-meadow.png" autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 60%"></video>
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,oklch(0.142 0.008 55/.93),oklch(0.142 0.008 55/.55) 48%,oklch(0.142 0.008 55/.12))"></div>
    <div style="position:absolute;left:72px;top:88px;max-width:500px">
      <h2 class="h2" style="font-size:70px">Nobody else<br><span>joins the call.</span></h2>
      <p class="lead" style="margin-top:24px;max-width:430px">No notetaker bot sits in your meeting. Morse listens from inside the call, and everyone can see when it’s recording.</p>
    </div>
    <div style="position:absolute;right:64px;bottom:64px;display:grid;grid-template-columns:repeat(2,246px);grid-template-rows:repeat(2,160px);gap:14px">
      ${seat("ember.webp", "ember", "Priya Shah", 0.3)}${seat("lagoon.webp", "lagoon", "Arjun Mehta", 0.55)}${seat("sage.webp", "sage", "You", 0.8)}
      <div class="tile" style="background:oklch(0.142 0.008 55/.35);animation:seat .9s cubic-bezier(.16,1,.3,1) 1.2s both">
        <svg style="position:absolute;inset:0;width:100%;height:100%"><rect x="1.5" y="1.5" rx="21" width="243" height="157" fill="none" stroke="#F7EFE8" stroke-opacity=".32" stroke-width="2" stroke-dasharray="8 8" pathLength="800" style="stroke-dashoffset:800;animation:dash 1.6s ease-out 1.5s forwards"/></svg>
        <span style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:var(--soft);font-size:15px;animation:up .6s 2.6s both">${ic("Robot01Icon", 26, 1.4)}<br>No bot here</span>
      </div>
    </div>
    <span style="position:absolute;right:64px;top:56px;display:flex;align-items:center;gap:10px;padding:8px 16px;border-radius:999px;background:oklch(0.142 0.008 55/.75);font-size:16px"><i class="dot" style="animation:breathe 1.6s infinite"></i><span style="color:var(--signal)">Recording</span><span style="color:var(--soft)">visible to everyone</span></span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:72px;margin:88px 72px 0">
    ${[["Guests knock first", "People without an invite wait until you let them in."], ["Answers go where you choose", "The host picks which colleagues see the teleprompter."], ["Notes leave on purpose", "Morse points out sensitive parts before notes are shared."]].map(([t, b], i) => `<div style="animation:up .8s ${3 + i * 0.2}s both"><p style="font-size:22px">${t}</p><p class="lead" style="font-size:17px;margin-top:6px">${b}</p></div>`).join("")}
  </div>
</section>`);

// ── 2 · Your room, your light ───────────────────────────────────────────
const bgs = [["sunlit-room", "Warm", "sepia(.22) saturate(1.08)"], ["lake-sunrise", "Film", "contrast(1.1) saturate(.82) sepia(.12)"], ["reading-nook", "Cool", "hue-rotate(-10deg) brightness(1.03)"], ["night-bloom", "Vivid", "saturate(1.4)"], ["snowy-cabin", "Mono", "grayscale(1) contrast(1.06)"]];
const accents = ["#a9be8c", "#6ec3b4", "#94b6d2", "#b3b4d6", "#cc98be"];
const S2 = page(`
<section style="padding:150px 100px;text-align:center">
  <h2 class="h2">Your room.<br><span>Your light.</span></h2>
  <p class="lead" style="max-width:600px;margin:22px auto 0">Where you appear to be, how your camera looks, and the colour of your Morse. Everyone in the call sees the room you chose.</p>
  <div style="position:relative;height:620px;border-radius:34px;overflow:hidden;margin-top:64px;box-shadow:var(--floatsh);max-width:1040px;margin-left:auto;margin-right:auto">
    ${bgs.map(([b, , f], i) => `<div style="position:absolute;inset:0;background:url(a/${b}.webp) center/cover;filter:${f};opacity:0;animation:bgc 20s ${i * 4}s infinite"></div>`).join("")}
    <div style="position:absolute;inset:0;background:radial-gradient(70% 70% at 50% 45%,transparent,oklch(0.142 0.008 55/.4))"></div>
    <span style="position:absolute;left:50%;top:47%;transform:translate(-50%,-50%)">${av("sage", 150)}</span>
    <span class="name" style="left:24px;bottom:24px;font-size:17px;padding:8px 18px">${ic("Mic01Icon", 16)} You</span>
    <div style="position:absolute;right:24px;top:24px;display:grid;padding:9px 20px;border-radius:999px;background:oklch(0.142 0.008 55/.78);font-size:16px">
      ${bgs.map(([, s], i) => `<span style="grid-area:1/1;opacity:0;animation:lab 20s ${i * 4}s infinite">Style · ${s}</span>`).join("")}
    </div>
    <div style="position:absolute;left:50%;bottom:28px;transform:translateX(-50%);display:flex;align-items:center;gap:20px;padding:10px 12px 10px 22px;border-radius:999px;background:oklch(0.142 0.008 55/.82)">
      <div style="display:flex;gap:14px">${accents.map((c, i) => `<span style="width:30px;height:30px;border-radius:50%;background:${c};box-shadow:${i === 0 ? "0 0 0 2px oklch(0.142 0.008 55),0 0 0 4px #F7EFE8" : "none"}"></span>`).join("")}</div>
      <span style="display:flex;align-items:center;gap:8px;height:44px;padding:0 20px;border-radius:999px;font-size:16px;font-weight:500;background:#a9be8c;color:#1a2112">+ New meeting</span>
    </div>
  </div>
  <div style="display:flex;justify-content:center;gap:52px;margin-top:40px;color:var(--soft);font-size:17px">
    <span>16 backgrounds in four sets</span><span>7 camera styles</span><span>5 accents</span><span>Light or dark</span>
  </div>
</section>`);

// ── 3 · The follow-up books itself ──────────────────────────────────────
const S3 = page(`
<section style="padding:150px 90px;display:grid;grid-template-columns:420px 1fr;gap:80px;align-items:center">
  <div>
    <h2 class="h2" style="font-size:54px">“Let’s pick this up<br>Thursday.”<br><span>Booked.</span></h2>
    <p class="lead" style="font-size:19px;margin-top:24px">When a call arranges the next one, Morse offers to book it: the time it heard, a check against your calendar, and who’s invited. Nothing is sent until someone says yes.</p>
    <div style="display:flex;flex-direction:column;gap:14px;margin-top:30px">
      ${[["Heard, not typed", "It comes from what was said out loud."], ["Checked against your week", "Clashes are caught before the invite."], ["Yours to approve", "One press books it; one dismisses it."]].map(([t, b]) => `<div><p style="font-size:19px">${t}</p><p class="lead" style="font-size:16px">${b}</p></div>`).join("")}
    </div>
  </div>
  <div style="position:relative;height:640px">
    <div class="pane" style="position:absolute;inset:0;padding:14px;overflow:hidden">
      <div style="display:grid;grid-template-columns:1.6fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:100%">
        <div class="tile" style="grid-row:span 2;background-image:url(a/ember.webp);box-shadow:0 0 0 2px var(--signal)"><span style="position:absolute;inset:0;display:grid;place-items:center">${av("ember", 96)}</span><span class="name">${ic("Mic01Icon", 14)} Priya Shah</span></div>
        <div class="tile" style="background-image:url(a/lagoon.webp)"><span style="position:absolute;inset:0;display:grid;place-items:center">${av("lagoon", 54)}</span><span class="name">Arjun</span></div>
        <div class="tile" style="background-image:url(a/sage.webp)"><span style="position:absolute;inset:0;display:grid;place-items:center">${av("sage", 54)}</span><span class="name">You</span></div>
      </div>
      <div style="position:absolute;left:28px;right:28px;bottom:28px;padding:20px 22px;border-radius:24px;background:var(--float);box-shadow:var(--floatsh);animation:cardin 12s infinite">
        <p style="font-size:15px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Priya</b> said “Let’s pick this up Thursday at two.”</p>
        <p style="margin-top:12px;font-size:21px;display:flex;align-items:center;gap:10px">${ic("Calendar03Icon", 20)} Book a follow-up?</p>
        <p style="font-size:17px;color:var(--soft);margin-top:4px">Thursday, 2:00 – 2:30 pm · No clashes</p>
        <div style="display:flex;gap:8px;margin-top:10px">
          ${[["ember", "Priya Shah"], ["lagoon", "Arjun Mehta"]].map(([c, n]) => `<span style="display:inline-flex;align-items:center;gap:8px;padding:4px 14px 4px 4px;border-radius:999px;background:var(--overlay);font-size:15px">${av(c, 26)}${n}</span>`).join("")}
        </div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <span class="btn pri" style="flex:1;justify-content:center;height:44px">Book</span>
          <span class="btn sec" style="flex:1;justify-content:center;height:44px">Don’t book</span>
        </div>
      </div>
    </div>
  </div>
</section>`);

// ── 4 · Notes that do the work ──────────────────────────────────────────
const items = [["Draft the onboarding nudge", "Arjun · Fri"], ["Send Acme the renewal terms", "Priya · Tomorrow"], ["Book three user interviews", "You · Next week"]];
const S4 = page(`
<section style="padding:150px 90px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2">You talked.<br><span>It wrote everything down.</span></h2>
    <p class="lead" style="max-width:420px">A summary, the decisions, and everyone’s action items — with the recording, the transcript and a map of what was said underneath.</p>
  </div>
  <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:16px;margin-top:64px">
    <div class="pane" style="padding:34px 38px">
      <p class="tag">Tuesday 22 September · 42 min</p>
      <p style="font-size:30px;font-weight:300;margin-top:10px">Weekly design review</p>
      <p style="font-size:18px;color:var(--soft);line-height:1.55;margin-top:14px">Onboarding is where people drop off. The team will test a second-meeting nudge for two weeks and keep Acme on this year’s rate until March.</p>
      <p class="tag" style="margin-top:28px">Decisions</p>
      <p style="font-size:18px;margin-top:8px">Test the second-meeting nudge for two weeks</p>
      <p style="font-size:18px;margin-top:4px">Acme stays on this year’s rate until March</p>
      <p class="tag" style="margin-top:28px">Your action items</p>
      ${items.map(([t, m], i) => `<div style="display:flex;gap:14px;align-items:center;margin-top:12px">
        <span style="width:24px;height:24px;border-radius:50%;background:var(--overlay);display:grid;place-items:center;position:relative">
          <span style="position:absolute;inset:0;border-radius:50%;background:var(--action);color:var(--action-fg);display:grid;place-items:center;animation:tick 9s ${i * 0.8}s infinite">${ic("Tick02Icon", 13, 2.4)}</span>
        </span>
        <span style="flex:1;font-size:18px;position:relative">${t}<span style="position:absolute;left:0;top:52%;height:1px;background:var(--faint);animation:strike 9s ${i * 0.8}s infinite"></span></span>
        <span style="font-size:15px;color:var(--faint)">${m}</span>
      </div>`).join("")}
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="pane" style="padding:18px;display:flex;flex-direction:column;gap:14px">
        <div class="tile" style="height:190px;background-image:url(a/ember.webp)"><span style="position:absolute;inset:0;display:grid;place-items:center">${av("ember", 72)}</span>
          <div style="position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.78)">
            <span style="width:30px;height:30px;border-radius:50%;background:var(--ink);color:var(--canvas);display:grid;place-items:center">${ic("PlayIcon", 14)}</span>
            <span style="height:3px;flex:1;border-radius:2px;background:var(--overlay);position:relative"><span style="position:absolute;inset:0;width:38%;border-radius:2px;background:var(--ink)"></span></span>
            <span class="mono" style="font-size:13px;color:var(--soft)">12:48</span>
          </div>
        </div>
        <p style="font-size:19px">The recording, beside the words</p>
      </div>
      <div class="pane" style="padding:22px">
        <p class="tag">Share</p>
        <p style="font-size:17px;margin-top:10px">priya@neuralarc.ai, arjun@neuralarc.ai</p>
        <p style="font-size:15px;color:var(--signal);margin-top:8px">One part mentions salary. Check before sending.</p>
      </div>
      <div class="pane" style="padding:22px;flex:1">
        <p class="tag">The meeting, as a map</p>
        <svg viewBox="0 0 320 150" style="width:100%;margin-top:10px" fill="none" stroke-linecap="round">
          <circle cx="24" cy="75" r="5" fill="#F7EFE8"/>
          ${[["Onboarding", "#FF8FB1", 34], ["Acme renewal", "#E8C98A", 78], ["Next steps", "#8FD9C4", 122]].map(([n, c, y]) => `<path d="M32 75 C 60 75, 60 ${y}, 88 ${y}" stroke="${c}" stroke-opacity=".6" stroke-width="1.6"/><circle cx="92" cy="${y}" r="4" fill="${c}"/><text x="104" y="${+y + 4}" fill="#b3a194" font-size="12" font-family="IBM Plex Sans">${n}</text>`).join("")}
        </svg>
      </div>
    </div>
  </div>
</section>`);

for (const [n, html] of Object.entries({ 1: S1, 2: S2, 3: S3, 4: S4 })) fs.writeFileSync(`${__dirname}/s5-${n}.html`, html);
console.log("built");
