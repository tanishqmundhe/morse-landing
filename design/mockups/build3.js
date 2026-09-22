// Section 3 options. Each answers the question section 2 leaves open:
// A why switch, B can I trust it, C will it feel like mine, D is everything else there.
const fs = require("fs");
const icons = JSON.parse(fs.readFileSync(__dirname + "/icons3.json", "utf8"));
const ic = (n, s = 20, sw = 1.8) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" style="flex:none">${icons[n].replace(/stroke-width="[^"]*"/g, `stroke-width="${sw}"`)}</svg>`;
const base = fs.readFileSync(__dirname + "/hero-A.html", "utf8").match(/<link[\s\S]*?<\/style>/)[0].replace("overflow:hidden", "");
const page = (body, css = "") =>
  `<!doctype html><html><head><meta charset="utf-8">${base}<style>
  .h2{font-weight:300;font-size:56px;line-height:1.06;letter-spacing:-.03em}
  .h2 span{color:var(--soft)}
  .lead{font-size:20px;color:var(--soft);line-height:1.55}
  .pane{background:var(--raised);border-radius:24px;box-shadow:var(--raise)}
  .sunk{background:var(--sunken);box-shadow:inset 0 1px 2px oklch(0.06 0.006 50/.45),inset 0 0 0 1px oklch(0.9564 0.0127 63.92/.04);border-radius:16px}
  .ava{display:inline-block;flex:none;border-radius:50%;background-size:cover;background-position:center}
  .tile{position:relative;border-radius:20px;overflow:hidden;background-size:cover;background-position:center}
  .name{position:absolute;left:12px;bottom:12px;padding:4px 12px;border-radius:999px;background:oklch(0.142 0.008 55/.72);font-size:14px;display:flex;gap:6px;align-items:center}
  .chip{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px 0 8px;border-radius:999px;background:var(--raised);box-shadow:var(--raise);font-size:16px;color:var(--soft)}
  .ico{width:28px;height:28px;border-radius:50%;background:var(--overlay);display:grid;place-items:center;color:var(--ink)}
  ${css}</style></head><body>${body}</body></html>`;
const av = (c, s) => `<span class="ava" style="width:${s}px;height:${s}px;background-image:url(a/neuralarc-avatar-${c}-512.webp)"></span>`;
const tile = (bg, c, name, extra = "", big = 64) =>
  `<div class="tile" style="background-image:url(a/${bg});${extra}"><span style="position:absolute;inset:0;display:grid;place-items:center">${av(c, big)}</span><span class="name">${name}</span></div>`;

// ── A · Before and after, with a handle you drag ─────────────────────────
const A = page(`
<section style="padding:120px 110px 110px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2">Right now, a meeting<br><span>takes five apps.</span></h2>
    <p class="lead" style="max-width:420px">A call app, a bot to take notes, a link to book, a doc for the minutes, a calendar to keep it all. Drag the line to see the same meeting in Morse.</p>
  </div>
  <div style="position:relative;margin-top:56px;height:600px;border-radius:30px;overflow:hidden;box-shadow:var(--floatsh)">
    <!-- Before: the usual stack -->
    <div style="position:absolute;inset:0;background:oklch(0.2 0.004 60);padding:28px;filter:saturate(.2)">
      <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:10px;height:400px;width:680px">
        ${tile("ember.webp", "ember", "Priya Shah")}${tile("lagoon.webp", "lagoon", "Arjun Mehta")}${tile("sage.webp", "sage", "You")}
        <div class="tile" style="background:oklch(0.26 0.004 60)"><span style="position:absolute;inset:0;display:grid;place-items:center;color:var(--soft)">${ic("Robot01Icon", 56, 1.4)}</span><span class="name">Notetaker (bot)</span></div>
      </div>
      <div style="position:absolute;left:28px;bottom:28px;display:flex;gap:10px;flex-wrap:wrap;width:660px">
        ${[["Video01Icon", "Call app"], ["Robot01Icon", "Notetaker bot"], ["Link01Icon", "Booking link"], ["Note01Icon", "Minutes doc"], ["Calendar03Icon", "Calendar"]].map(([i, l]) => `<span class="chip" style="background:oklch(0.25 0.004 60)"><span class="ico">${ic(i, 16)}</span>${l}</span>`).join(`<span style="align-self:center;color:var(--faint)">${ic("ArrowLeftRightIcon", 16)}</span>`)}
      </div>
    </div>
    <!-- After: Morse, clipped to the right of the handle -->
    <div style="position:absolute;inset:0;clip-path:inset(0 0 0 52%);background:var(--canvas);padding:28px">
      <div style="position:absolute;right:28px;top:28px;bottom:28px;width:580px;display:flex;gap:10px">
        <div style="flex:1;display:grid;grid-template-rows:1.6fr 1fr;gap:10px">
          ${tile("ember.webp", "ember", `${ic("Mic01Icon", 14)} Priya Shah`, "box-shadow:0 0 0 2px var(--signal)", 96)}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${tile("lagoon.webp", "lagoon", "Arjun Mehta")}${tile("sage.webp", "sage", "You")}</div>
        </div>
        <div class="pane" style="width:210px;padding:16px">
          <p style="font-size:15px">Teleprompter</p>
          <div class="sunk" style="margin-top:12px;padding:12px"><p style="font-size:13px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Priya</b> asked about Acme</p><p style="margin-top:6px;font-size:15px;line-height:1.4">This year’s rate, fixed until March.</p></div>
          <p style="margin-top:16px;font-size:13px;color:var(--faint)">Notes, booking and your calendar are in the same app.</p>
        </div>
      </div>
    </div>
    <!-- The handle -->
    <div style="position:absolute;top:0;bottom:0;left:52%;width:2px;background:var(--ink);opacity:.8"></div>
    <div style="position:absolute;top:50%;left:52%;transform:translate(-50%,-50%);width:52px;height:52px;border-radius:50%;background:var(--ink);color:var(--canvas);display:grid;place-items:center;box-shadow:0 8px 30px #000a">${ic("ArrowLeftRightIcon", 22, 2)}</div>
    <span class="chip" style="position:absolute;left:28px;top:28px;background:oklch(0.25 0.004 60)">Without Morse</span>
    <span style="position:absolute;left:calc(52% + 28px);top:28px" class="chip"><img src="mark.svg" style="width:18px;margin-left:6px"> With Morse</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:48px">
    ${[["No bot in the call", "The notes come from Morse itself, not a guest."], ["No copy and paste", "Action items land where the meeting does."], ["No separate link", "Your booking page is part of your calendar."], ["No other tab", "Ask a question, get the answer, in the call."]].map(([t, b]) => `<div><p style="font-size:19px">${t}</p><p style="font-size:16px;color:var(--soft);margin-top:4px">${b}</p></div>`).join("")}
  </div>
</section>`);

// ── B · Nobody else in the room ───────────────────────────────────────────
const B = page(`
<section style="padding:110px 60px 110px">
  <div style="position:relative;height:640px;border-radius:32px;overflow:hidden;box-shadow:var(--floatsh)">
    <div class="film" style="position:absolute;inset:0;background-image:url(ringed-meadow.png);background-size:cover;background-position:center 60%"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,oklch(0.142 0.008 55/.92),oklch(0.142 0.008 55/.5) 50%,oklch(0.142 0.008 55/.2))"></div>
    <div style="position:absolute;left:64px;top:64px;max-width:520px">
      <h2 class="h2" style="font-size:64px">Nobody else<br><span>joins the call.</span></h2>
      <p class="lead" style="margin-top:20px">No notetaker bot sits in your meeting. Morse listens from inside the call, and everyone can see when it’s recording.</p>
    </div>
    <div style="position:absolute;right:56px;bottom:56px;display:grid;grid-template-columns:repeat(2,230px);grid-template-rows:repeat(2,150px);gap:12px">
      ${tile("ember.webp", "ember", "Priya Shah", "", 54)}${tile("lagoon.webp", "lagoon", "Arjun Mehta", "", 54)}${tile("sage.webp", "sage", "You", "", 54)}
      <div class="tile" style="border:2px dashed oklch(0.9564 0.0127 63.92/.25);background:oklch(0.142 0.008 55/.35)"><span style="position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:var(--soft);font-size:15px">${ic("Robot01Icon", 28, 1.4)}<br>No bot here</span></div>
    </div>
    <span style="position:absolute;right:56px;top:48px" class="chip"><i class="dot"></i><span style="color:var(--signal)">Recording</span> · visible to everyone</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px">
    <div class="pane" style="padding:26px">
      <div class="sunk" style="padding:14px 16px;display:flex;align-items:center;gap:12px">${av("citrus", 34)}<div style="flex:1"><p style="font-size:15px">Sam from Acme</p><p style="font-size:13px;color:var(--faint)">is asking to join</p></div><span class="btn pri" style="height:34px;font-size:14px;padding:0 14px">Let in</span></div>
      <p style="font-size:20px;margin-top:22px">Guests knock first</p><p style="font-size:16px;color:var(--soft);margin-top:4px">People without an invite wait until you let them in.</p>
    </div>
    <div class="pane" style="padding:26px">
      <div class="sunk" style="padding:14px 16px"><p style="font-size:14px;color:var(--soft)">Answers questions for:</p><div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap"><span style="padding:6px 14px;border-radius:999px;background:var(--action);color:var(--action-fg);font-size:14px">Priya</span><span style="padding:6px 14px;border-radius:999px;background:var(--action);color:var(--action-fg);font-size:14px">You</span><span style="padding:6px 14px;border-radius:999px;background:var(--overlay);font-size:14px;color:var(--soft)">Sam (guest)</span></div></div>
      <p style="font-size:20px;margin-top:22px">Answers go to who you choose</p><p style="font-size:16px;color:var(--soft);margin-top:4px">The host picks which colleagues see the teleprompter.</p>
    </div>
    <div class="pane" style="padding:26px">
      <div class="sunk" style="padding:14px 16px"><p style="font-size:14px;color:var(--soft)">Share notes with</p><p style="font-size:15px;margin-top:8px">priya@acme.com, arjun@neuralarc.ai</p><p style="font-size:13px;color:var(--signal);margin-top:8px">One part mentions salary. Check before sending.</p></div>
      <p style="font-size:20px;margin-top:22px">Notes are shared on purpose</p><p style="font-size:16px;color:var(--soft);margin-top:4px">Morse points out sensitive parts before notes leave your team.</p>
    </div>
  </div>
</section>`);

// ── C · Make it yours: the room you choose ─────────────────────────────
const cats = [
  ["Cozy home", ["sunlit-room", "reading-nook", "rainy-loft", "snowy-cabin", "japandi-room", "courtyard"]],
  ["Nature", ["lake-sunrise", "desert-terrace", "tropical-cove"]],
];
const C = page(`
<section style="padding:110px 100px 110px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2">Your room.<br><span>Your light.</span></h2>
    <p class="lead" style="max-width:440px">Pick where you appear to be, how your camera looks and the colour of your Morse. Everyone in the call sees the room you chose.</p>
  </div>
  <div style="display:grid;grid-template-columns:1.45fr 1fr;gap:16px;margin-top:52px">
    <div style="position:relative;height:620px;border-radius:30px;overflow:hidden;box-shadow:var(--floatsh);background:url(a/sunlit-room.webp) center/cover;filter:sepia(.18) saturate(1.05) brightness(1.02)">
      <div style="position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 45%,transparent,oklch(0.142 0.008 55/.35))"></div>
      <span style="position:absolute;left:50%;top:48%;transform:translate(-50%,-50%)">${av("sage", 150)}</span>
      <span class="name" style="left:20px;bottom:20px;font-size:16px;padding:6px 16px">${ic("Mic01Icon", 16)} You</span>
      <span class="chip" style="position:absolute;right:20px;top:20px;background:oklch(0.142 0.008 55/.72);box-shadow:none;color:var(--ink)">Style: Warm</span>
    </div>
    <div class="pane" style="padding:26px;height:620px">
      <div style="display:flex;gap:6px;padding:5px;border-radius:999px;background:var(--sunken);width:max-content">
        ${["Cozy home", "Nature", "Stylized", "Fun"].map((c, i) => `<span style="padding:8px 16px;border-radius:999px;font-size:15px;${i === 0 ? "background:var(--overlay);color:var(--ink)" : "color:var(--soft)"}">${c}</span>`).join("")}
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px">
        ${cats[0][1].map((b, i) => `<div style="aspect-ratio:16/10;border-radius:14px;background:url(a/${b}.webp) center/cover;${i === 0 ? "box-shadow:0 0 0 2px var(--canvas),0 0 0 4px var(--action)" : ""}"></div>`).join("")}
      </div>
      <p class="tag" style="color:var(--faint);margin-top:26px">Camera style</p>
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        ${["Brighten", "Warm", "Cool", "Film", "Mono", "Vivid", "Light leak"].map((s) => `<span style="padding:8px 14px;border-radius:999px;font-size:15px;${s === "Warm" ? "background:var(--action);color:var(--action-fg)" : "background:var(--overlay);color:var(--ink)"}">${s}</span>`).join("")}
      </div>
      <p class="tag" style="color:var(--faint);margin-top:26px">Accent</p>
      <div style="display:flex;gap:10px;margin-top:12px;align-items:center">
        ${["#a9be8c", "#6ec3b4", "#94b6d2", "#b3b4d6", "#cc98be"].map((c, i) => `<span style="width:30px;height:30px;border-radius:50%;background:${c};${i === 0 ? "box-shadow:0 0 0 2px var(--raised),0 0 0 4px var(--ink)" : ""}"></span>`).join("")}
        <span style="margin-left:auto;font-size:15px;color:var(--soft)">Sage</span>
      </div>
      <div style="display:flex;gap:8px;margin-top:26px">${[["Moon02Icon", "Dark"], ["Sun03Icon", "Light"], ["ViewIcon", "System"]].map(([i, l], k) => `<span style="flex:1;display:flex;gap:8px;align-items:center;justify-content:center;height:44px;border-radius:999px;font-size:15px;${k === 0 ? "background:var(--overlay);color:var(--ink)" : "color:var(--soft);background:var(--sunken)"}">${ic(i, 17)} ${l}</span>`).join("")}</div>
    </div>
  </div>
</section>`);

// ── D · Everything else, done properly ─────────────────────────────────
const emoji = ["red-heart", "thumbs-up", "party-popper", "fire", "clapping-hands", "face-with-tears-of-joy"];
const D = page(`
<section style="padding:110px 90px 110px">
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:60px">
    <h2 class="h2">Everything else<br><span>you’d expect, done properly.</span></h2>
    <p class="lead" style="max-width:400px">The small things that make a call feel easy, each one as considered as the big ones.</p>
  </div>
  <div style="display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:260px;gap:14px;margin-top:52px">
    <div class="pane" style="grid-column:span 5;grid-row:span 2;padding:26px;display:flex;flex-direction:column">
      <div style="flex:1;position:relative;border-radius:18px;overflow:hidden;background:url(a/ember.webp) center/cover">
        <span style="position:absolute;inset:0;display:grid;place-items:center">${av("ember", 90)}</span>
        <div style="position:absolute;left:14px;right:14px;bottom:14px;padding:12px 16px;border-radius:14px;background:oklch(0.142 0.008 55/.8);font-size:17px;line-height:1.4"><b style="font-weight:500;color:var(--soft)">Priya</b> Onboarding pe dhyaan dena padega, people sign up and never come back.</div>
      </div>
      <p style="font-size:21px;margin-top:22px">Live captions, in the languages you mix</p>
      <p style="font-size:16px;color:var(--soft);margin-top:4px">Ten languages without a setting, switching mid-sentence. Tamil, Marathi, Bengali and more when you ask.</p>
    </div>
    <div class="pane" style="grid-column:span 4;padding:24px;display:flex;flex-direction:column">
      <div style="flex:1;display:flex;align-items:center;gap:10px">${emoji.map((e, i) => `<img src="a/${e}.svg" style="width:46px;height:46px;transform:translateY(${[-8, 6, -14, 2, -4, 10][i]}px)">`).join("")}</div>
      <p style="font-size:19px">Reactions and raised hands</p><p style="font-size:15px;color:var(--soft)">Pixel emoji that float up the stage.</p>
    </div>
    <div class="pane" style="grid-column:span 3;padding:24px;display:flex;flex-direction:column">
      <div class="sunk" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:14px">
        ${["English", "हिन्दी", "Español", "Français", "मराठी"].map((l, i) => `<span style="font-size:15px;${i < 2 ? "color:var(--ink)" : "color:var(--soft)"}">${l}</span>`).join("")}
      </div>
      <p style="font-size:19px;margin-top:16px">18 languages</p>
    </div>
    <div class="pane" style="grid-column:span 4;padding:24px;display:flex;flex-direction:column">
      <div class="sunk" style="flex:1;position:relative;overflow:hidden">
        <svg viewBox="0 0 300 120" style="position:absolute;inset:0;width:100%;height:100%"><path d="M30 90 C 70 20, 120 20, 150 60 S 230 100, 270 30" stroke="#a9be8c" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="40" y="30" width="70" height="40" rx="10" stroke="#F7EFE8" stroke-opacity=".5" stroke-width="2" fill="none"/><circle cx="235" cy="80" r="18" stroke="#94b6d2" stroke-width="3" fill="none"/></svg>
      </div>
      <p style="font-size:19px;margin-top:16px">A whiteboard in the call</p>
    </div>
    <div class="pane" style="grid-column:span 3;padding:24px;display:flex;flex-direction:column">
      <div class="sunk" style="flex:1;display:flex;align-items:center;gap:10px;padding:12px">${av("citrus", 32)}<div style="flex:1"><p style="font-size:14px">Sam</p><p style="font-size:12px;color:var(--faint)">asking to join</p></div><span class="btn pri" style="height:30px;font-size:13px;padding:0 12px">Let in</span></div>
      <p style="font-size:19px;margin-top:16px">A waiting room</p>
    </div>
    <div class="pane" style="grid-column:span 4;padding:24px;display:flex;flex-direction:column">
      <div class="sunk" style="flex:1;padding:16px;font-family:'Geist Mono',monospace;font-size:14px;line-height:1.7;color:var(--soft)"><span style="color:var(--action)">POST</span> /api/meetings<br>{ "title": "Acme renewal",<br>&nbsp;&nbsp;"invite": ["sam@acme.com"] }</div>
      <p style="font-size:19px;margin-top:16px">An API for your own tools</p>
    </div>
    <div class="pane" style="grid-column:span 4;padding:24px;display:flex;flex-direction:column">
      <div class="sunk" style="flex:1;position:relative;overflow:hidden;background:url(a/lake-sunrise.webp) center/cover">
        <svg viewBox="0 0 300 120" style="position:absolute;inset:0;width:100%;height:100%"><path d="M60 80 L 200 40" stroke="#e8927c" stroke-width="5" stroke-linecap="round"/><path d="M185 30 L 205 40 L 190 55" stroke="#e8927c" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <p style="font-size:19px;margin-top:16px">Draw on shared screens</p>
    </div>
    <div class="pane" style="grid-column:span 4;padding:24px;display:flex;flex-direction:column">
      <div class="sunk" style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:10px;padding:16px">
        <p style="font-size:14px;color:var(--soft)"><b style="color:var(--ink);font-weight:500">Arjun</b> Slides are in the vault link</p>
        <p style="font-size:14px;color:var(--soft);text-align:right"><b style="color:var(--ink);font-weight:500">You</b> Got it ${`<img src="a/thumbs-up.svg" style="width:16px;vertical-align:-3px">`}</p>
      </div>
      <p style="font-size:19px;margin-top:16px">Chat, with pixel emoji</p>
    </div>
  </div>
</section>`);

for (const [n, html] of Object.entries({ A, B, C, D })) fs.writeFileSync(`${__dirname}/s3-${n}.html`, html);
console.log("built");
