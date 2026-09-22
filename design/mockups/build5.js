// Section 4 options, each a story the page hasn't told yet, each animated.
// 1 Trust (no bot joins). 2 Booking, start to finish. 3 Your room, your light. 4 Without / with.
const fs = require("fs");
const icons = JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8"));
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
.sunk{background:var(--sunken);box-shadow:inset 0 1px 2px oklch(0.06 0.006 50/.45),inset 0 0 0 1px oklch(0.9564 0.0127 63.92/.04);border-radius:16px}
.pane{background:var(--raised);border-radius:24px;box-shadow:var(--raise)}
@keyframes in-seat{0%{opacity:0;transform:translateY(18px) scale(.96);filter:blur(6px)}100%{opacity:1;transform:none;filter:none}}
@keyframes dash{to{stroke-dashoffset:0}}
@keyframes breathe{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes fadeup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
`;
const page = (body, extra = "") => `<!doctype html><html><head><meta charset="utf-8">${base}<style>${css}${extra}</style></head><body>${body}</body></html>`;
const seat = (bg, c, name, delay) =>
  `<div class="tile" style="background-image:url(a/${bg});animation:in-seat .9s cubic-bezier(.16,1,.3,1) ${delay}s both">
    <span style="position:absolute;inset:0;display:grid;place-items:center">${av(c, 64)}</span><span class="name">${name}</span></div>`;

// ── 1 · Nobody else joins the call ──────────────────────────────────────
const T1 = page(`
<section style="padding:150px 56px 150px">
  <div style="position:relative;height:720px;border-radius:36px;overflow:hidden;box-shadow:var(--floatsh)">
    <video src="a/ringed-meadow-loop.mp4" poster="a/ringed-meadow.png" autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 60%"></video>
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,oklch(0.142 0.008 55/.92),oklch(0.142 0.008 55/.55) 48%,oklch(0.142 0.008 55/.15))"></div>
    <div style="position:absolute;left:72px;top:80px;max-width:520px">
      <h2 class="h2" style="font-size:72px">Nobody else<br><span>joins the call.</span></h2>
      <p class="lead" style="margin-top:24px;max-width:440px">No notetaker bot sits in your meeting. Morse listens from inside the call, and everyone can see when it’s recording.</p>
    </div>
    <div style="position:absolute;right:64px;bottom:64px;display:grid;grid-template-columns:repeat(2,250px);grid-template-rows:repeat(2,164px);gap:14px">
      ${seat("ember.webp", "ember", "Priya Shah", 0.3)}${seat("lagoon.webp", "lagoon", "Arjun Mehta", 0.55)}${seat("sage.webp", "sage", "You", 0.8)}
      <div class="tile" style="background:oklch(0.142 0.008 55/.3);animation:in-seat .9s cubic-bezier(.16,1,.3,1) 1.2s both">
        <svg style="position:absolute;inset:0;width:100%;height:100%"><rect x="1.5" y="1.5" rx="21" width="247" height="161" fill="none" stroke="#F7EFE8" stroke-opacity=".35" stroke-width="2" stroke-dasharray="8 8" pathLength="800" style="stroke-dashoffset:800;animation:dash 1.6s ease-out 1.5s forwards"/></svg>
        <span style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:var(--soft);font-size:15px;animation:fadeup .6s 2.6s both">${ic("Robot01Icon", 28, 1.4)}<br>No bot here</span>
      </div>
    </div>
    <span style="position:absolute;right:64px;top:56px;display:flex;align-items:center;gap:10px;padding:8px 16px;border-radius:999px;background:oklch(0.142 0.008 55/.75);font-size:16px"><i class="dot" style="animation:breathe 1.6s infinite"></i><span style="color:var(--signal)">Recording</span><span style="color:var(--soft)">visible to everyone</span></span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:72px;margin:96px 72px 0">
    ${[["Guests knock first", "People without an invite wait until you let them in."], ["Answers go where you choose", "The host picks which colleagues see the teleprompter."], ["Notes leave on purpose", "Morse points out sensitive parts before notes are shared."]].map(([t, b], i) => `<div style="animation:fadeup .8s ${3 + i * 0.2}s both"><p style="font-size:22px">${t}</p><p class="lead" style="font-size:17px;margin-top:6px">${b}</p></div>`).join("")}
  </div>
</section>`);

// ── 2 · Booking, start to finish ──────────────────────────────────────
// One 12 s loop: pick a day, pick a time, fill details, booked, then it lands in the week.
const B2css = `
@keyframes s1{0%,30%{opacity:1}33%,97%{opacity:.35}100%{opacity:1}}
@keyframes s2{0%,30%{opacity:.35}33%,63%{opacity:1}66%,100%{opacity:.35}}
@keyframes s3{0%,63%{opacity:.35}66%,97%{opacity:1}100%{opacity:.35}}
@keyframes view1{0%,55%{opacity:1;transform:none}60%,100%{opacity:0;transform:translateX(-30px)}}
@keyframes view2{0%,58%{opacity:0;transform:translateX(30px)}63%,95%{opacity:1;transform:none}100%{opacity:0}}
@keyframes day{0%,8%{background:oklch(0.28 0.01 52 / .6);color:var(--ink)}11%,100%{background:#a9be8c;color:#1a2112}}
@keyframes times{0%,12%{opacity:0;transform:translateY(8px)}16%,100%{opacity:1;transform:none}}
@keyframes slot{0%,22%{background:var(--overlay);color:var(--ink)}25%,100%{background:#a9be8c;color:#1a2112}}
@keyframes form{0%,28%{opacity:0}32%,100%{opacity:1}}
@keyframes type{0%,32%{width:0}42%,100%{width:9.5ch}}
@keyframes booked{0%,46%{opacity:0;transform:translateY(8px)}50%,100%{opacity:1;transform:none}}
@keyframes drop{0%,66%{opacity:0;transform:translateY(-18px) scale(.96)}71%,100%{opacity:1;transform:none}}
.loop{animation-duration:12s;animation-iteration-count:infinite;animation-fill-mode:both}
`;
const B2 = page(`
<section style="padding:150px 110px 150px;display:grid;grid-template-columns:420px 1fr;gap:100px;align-items:center">
  <div>
    <h2 class="h2">A page to<br>book you.<br><span>No extra tool.</span></h2>
    <ol style="list-style:none;padding:0;margin-top:56px;display:flex;flex-direction:column;gap:30px">
      ${[["s1", "Share your link", "Pick the lengths you offer and your usual hours."], ["s2", "They pick a time", "In their own time zone, from what your calendar has free."], ["s3", "It lands on your week", "With a Morse link, synced with Google."]].map(([k, t, b], i) => `<li class="loop" style="animation-name:${k};display:grid;grid-template-columns:36px 1fr;gap:8px"><span class="mono" style="font-size:13px;color:var(--faint);padding-top:6px">0${i + 1}</span><div><p style="font-size:22px">${t}</p><p style="font-size:16px;color:var(--soft);margin-top:4px">${b}</p></div></li>`).join("")}
    </ol>
  </div>
  <div style="position:relative;height:640px;border-radius:32px;background:var(--canvas);box-shadow:var(--floatsh);overflow:hidden">
    <div class="loop" style="animation-name:view1;position:absolute;inset:0;padding:40px">
      <div style="display:flex;align-items:center;gap:16px">${av("ember", 56)}<div><p style="font-size:24px;font-weight:300">Book a meeting with Priya Shah</p><p style="font-size:16px;color:var(--soft)">Product lead</p></div></div>
      <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:16px;margin-top:28px">
        <div class="pane" style="padding:24px"><p style="font-size:18px">Intro call</p><p style="font-size:15px;color:var(--soft)">30 min · Morse meeting</p>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:20px;text-align:center;font-size:14px">
            ${["M", "T", "W", "T", "F", "S", "S"].map((d) => `<span style="color:var(--faint)">${d}</span>`).join("")}<span></span>
            ${Array.from({ length: 30 }, (_, i) => { const n = i + 1, wd = n % 7, open = n > 22 && wd !== 5 && wd !== 6; return `<span class="${n === 24 ? "loop" : ""}" style="margin:auto;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;${n === 24 ? "animation-name:day;" : open ? "background:oklch(0.28 0.01 52/.6)" : "color:oklch(0.66 0.033 55/.5)"}">${n}</span>`; }).join("")}
          </div></div>
        <div class="pane loop" style="padding:24px;animation-name:times"><p style="font-size:17px">Thursday 24 September</p><p style="font-size:14px;color:var(--faint)">Times in your time zone</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px">
            ${["9:00", "10:30", "11:30", "2:00", "3:30", "4:30"].map((t) => `<span class="${t === "2:00" ? "loop" : ""}" style="height:44px;border-radius:999px;display:grid;place-items:center;font-size:16px;${t === "2:00" ? "animation-name:slot" : "background:var(--overlay)"}">${t}</span>`).join("")}
          </div>
          <div class="loop" style="animation-name:form;margin-top:18px"><p style="font-size:14px;color:var(--soft)">Your name</p><div class="sunk" style="margin-top:6px;height:44px;border-radius:999px;display:flex;align-items:center;padding:0 16px;font-size:16px"><span class="loop" style="animation-name:type;overflow:hidden;white-space:nowrap;display:inline-block;animation-timing-function:steps(10)">Sam, Acme</span></div></div>
          <p class="loop" style="animation-name:booked;margin-top:16px;display:flex;align-items:center;gap:8px;font-size:16px"><span style="width:24px;height:24px;border-radius:50%;background:var(--action);color:var(--action-fg);display:grid;place-items:center">${ic("Tick02Icon", 14, 2.2)}</span>Booked. The link is in your email.</p>
        </div>
      </div>
    </div>
    <div class="loop" style="animation-name:view2;position:absolute;inset:0;padding:40px">
      <p style="font-size:24px;font-weight:300">Priya’s week</p>
      <div class="pane" style="margin-top:22px;padding:22px;height:500px;position:relative">
        <div style="display:grid;grid-template-columns:44px repeat(5,1fr);gap:8px;font-size:14px;color:var(--faint)"><span></span>${["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25"].map((d) => `<span style="text-align:center">${d}</span>`).join("")}</div>
        ${["10", "11", "12", "1", "2", "3", "4"].map((h, r) => `<div style="position:absolute;left:22px;right:22px;top:${60 + r * 60}px;border-top:1px solid var(--hair);font-size:13px;color:var(--faint);padding-top:4px">${h}</div>`).join("")}
        ${[[0, 0, "Standup", "#a9be8c"], [1, 1, "Design review", "#a9be8c"], [2, 3, "Acme renewal", "#94b6d2"], [4, 2, "1:1 with Arjun", "#a9be8c"]].map(([d, h, t, c]) => `<span style="position:absolute;left:calc(66px + (100% - 88px - 44px) / 5 * ${d} + ${d * 8}px);width:calc((100% - 88px - 44px - 32px) / 5);top:${64 + h * 60}px;height:52px;border-radius:10px;border-left:3px solid ${c};background:color-mix(in oklch,${c} 20%,transparent);font-size:13px;padding:6px 8px">${t}</span>`).join("")}
        <span class="loop" style="animation-name:drop;position:absolute;left:calc(66px + (100% - 88px - 44px) / 5 * 3 + 24px);width:calc((100% - 88px - 44px - 32px) / 5);top:${64 + 4 * 60}px;height:52px;border-radius:10px;border-left:3px solid #e8927c;background:color-mix(in oklch,#e8927c 24%,transparent);box-shadow:0 8px 26px oklch(0.78 0.125 36/.3);font-size:13px;padding:6px 8px">Intro call · Sam</span>
      </div>
    </div>
  </div>
</section>`, B2css);

// ── 3 · Your room, your light ─────────────────────────────────────────
const bgs = ["sunlit-room", "lake-sunrise", "reading-nook", "soft-sky", "snowy-cabin", "desert-terrace"];
const styles = [["Warm", "sepia(.25) saturate(1.1)"], ["Film", "contrast(1.1) saturate(.8) sepia(.15)"], ["Cool", "hue-rotate(-12deg) saturate(.9) brightness(1.02)"], ["Mono", "grayscale(1) contrast(1.05)"], ["Vivid", "saturate(1.45)"], ["Brighten", "brightness(1.12)"]];
const accents = ["#a9be8c", "#6ec3b4", "#94b6d2", "#b3b4d6", "#cc98be", "#a9be8c"];
const R3css = `
@keyframes bgcycle{0%{opacity:0}3%,16%{opacity:1}19%,100%{opacity:0}}
.bgl{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;animation:bgcycle 18s infinite}
@keyframes lab{0%{opacity:0;transform:translateY(6px)}3%,16%{opacity:1;transform:none}19%,100%{opacity:0}}
.lab{grid-area:1/1;opacity:0;animation:lab 18s infinite}
@keyframes acc{${accents.map((c, i) => `${((i / 6) * 100).toFixed(1)}%{background:${c}}`).join("")}100%{background:${accents[0]}}}
@keyframes ring{0%{transform:translateX(0)}${[0, 1, 2, 3, 4].map((i) => `${(((i + 1) / 6) * 100 - 2).toFixed(1)}%{transform:translateX(${i * 44}px)}${(((i + 1) / 6) * 100).toFixed(1)}%{transform:translateX(${(i + 1) * 44}px)}`).join("")}100%{transform:translateX(${5 * 44}px)}}
`;
const R3 = page(`
<section style="padding:150px 110px 150px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2">Your room.<br><span>Your light.</span></h2>
    <p class="lead" style="max-width:440px">Pick where you appear to be, how your camera looks and the colour of your Morse. Everyone in the call sees the room you chose.</p>
  </div>
  <div style="position:relative;height:640px;border-radius:36px;overflow:hidden;margin-top:72px;box-shadow:var(--floatsh)">
    ${bgs.map((b, i) => `<div class="bgl" style="background-image:url(a/${b}.webp);animation-delay:${i * 3}s;filter:${styles[i][1]}"></div>`).join("")}
    <div style="position:absolute;inset:0;background:radial-gradient(70% 70% at 50% 45%,transparent,oklch(0.142 0.008 55/.45))"></div>
    <span style="position:absolute;left:50%;top:46%;transform:translate(-50%,-50%)">${av("sage", 160)}</span>
    <span class="name" style="left:24px;bottom:24px;font-size:17px;padding:8px 18px">${ic("Mic01Icon", 16)} You</span>
    <div style="position:absolute;right:24px;top:24px;display:grid;padding:8px 18px;border-radius:999px;background:oklch(0.142 0.008 55/.75);font-size:16px">
      ${styles.map(([s], i) => `<span class="lab" style="animation-delay:${i * 3}s">Style · ${s}</span>`).join("")}
    </div>
    <div style="position:absolute;left:50%;bottom:28px;transform:translateX(-50%);display:flex;align-items:center;gap:18px;padding:10px 12px 10px 20px;border-radius:999px;background:oklch(0.142 0.008 55/.8)">
      <div style="position:relative;display:flex;gap:14px">
        <span style="position:absolute;left:-4px;top:-4px;width:38px;height:38px;border-radius:50%;box-shadow:0 0 0 2px #F7EFE8;animation:ring 18s steps(1) infinite"></span>
        ${["#a9be8c", "#6ec3b4", "#94b6d2", "#b3b4d6", "#cc98be"].map((c) => `<span style="width:30px;height:30px;border-radius:50%;background:${c}"></span>`).join("")}
      </div>
      <span style="display:flex;align-items:center;gap:8px;height:44px;padding:0 20px;border-radius:999px;font-size:16px;font-weight:500;color:#1a1510;animation:acc 18s steps(1) infinite">+ New meeting</span>
    </div>
  </div>
  <div style="display:flex;justify-content:center;gap:40px;margin-top:40px;color:var(--soft);font-size:17px">
    <span>16 backgrounds in four sets</span><span>7 camera styles</span><span>5 accents</span><span>Light or dark</span>
  </div>
</section>`, R3css);

// ── 4 · Without and with: a handle sweeps across ──────────────────────
const W4css = `
@keyframes sweep{0%,8%{left:86%}40%,58%{left:14%}90%,100%{left:86%}}
@keyframes clip{0%,8%{clip-path:inset(0 0 0 86%)}40%,58%{clip-path:inset(0 0 0 14%)}90%,100%{clip-path:inset(0 0 0 86%)}}
@keyframes botfade{0%,30%{opacity:1}40%,100%{opacity:1}}
`;
const tile = (bg, c, name, big = 64, extra = "") => `<div class="tile" style="background-image:url(a/${bg});${extra}"><span style="position:absolute;inset:0;display:grid;place-items:center">${av(c, big)}</span><span class="name">${name}</span></div>`;
const W4 = page(`
<section style="padding:150px 110px 150px">
  <div style="text-align:center"><h2 class="h2">Five apps for one meeting.<br><span>Or one.</span></h2></div>
  <div style="position:relative;height:620px;margin-top:72px;border-radius:36px;overflow:hidden;box-shadow:var(--floatsh)">
    <div style="position:absolute;inset:0;background:oklch(0.2 0.004 60);filter:saturate(.15)">
      <div style="position:absolute;inset:36px 36px 120px 36px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        ${tile("ember.webp", "ember", "Priya Shah")}${tile("lagoon.webp", "lagoon", "Arjun Mehta")}${tile("sage.webp", "sage", "You")}
        <div class="tile" style="background:oklch(0.26 0.004 60)"><span style="position:absolute;inset:0;display:grid;place-items:center;color:var(--soft)">${ic("Robot01Icon", 56, 1.4)}</span><span class="name">Notetaker (bot)</span></div>
      </div>
      <div style="position:absolute;left:36px;right:36px;bottom:36px;display:flex;gap:12px;justify-content:center">
        ${[["Video01Icon", "Call app"], ["Robot01Icon", "Notetaker bot"], ["Link01Icon", "Booking link"], ["Note01Icon", "Minutes doc"], ["Calendar03Icon", "Calendar"]].map(([i, l]) => `<span style="display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 18px 0 10px;border-radius:999px;background:oklch(0.26 0.004 60);font-size:16px;color:var(--soft)"><span style="width:28px;height:28px;border-radius:50%;background:oklch(0.32 0.004 60);display:grid;place-items:center">${ic(i, 16)}</span>${l}</span>`).join("")}
      </div>
    </div>
    <div style="position:absolute;inset:0;background:var(--canvas);animation:clip 9s cubic-bezier(.65,0,.35,1) infinite">
      <div style="position:absolute;inset:36px 36px 120px 36px;display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px">
        ${tile("ember.webp", "ember", `${ic("Mic01Icon", 14)} Priya Shah`, 96, "box-shadow:0 0 0 2px var(--signal)")}${tile("lagoon.webp", "lagoon", "Arjun Mehta")}${tile("sage.webp", "sage", "You")}
      </div>
      <div style="position:absolute;left:36px;right:36px;bottom:36px;display:flex;gap:12px;justify-content:center;align-items:center">
        <span style="display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 20px 0 12px;border-radius:999px;background:var(--raised);font-size:16px"><img src="mark.svg" style="width:22px">Morse: call, notes, teleprompter, booking, calendar</span>
      </div>
    </div>
    <div style="position:absolute;top:0;bottom:0;width:2px;background:#F7EFE8;animation:sweep 9s cubic-bezier(.65,0,.35,1) infinite;transform:translateX(-1px)">
      <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;background:#F7EFE8;color:#0c0907;display:grid;place-items:center;box-shadow:0 8px 30px #000a">${ic("ArrowLeftRightIcon", 22, 2)}</span>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:48px;margin-top:72px">
    ${[["No bot in the call", "The notes come from Morse itself."], ["No copy and paste", "Action items land where the meeting does."], ["No separate link", "Your booking page is part of your calendar."], ["No other tab", "Ask, and the answer appears in the call."]].map(([t, b]) => `<div><p style="font-size:20px">${t}</p><p style="font-size:16px;color:var(--soft);margin-top:4px">${b}</p></div>`).join("")}
  </div>
</section>`, W4css);

for (const [n, html] of Object.entries({ 1: T1, 2: B2, 3: R3, 4: W4 })) fs.writeFileSync(`${__dirname}/s4-${n}.html`, html);
console.log("built");
