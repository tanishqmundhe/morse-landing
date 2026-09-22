// Section 2 options: showing the product itself. Rebuilt app surfaces (from the
// real room, notes, calendar and teleprompter) with the app's own avatars and
// profile backgrounds.
const fs = require("fs");
const icons = JSON.parse(fs.readFileSync(__dirname + "/icons.json", "utf8"));
const extra = JSON.parse(fs.readFileSync(__dirname + "/icons2.json", "utf8"));
Object.assign(icons, extra);
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;

const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const page = (body, css = "") =>
  `<!doctype html><html><head><meta charset="utf-8">${base}<style>
  body{padding:0}
  .h2{font-weight:300;font-size:52px;line-height:1.06;letter-spacing:-.03em}
  .h2 span{color:var(--soft)}
  .lead{font-size:19px;color:var(--soft);line-height:1.55}
  .win{border-radius:28px;background:var(--canvas);box-shadow:var(--floatsh),0 40px 120px -40px #000;overflow:hidden}
  .pane{background:var(--raised);border-radius:22px}
  .pill{display:inline-flex;align-items:center;gap:8px;border-radius:999px}
  .ava{border-radius:50%;background-size:cover;background-position:center}
  .tile{position:relative;border-radius:20px;overflow:hidden;background:var(--raised);background-size:cover;background-position:center}
  .name{position:absolute;left:12px;bottom:12px;padding:4px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.72);font-size:14px;display:flex;gap:6px;align-items:center}
  .ctl{width:46px;height:46px;border-radius:50%;background:var(--overlay);display:grid;place-items:center;color:var(--ink)}
  .sunk{background:var(--sunken);box-shadow:inset 0 1px 2px oklch(0.06 0.006 50/.45),inset 0 0 0 1px oklch(0.9564 0.0127 63.92/.04);border-radius:16px}
  .mono{font-family:"Geist Mono",monospace}
  ${css}</style></head><body>${body}</body></html>`;

const P = { priya: "ember", arjun: "lagoon", you: "sage", sofia: "lilac", daniel: "fjord" };
const av = (who, s) => `<span class="ava" style="display:inline-block;flex:none;width:${s}px;height:${s}px;background-image:url(a/neuralarc-avatar-${P[who]}-512.webp)"></span>`;

const transcript = [
  ["Priya Shah", "#e8927c", "17:11", "I pulled the numbers from last quarter before this."],
  ["Arjun Mehta", "#8fb8c9", "17:11", "The gap is mostly onboarding. People sign up and never get to a second meeting."],
  ["Priya Shah", "#e8927c", "17:12", "What did we promise Acme on the renewal?"],
];

// The meeting room, rebuilt from the app (screens 13 and 21), at a given width.
function room({ w = 1240, h = 700, side = "teleprompter", speaking = "priya", showTranscript = true } = {}) {
  const sidePanel =
    side === "teleprompter"
      ? `<div class="pane" style="width:300px;padding:18px 18px">
        <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:17px">Teleprompter</span><span style="color:var(--faint)">${ic("Cancel01Icon", 18)}</span></div>
        <p class="tag" style="color:var(--faint);margin-top:18px">Heard in the meeting</p>
        <div class="sunk" style="margin-top:10px;padding:14px">
          <p style="font-size:14px;color:var(--soft);line-height:1.4"><b style="color:var(--ink);font-weight:500">Priya</b> asked “What did we promise Acme on the renewal?”</p>
          <p style="margin-top:8px;font-size:18px;line-height:1.42">This year’s rate, fixed until March, with two extra seats.</p>
          <p style="margin-top:8px;font-size:13px;color:var(--faint)">From Acme renewal notes</p>
        </div>
        <div class="sunk" style="margin-top:10px;padding:14px">
          <p style="font-size:14px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Arjun</b> said “Let’s pick this up Thursday at two.”</p>
          <p style="margin-top:8px;font-size:16px;display:flex;gap:8px;align-items:center">${ic("Calendar03Icon", 17)} Book a follow-up?</p>
          <p style="font-size:14px;color:var(--soft)">Thu, 2:00 – 2:30 pm · No clashes</p>
          <div style="display:flex;gap:8px;margin-top:12px"><span class="btn pri" style="height:36px;font-size:14px;flex:1;justify-content:center">Book</span><span class="btn sec" style="height:36px;font-size:14px;flex:1;justify-content:center">Don’t book</span></div>
        </div>
      </div>`
      : side === "people"
        ? `<div class="pane" style="width:300px;padding:18px">
        <div style="display:flex;justify-content:space-between"><span style="font-size:17px">People <span style="color:var(--faint)">3</span></span></div>
        <span class="btn sec" style="width:100%;justify-content:center;margin-top:16px;height:42px;font-size:15px">${ic("UserAdd01Icon", 18)} Add people</span>
        ${[["you", "Tanishq (you)", "Host · UX Designer"], ["arjun", "Arjun Mehta", "Guest"], ["priya", "Priya Shah", "Guest"]]
          .map(([k, n, r]) => `<div style="display:flex;gap:12px;align-items:center;margin-top:16px">${av(k, 36)}<div style="flex:1"><p style="font-size:15px">${n}</p><p style="font-size:13px;color:var(--faint)">${r}</p></div>${ic("Mic01Icon", 17)}</div>`)
          .join("")}
      </div>`
        : "";
  const tr = showTranscript
    ? `<div class="pane" style="width:260px;padding:18px">
      <div style="display:flex;justify-content:space-between"><span style="font-size:17px">Transcript</span><span style="color:var(--faint)">${ic("Cancel01Icon", 18)}</span></div>
      ${transcript
        .map(
          ([n, c, t, x], i) => `<div style="margin-top:16px"><p style="display:flex;justify-content:space-between;font-size:14px"><span style="display:flex;gap:8px;align-items:center"><i style="width:6px;height:6px;border-radius:50%;background:${c}"></i>${n}</span><span style="color:var(--faint)">${t}</span></p>
        <p style="margin-top:4px;padding-left:12px;border-left:2px solid ${c}${i < 2 ? "66" : ""};font-size:15px;line-height:1.45;color:${i === 2 ? "var(--ink)" : "var(--soft)"}">${x}</p></div>`
        )
        .join("")}
    </div>`
    : "";
  const big = speaking;
  const others = ["priya", "arjun", "you"].filter((k) => k !== big);
  const label = { priya: "Priya Shah", arjun: "Arjun Mehta", you: "You" };
  return `<div class="win" style="width:${w}px;height:${h}px;display:flex;flex-direction:column;padding:14px 16px 12px">
    <div style="display:flex;align-items:center;gap:14px;height:44px">
      <img src="mark.svg" style="height:24px"><span style="width:1px;height:20px;background:var(--hair)"></span>
      <span style="font-size:18px">Weekly design review</span><span class="mono" style="color:var(--faint);font-size:14px">dsn-revw-wkl</span>
      <span style="margin-left:auto;display:flex;align-items:center;gap:8px;color:var(--signal);font-size:15px"><i class="dot"></i>Recording</span>
      <span class="pill" style="padding:6px 14px;background:var(--raised);font-size:14px;color:var(--soft)">In call <b class="mono" style="color:var(--ink);font-size:18px;font-weight:500">12:05</b></span>
    </div>
    <div style="flex:1;display:flex;gap:12px;margin-top:10px;min-height:0">
      ${tr}
      <div style="flex:1;display:grid;grid-template-rows:1.7fr 1fr;gap:10px;min-width:0">
        <div class="tile" style="background-image:url(a/${P[big]}.webp);box-shadow:0 0 0 2px var(--signal)">
          <div style="position:absolute;inset:0;display:grid;place-items:center">${av(big, 110)}</div>
          <span class="name">${ic("Mic01Icon", 14)} ${label[big]}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          ${others.map((k) => `<div class="tile" style="background-image:url(a/${P[k]}.webp)"><div style="position:absolute;inset:0;display:grid;place-items:center">${av(k, 64)}</div><span class="name">${label[k]}</span></div>`).join("")}
        </div>
      </div>
      ${sidePanel}
    </div>
    <div style="display:flex;justify-content:center;margin-top:10px">
      <div class="pill" style="padding:7px;background:var(--raised);gap:8px">
        ${["Mic01Icon", "Video01Icon", "ComputerScreenShareIcon", "SmileIcon"].map((n) => `<span class="ctl">${ic(n, 20)}</span>`).join("")}
        <span style="width:1px;height:26px;background:var(--hair)"></span>
        ${["Message01Icon", "UserGroupIcon"].map((n) => `<span class="ctl">${ic(n, 20)}</span>`).join("")}
        <span class="ctl" style="background:var(--ink);color:var(--canvas)">${ic("SparklesIcon", 20)}</span>
        <span class="ctl">${ic("MoreHorizontalIcon", 20)}</span>
        <span class="ctl" style="width:62px;border-radius:999px;background:oklch(0.7 0.17 25);color:oklch(0.2 0.03 25)">${ic("CallEnd01Icon", 20)}</span>
      </div>
    </div>
  </div>`;
}

// Notes page, rebuilt: summary, decisions, action items.
function notes(w = 520) {
  return `<div class="pane" style="width:${w}px;padding:22px 24px">
    <p class="tag" style="color:var(--faint)">Notes · Tuesday 22 September</p>
    <p style="font-size:22px;margin-top:8px">Weekly design review</p>
    <p style="font-size:16px;color:var(--soft);margin-top:8px;line-height:1.5">Onboarding is where people drop off. The team will test a second-meeting nudge and keep Acme on this year’s rate.</p>
    <p class="tag" style="color:var(--faint);margin-top:18px">Action items</p>
    ${[["Draft the onboarding nudge", "Arjun · Fri", true], ["Send Acme the renewal terms", "Priya · Tomorrow", false], ["Book user interviews", "You · Next week", false]]
      .map(([t, m, d]) => `<div style="display:flex;gap:12px;align-items:center;margin-top:10px"><span style="width:22px;height:22px;border-radius:50%;display:grid;place-items:center;${d ? "background:var(--action);color:var(--action-fg)" : "background:var(--overlay)"}">${d ? ic("Tick02Icon", 13, 2.2) : ""}</span><span style="flex:1;font-size:16px;${d ? "color:var(--faint);text-decoration:line-through" : ""}">${t}</span><span style="font-size:14px;color:var(--faint)">${m}</span></div>`)
      .join("")}
  </div>`;
}

const header = (title, muted, body, align = "split") =>
  align === "split"
    ? `<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:40px"><h2 class="h2">${title}<br><span>${muted}</span></h2><p class="lead" style="max-width:420px">${body}</p></div>`
    : `<div style="text-align:center"><h2 class="h2">${title}<br><span>${muted}</span></h2><p class="lead" style="max-width:560px;margin:18px auto 0">${body}</p></div>`;

// ── 1 · One window, five tabs ─────────────────────────────────────────────
const tabs = [
  ["Video01Icon", "Meet"],
  ["ClosedCaptionIcon", "Transcript"],
  ["SparklesIcon", "Teleprompter", true],
  ["Note01Icon", "Notes"],
  ["Calendar03Icon", "Calendar"],
];
const S1 = page(`
<section style="padding:110px 100px 90px">
  ${header("Everything happens", "in one window.", "Join, talk, ask and leave with notes without opening another app. This is the meeting room, as it is.", "center")}
  <div style="display:flex;justify-content:center;margin-top:36px">
    <div class="pill" style="padding:6px;background:var(--raised);box-shadow:var(--raise);gap:4px">
      ${tabs.map(([i, l, on]) => `<span class="pill" style="padding:10px 18px;font-size:16px;${on ? "background:var(--overlay);color:var(--ink)" : "color:var(--soft)"}">${ic(i, 18)} ${l}</span>`).join("")}
    </div>
  </div>
  <p style="text-align:center;margin-top:14px;font-size:16px;color:var(--faint)">Priya asks about Acme. The answer comes from your notes before she’s finished.</p>
  <div style="display:flex;justify-content:center;margin-top:30px">${room({ w: 1240, h: 720 })}</div>
</section>`);

// ── 2 · Pinned story: steps on the left drive the window ─────────────────
const steps = [
  ["Someone knocks", "Guests wait until you let them in. One press, and they’re in the room."],
  ["You talk. Morse writes.", "The transcript builds as people speak, in English, Hindi and more."],
  ["Someone asks. You already know.", "The teleprompter hears the question and answers it from your notes, only for the people you choose.", true],
  ["You leave with notes", "Summary, decisions and action items are waiting when the call ends."],
];
const S2 = page(`
<section style="padding:110px 60px 90px;display:grid;grid-template-columns:340px 1fr;gap:48px;align-items:start">
  <div style="padding-top:20px">
    <h2 class="h2" style="font-size:46px">A meeting,<br><span>from the inside.</span></h2>
    <div style="margin-top:44px;position:relative;padding-left:26px">
      <span style="position:absolute;left:0;top:6px;bottom:6px;width:2px;background:var(--overlay);border-radius:2px"></span>
      <span style="position:absolute;left:0;top:6px;height:62%;width:2px;background:var(--ink);border-radius:2px"></span>
      ${steps
        .map(
          ([t, b, on], i) => `<div style="margin-bottom:30px;${on ? "" : "opacity:.45"}"><p style="display:flex;gap:12px;align-items:baseline"><span class="mono" style="font-size:13px;color:var(--faint)">0${i + 1}</span><span style="font-size:21px">${t}</span></p>${on ? `<p style="margin-top:8px;font-size:17px;color:var(--soft);line-height:1.5">${b}</p>` : ""}</div>`
        )
        .join("")}
    </div>
  </div>
  <div style="position:relative">${room({ w: 920, h: 640, showTranscript: true })}
    <p style="margin-top:16px;font-size:15px;color:var(--faint)">The window stays put while you scroll; each step changes what’s in it.</p>
  </div>
</section>`);

// ── 3 · Statement with the product inline, then a rail of real screens ───
const chip = (inner, extraCss = "") => `<span style="display:inline-flex;vertical-align:middle;align-items:center;gap:8px;height:52px;padding:0 18px 0 8px;border-radius:999px;background:var(--raised);box-shadow:var(--raise);font-size:20px;letter-spacing:0;margin:0 4px;transform:translateY(-4px);${extraCss}">${inner}</span>`;
const S3 = page(`
<section style="padding:120px 110px 60px">
  <p style="font-size:54px;font-weight:300;line-height:1.35;letter-spacing:-.025em;max-width:1200px">
    Morse is a video call ${chip(`<span style="display:inline-flex">${av("priya", 38)}<span style="margin-left:-10px;display:inline-flex">${av("arjun", 38)}</span></span><span style="color:var(--soft)">3 in call</span>`)} that writes
    <span style="color:var(--ink)">everything down</span> ${chip(`<span style="width:38px;height:38px;border-radius:50%;background:var(--overlay);display:inline-grid;place-items:center">${ic("ClosedCaptionIcon", 20)}</span><span style="color:var(--soft)">Transcript</span>`)},
    <span style="color:oklch(0.5 0.02 55)">answers what you’re asked</span> ${chip(`<span style="width:38px;height:38px;border-radius:50%;background:var(--overlay);display:inline-grid;place-items:center">${ic("SparklesIcon", 20)}</span><span style="color:var(--soft)">From Acme notes</span>`, "opacity:.55")}
    <span style="color:oklch(0.4 0.015 55)">and books what comes next.</span> ${chip(`<span style="width:38px;height:38px;border-radius:50%;background:var(--action);color:var(--action-fg);display:inline-grid;place-items:center">${ic("Calendar03Icon", 20)}</span><span style="color:var(--soft)">Thu, 2:00 pm</span>`, "opacity:.3")}
  </p>
  <p style="margin-top:22px;font-size:16px;color:var(--faint)">The sentence lights up word by word as you scroll; each chip plays its bit of the product when it’s reached.</p>
</section>
<div style="position:relative;overflow:hidden;padding:20px 0 110px">
  <div style="display:flex;gap:18px;padding-left:40px;transform:translateX(-120px)">
    ${["02-meetings-home", "13-call-three-people-speaking", "03-calendar", "05-knowledge", "04-history"].map((s) => `<div style="flex:none;width:560px;border-radius:22px;overflow:hidden;box-shadow:var(--raise)"><img src="a/${s}.png" style="width:100%;display:block"></div>`).join("")}
  </div>
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,var(--canvas),transparent 12%,transparent 88%,var(--canvas))"></div>
</div>`);

// ── 4 · Bento of live surfaces ────────────────────────────────────────────
const cal = `<div style="display:grid;grid-template-columns:40px repeat(5,1fr);gap:6px;font-size:13px;color:var(--faint)">
  <span></span>${["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25"].map((d, i) => `<span style="text-align:center;${i === 1 ? "color:var(--ink)" : ""}">${d}</span>`).join("")}
  ${["10", "11", "12", "1", "2", "3"].map((h, r) => `<span style="text-align:right;padding-right:6px">${h}</span>${[0, 1, 2, 3, 4].map((c) => {
    const ev = { "0,0": ["Standup", "var(--action)"], "1,1": ["Design review", "var(--action)"], "3,2": ["Acme renewal", "#94b6d2"], "4,3": ["Follow-up", "var(--signal)"], "2,4": ["1:1 Priya", "var(--action)"] }[`${r},${c}`];
    return `<span style="height:34px;border-radius:8px;${ev ? `background:color-mix(in oklch, ${ev[1]} 22%, transparent);color:var(--ink);padding:4px 7px;font-size:12px;border-left:3px solid ${ev[1]}` : "background:oklch(0.9564 0.0127 63.92/.03)"}">${ev ? ev[0] : ""}</span>`;
  }).join("")}`).join("")}
</div>`;
const card = (title, body, inner, style = "") => `<div class="pane" style="padding:24px;display:flex;flex-direction:column;${style}"><div style="flex:1">${inner}</div><p style="font-size:20px;margin-top:22px">${title}</p><p style="font-size:16px;color:var(--soft);margin-top:4px;line-height:1.5">${body}</p></div>`;
const S4 = page(`
<section style="padding:110px 90px 100px">
  ${header("Five things, one app.", "All of them working.", "Every tile is the real surface from Morse, playing on its own. Hover one to see it up close.")}
  <div style="display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:280px;gap:14px;margin-top:44px">
    <div class="pane" style="grid-column:span 7;grid-row:span 2;padding:10px;overflow:hidden;position:relative">
      <div style="transform:scale(.572);transform-origin:0 0;position:absolute;left:10px;top:10px">${room({ w: 1240, h: 860, side: "people", showTranscript: true })}</div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:24px;background:linear-gradient(transparent,var(--raised) 45%)"><p style="font-size:20px">The meeting room</p><p style="font-size:16px;color:var(--soft);margin-top:4px">Transcript on the left, people on the right, your backgrounds on every tile.</p></div>
    </div>
    <div style="grid-column:span 5;grid-row:span 1">${card("Teleprompter", "Answers from your notes, as the question is asked.", `<div class="sunk" style="padding:14px 16px"><p style="font-size:14px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Priya</b> asked “What did we promise Acme on the renewal?”</p><p style="margin-top:6px;font-size:19px;line-height:1.4">This year’s rate, fixed until March, with two extra seats.</p><p style="margin-top:6px;font-size:13px;color:var(--faint)">From Acme renewal notes</p></div>`, "height:100%")}</div>
    <div style="grid-column:span 5;grid-row:span 1">${card("Notes", "Summary, decisions and action items, when the call ends.", `<p style="font-size:15px;color:var(--soft);line-height:1.5;margin-bottom:12px">Onboarding is where people drop off. Test a second-meeting nudge; keep Acme on this year’s rate.</p><div style="display:flex;flex-direction:column;gap:8px">${[["Draft the onboarding nudge", true], ["Send Acme the renewal terms", false], ["Book user interviews", false]].map(([t, d]) => `<div style="display:flex;gap:10px;align-items:center"><span style="width:20px;height:20px;border-radius:50%;display:grid;place-items:center;${d ? "background:var(--action);color:var(--action-fg)" : "background:var(--overlay)"}">${d ? ic("Tick02Icon", 12, 2.2) : ""}</span><span style="font-size:16px;${d ? "color:var(--faint);text-decoration:line-through" : ""}">${t}</span></div>`).join("")}</div>`, "height:100%")}</div>
    <div style="grid-column:span 7">${card("Calendar", "Your week, Google events included. Day, week, month and schedule.", cal, "height:100%")}</div>
    <div style="grid-column:span 5">${card("Booking page", "People pick a time in their own time zone.", `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${["10:00 am", "11:30 am", "2:00 pm", "3:30 pm", "4:30 pm", "5:00 pm"].map((t, i) => `<span style="height:40px;border-radius:999px;display:grid;place-items:center;font-size:15px;${i === 2 ? "background:var(--action);color:var(--action-fg)" : "background:var(--overlay)"}">${t}</span>`).join("")}</div>`, "height:100%")}</div>
  </div>
</section>`);

for (const [n, html] of Object.entries({ 1: S1, 2: S2, 3: S3, 4: S4 })) fs.writeFileSync(`${__dirname}/s2-${n}.html`, html);
console.log("built");
