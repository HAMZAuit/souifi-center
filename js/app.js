(function(){
"use strict";
"use strict";
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const icons = () => { if (window.lucide) lucide.createIcons(); };
/* ================= TOASTS ================= */
function toast(title, msg, warn){
  const el = document.createElement("div");
  el.className = "toast" + (warn ? " amber" : "");
  el.innerHTML = `<span class="t-ico"><i data-lucide="${warn ? "clock" : "check"}"></i></span><div><strong>${title}</strong><p>${msg}</p></div>`;
  document.getElementById("toasts").appendChild(el);
  icons();
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 420); }, 4600);
}

/* ================= MARQUEE ================= */
const mqTrack = document.getElementById("mqTrack");
function renderMarquee(){
  const items = [...PROGRAMS.map(p => p[LANG].title), t("mq.hours"), ["fr", T.en["mq.fr"]], ["ar", T.ar["mq.ar"]]];
  const group = `<div class="mq-group">${items.map(it =>
    Array.isArray(it)
      ? `<span class="mq-${it[0]}">${it[1]}</span>`
      : `<span>${it}</span>`
  ).join(`<svg class="s8"><use href="#star8"/></svg>`)}<svg class="s8"><use href="#star8"/></svg></div>`;
  mqTrack.innerHTML = group + group;
}

/* ================= PROGRAMS INDEX ================= */
const list = document.getElementById("progList");
const fact = (k,v) => `<div class="fact"><dt>${k}</dt><dd>${v}</dd></div>`;
function renderPrograms(){
  list.innerHTML = PROGRAMS.map((p,i)=>`
  <article class="prog reveal" id="prog-${i}" style="--d:${(i*0.05).toFixed(2)}s">
    <div class="prog-head" role="button" tabindex="0" aria-expanded="false" aria-controls="pp-${i}">
      <span class="p-num">${String(i+1).padStart(2,"0")}</span>
      <span class="p-title">${p[LANG].title}</span>
      <span class="p-meta">${p[LANG].meta}</span>
      <span class="p-icon"><i data-lucide="plus"></i></span>
    </div>
    <div class="prog-panel" id="pp-${i}">
      <div class="prog-inner"><div class="prog-body">
        <p class="p-tag">${p[LANG].tag}</p>
        <p class="p-desc">${p[LANG].desc}</p>
        <div class="p-facts">${fact(t("prog.fDays"),p[LANG].days)+fact(t("prog.fLevel"),p[LANG].level)+fact(t("prog.fLength"),p[LANG].length)+fact(t("prog.fFee"),p[LANG].fee)}</div>
        <div class="p-cta">
          <span class="p-teacher"><svg class="s8"><use href="#star8"/></svg>${t("prog.with")} ${p[LANG].teacher}</span>
          <button type="button" class="btn ghost sm apply" data-i="${i}">${t("prog.apply")} <i data-lucide="arrow-right"></i></button>
        </div>
        <div class="p-photo"><img src="${pic(p.seed)}" alt="" loading="lazy"></div>
      </div></div>
    </div>
  </article>`).join("");
  icons();
}
function toggleProg(head){
  const art = head.parentElement;
  head.setAttribute("aria-expanded", art.classList.toggle("open"));
}
function openProgram(i){
  const art = document.getElementById("prog-"+i);
  art.classList.add("open","flash");
  art.querySelector(".prog-head").setAttribute("aria-expanded","true");
  art.scrollIntoView({behavior: RM ? "auto" : "smooth", block:"center"});
  setTimeout(() => art.classList.remove("flash"), 1400);
}
list.addEventListener("click", e => {
  const head = e.target.closest(".prog-head");
  if (head) { toggleProg(head); return; }
  const ap = e.target.closest(".apply");
  if (ap) {
    const i = +ap.dataset.i;
    document.getElementById("fCourse").value = PROGRAMS[i].code;
    scrollToSection("register");
    toast(`${PROGRAMS[i].code} — ${t("toast.sel")}`, t("toast.selMsg"));
    setTimeout(() => document.getElementById("fName").focus({preventScroll:true}), 750);
  }
});
list.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("prog-head")) {
    e.preventDefault(); toggleProg(e.target);
  }
});

/* cursor-following preview */
if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
  const pv = document.getElementById("preview"),
        img = document.getElementById("ppImg"),
        code = document.getElementById("ppCode");
  PROGRAMS.forEach(p => { const im = new Image(); im.src = pic(p.seed); });
  let tx=0, ty=0, cx=0, cy=0, rot=0, show=false;
  list.addEventListener("mousemove", e => {
    tx = Math.min(Math.max(e.clientX + 30, 160), innerWidth - 170);
    ty = e.clientY;
  });
  list.addEventListener("mouseover", e => {
    const head = e.target.closest(".prog-head");
    if (!head) return;
    const i = +head.parentElement.id.split("-")[1];
    const src = pic(PROGRAMS[i].seed);
    if (img.src !== src) img.src = src;
    code.textContent = PROGRAMS[i].code;
    show = true; pv.classList.add("on");
  });
  list.addEventListener("mouseleave", () => { show = false; pv.classList.remove("on"); });
  (function loop(){
    cx += (tx-cx)*0.14; cy += (ty-cy)*0.14;
    rot += ((Math.max(-9, Math.min(9, (tx-cx)*0.18))) - rot)*0.1;
    pv.style.transform = `translate(${cx}px, ${cy-120}px) rotate(${rot}deg)`;
    pv.style.opacity = show ? 1 : 0;
    requestAnimationFrame(loop);
  })();
}

/* ================= ROOMS + LIGHTBOX ================= */
const roomImg = (s,w,h) => s.includes("/") ? s : `https://picsum.photos/seed/${s}/${w}/${h}.jpg`;
const roomsGrid = document.getElementById("roomsGrid");

function renderRooms(){
  roomsGrid.innerHTML = ROOMS_DATA.map((r,i)=>`
  <article class="room-card reveal" style="--d:${(i*.06).toFixed(2)}s" data-room="${i}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="${r.name[LANG]}">
    <div class="room-cover"><img src="${roomImg(r.images[0],700,900)}" alt="${r.name[LANG]}" loading="lazy"></div>
    <span class="room-count">${r.images.length} ${t("rooms.photos")}</span>
    <div class="room-info">
      <span class="room-num">${r.num}</span>
      <div>
        <h3 class="room-name">${r.name[LANG]}</h3>
        <p class="room-tag">${r.tag[LANG]}</p>
        <span class="room-cta">${t("rooms.view")} <i data-lucide="images"></i></span>
      </div>
    </div>
  </article>`).join("");
  icons();
}

const lb = document.getElementById("lightbox"),
      lbImg = document.getElementById("lbImg"),
      lbCap = document.getElementById("lbCap"),
      lbCount = document.getElementById("lbCount"),
      lbThumbs = document.getElementById("lbThumbs");
let lbRoom = 0, lbIdx = 0;

function fillLB(){
  const r = ROOMS_DATA[lbRoom];
  lbImg.style.opacity = 0;
  lbImg.src = roomImg(r.images[lbIdx], 1200, 800);
  lbImg.onload = () => { lbImg.style.opacity = 1; };
  lbImg.alt = r.name[LANG];
  lbCap.textContent = r.name[LANG] + " — " + r.tag[LANG];
  lbCount.textContent = (lbIdx+1) + " / " + r.images.length;
  lbThumbs.innerHTML = r.images.map((s,j)=>
    `<img src="${roomImg(s,160,110)}" data-j="${j}" class="${j===lbIdx?"on":""}" alt="">`).join("");
}
function openLB(r,i){
  lbRoom = r; lbIdx = i;
  fillLB();
  lb.classList.add("open");
  lb.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  document.getElementById("lbClose").focus();
}
function closeLB(){
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function lbGo(d){
  const n = ROOMS_DATA[lbRoom].images.length;
  lbIdx = (lbIdx + d + n) % n;
  fillLB();
}
roomsGrid.addEventListener("click", e => {
  const card = e.target.closest(".room-card");
  if (card) openLB(+card.dataset.room, 0);
});
roomsGrid.addEventListener("keydown", e => {
  const card = e.target.closest(".room-card");
  if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLB(+card.dataset.room, 0); }
});
document.getElementById("lbPrev").addEventListener("click", () => lbGo(-1));
document.getElementById("lbNext").addEventListener("click", () => lbGo(1));
document.getElementById("lbClose").addEventListener("click", closeLB);
lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
lbThumbs.addEventListener("click", e => {
  const th = e.target.closest("img");
  if (th) { lbIdx = +th.dataset.j; fillLB(); }
});
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") lbGo(-1);
  if (e.key === "ArrowRight") lbGo(1);
});

/* ================= WEEK BOARD (no fixed hours) ================= */
const WEEK = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const rowsEl = document.getElementById("boardRows");
function renderBoard(){
  rowsEl.innerHTML = WEEK.map(d=>`
    <div class="b-row">
      <span class="b-day d" data-t="${t("d."+d.toLowerCase())}">${t("d."+d.toLowerCase())}</span>
      <span class="b-what d" data-t="${t("sch.row1")}">${t("sch.row1")}</span>
      <span class="b-when d" data-t="${t("sch.row2")}">${t("sch.row2")}</span>
      <span class="b-st st-open">${t("st.possible")}</span>
    </div>`).join("");
}

/* split-flap decode (Latin + Arabic glyphs) */
const GLYPHS = "ABCDEFGHKLMNPRSTUVXYZ0123456789#·/:ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
function scramble(el, delay){
  const txt = el.dataset.t;
  if (RM) { el.textContent = txt; return; }
  const dur = 500 + Math.random()*320, start = performance.now() + delay;
  (function frame(now){
    if (now < start) return requestAnimationFrame(frame);
    const p = Math.min((now-start)/dur, 1), n = Math.floor(p*txt.length);
    let out = "";
    for (let i=0; i<txt.length; i++)
      out += txt[i]===" " ? " " : (i<n ? txt[i] : GLYPHS[(Math.random()*GLYPHS.length)|0]);
    el.textContent = p<1 ? out : txt;
    if (p<1) requestAnimationFrame(frame);
  })(performance.now());
}
let decoded = false;
function decodeBoard(){
  if (decoded) return; decoded = true;
  document.querySelectorAll(".b-row").forEach((row,i) =>
    row.querySelectorAll(".d").forEach((c,j) => scramble(c, i*60 + j*45)));
}

/* ================= TEACHERS (filter + WhatsApp) — section commented out in HTML ================= */
let tFilter = "all";
const tGrid = document.getElementById("teachGrid"),
      tEmpty = document.getElementById("tEmpty"),
      tFilters = document.getElementById("tFilters");

function waLink(tc){
  const direct = tc.direct && tc.whatsapp;
  const num = direct ? tc.whatsapp : CONFIG.centerWa;
  const msg = direct
    ? t("wa.direct").replace("{name}", tc.name[LANG])
    : t("wa.via").replace("{name}", tc.name[LANG]).replace("{subject}", tc.subject[LANG]);
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}
function renderTeachers(){
  if (!tGrid) return;
  tGrid.innerHTML = TEACHERS.map((tc,i)=>`
  <article class="t-card reveal" id="tc-${i}" style="--d:${(i*.06).toFixed(2)}s">
    <div class="t-photo">
      <img src="https://picsum.photos/seed/${tc.seed}/640/800.jpg" alt="${tc.name[LANG]}" loading="lazy">
      ${tc.badge ? `<span class="t-badge">${tc.badge[LANG]}</span>` : ""}
    </div>
    <div class="t-body">
      <h3 class="t-name">${tc.name[LANG]}</h3>
      <p class="t-subj">${tc.subject[LANG]}</p>
      <p class="t-bio">${tc.bio[LANG]}</p>
      <div class="t-meta">
        ${tc.levels.map(l=>`<span class="tag">${t("lvl."+l)}</span>`).join("")}
        ${tc.exp ? `<span class="t-exp">${tc.exp[LANG]}</span>` : ""}
      </div>
      <a class="t-wa" href="${waLink(tc)}" target="_blank" rel="noopener"
         title="${(tc.direct && tc.whatsapp) ? t("teacher.waDirect") : t("teacher.waVia")}">
        <svg><use href="#wa"/></svg>${t("teacher.wa")}
      </a>
    </div>
  </article>`).join("");
  icons();
  applyFilter(false);
}
function applyFilter(animate){
  if (!tGrid || !tEmpty) return;
  let shown = 0;
  tGrid.querySelectorAll(".t-card").forEach((el,i)=>{
    const match = tFilter === "all" || TEACHERS[i].levels.includes(tFilter);
    if (match) shown++;
    if (!animate){
      el.classList.toggle("hide", !match);
      el.classList.remove("out");
      return;
    }
    if (match){
      if (el.classList.contains("hide")){
        el.classList.remove("hide"); el.classList.add("out");
        requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove("out")));
      } else el.classList.remove("out");
    } else {
      el.classList.add("out");
      setTimeout(()=>{ if (!(tFilter==="all" || TEACHERS[i].levels.includes(tFilter))) el.classList.add("hide"); }, 280);
    }
  });
  tEmpty.hidden = shown > 0;
}
if (tFilters) tFilters.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip || chip.dataset.lvl === tFilter) return;
  tFilter = chip.dataset.lvl;
  document.querySelectorAll("#tFilters .chip").forEach(c => c.classList.toggle("on", c === chip));
  applyFilter(true);
});

/* ================= VOICES ================= */
let vi = 0, vTimer;
const vBody = document.querySelector(".v-body"),
      vQuote = document.getElementById("vQuote"),
      vName = document.getElementById("vName"),
      vCount = document.getElementById("vCount"),
      vBar = document.getElementById("vBar");
function renderV(i, animate){
  const apply = () => {
    const q = QUOTES[i][LANG];
    vQuote.textContent = "\u201C" + q.q + "\u201D";
    vName.innerHTML = `<b>${q.n}</b> — ${q.m}`;
    vCount.textContent = String(i+1).padStart(2,"0") + " / " + String(QUOTES.length).padStart(2,"0");
    vBar.style.transition = "none"; vBar.style.transform = "scaleX(0)";
    void vBar.offsetWidth;
    vBar.style.transition = "transform 6s linear"; vBar.style.transform = "scaleX(1)";
  };
  if (animate && !RM) {
    vBody.classList.add("fading");
    setTimeout(() => { apply(); vBody.classList.remove("fading"); }, 260);
  } else apply();
}
function vRestart(){ clearTimeout(vTimer); vTimer = setTimeout(() => { vi = (vi+1)%QUOTES.length; renderV(vi,true); vRestart(); }, 6200); }
document.getElementById("vPrev").addEventListener("click", () => { vi = (vi-1+QUOTES.length)%QUOTES.length; renderV(vi,true); vRestart(); });
document.getElementById("vNext").addEventListener("click", () => { vi = (vi+1)%QUOTES.length; renderV(vi,true); vRestart(); });
document.getElementById("vWrap").addEventListener("mouseenter", () => clearTimeout(vTimer));
document.getElementById("vWrap").addEventListener("mouseleave", vRestart);

/* ================= REGISTRATION FORM =================
   validate → deliver:
   · Mode B (default): WhatsApp opens pre-filled — parent presses Send
   · Mode A (formEnabled:true): silent POST to FormSubmit → email
   · Any failure: WhatsApp fallback button, nothing is lost        */
const form = document.getElementById("regForm"),
      sel = document.getElementById("fCourse"),
      fHoney = document.getElementById("fHoney"),
      submitBtn = document.getElementById("fSubmit"),
      resultPanel = document.getElementById("formResult"),
      resIco = document.getElementById("resIco"),
      resTitle = document.getElementById("resTitle"),
      resMsg = document.getElementById("resMsg"),
      resWaBtn = document.getElementById("resWaBtn"),
      resWaTxt = document.getElementById("resWaTxt"),
      resRetry = document.getElementById("resRetry");

function buildSelect(){
  const cur = sel.value;
  sel.innerHTML = `<option value="">${t("prog.selectPh")}</option>` +
    PROGRAMS.map(p => `<option value="${p.code}">${p.code} — ${p[LANG].title}</option>`).join("") +
    `<option value="unsure">${t("prog.unsure")}</option>`;
  sel.value = cur || "";
}

const digitsOf = v => v.replace(/[^\d]/g, "").replace(/^00/, "");
function collect(){
  const lv = document.getElementById("fLevel");
  return {
    name:    document.getElementById("fName").value.trim(),
    phone:   document.getElementById("fPhone").value.trim(),
    level:   lv.value,
    levelText:  lv.selectedOptions[0] ? lv.selectedOptions[0].textContent : "",
    student: document.getElementById("fStudent").value.trim(),
    course:  sel.value,
    courseText: sel.selectedOptions[0] ? sel.selectedOptions[0].textContent : "",
    msg:     document.getElementById("fMsg").value.trim()
  };
}
function validate(d){
  const bad = [];
  if (d.name.length < 2)                      bad.push("fName");
  if (!/^\d{9,15}$/.test(digitsOf(d.phone)))  bad.push("fPhone");
  if (!d.level)                               bad.push("fLevel");
  if (!d.course)                              bad.push("fCourse");
  return bad;
}
function clearErrs(){
  form.querySelectorAll(".field.err").forEach(f => {
    f.classList.remove("err");
    const el = f.querySelector("input,select,textarea");
    if (el) el.setAttribute("aria-invalid","false");
  });
}
function markErr(id){
  const el = document.getElementById(id), f = el.closest(".field");
  f.classList.add("err");
  el.setAttribute("aria-invalid","true");
}
function waLinkFor(d){
  const L = [
    t("wa.title"),
    t("wa.parent") + ": " + d.name,
    t("wa.phone") + ": " + d.phone,
    (d.student ? t("wa.child") + ": " + d.student + " — " + d.levelText
               : t("wa.child") + ": " + d.levelText),
    t("wa.program") + ": " + d.courseText
  ];
  if (d.msg) L.push(t("wa.note") + ": " + d.msg);
  return "https://wa.me/" + CONFIG.centerWa + "?text=" + encodeURIComponent(L.join("\n"));
}
function showResult(kind, opt){
  form.hidden = true;
  resultPanel.hidden = false;
  resultPanel.classList.toggle("fail", kind === "fail");
  if (kind === "ok"){
    resIco.innerHTML = '<i data-lucide="check"></i>';
    resTitle.textContent = t("reg.res.okT");
    resMsg.textContent = t("reg.res.okM").replace("{ref}", opt.ref);
    resWaTxt.textContent = t("reg.res.okBtn");
    resRetry.hidden = true;
  } else if (kind === "wa"){
    resIco.innerHTML = '<svg width="20" height="20"><use href="#wa"/></svg>';
    resTitle.textContent = t("reg.res.waT");
    resMsg.textContent = t("reg.res.waM");
    resWaTxt.textContent = t("reg.res.waBtn");
    resRetry.hidden = true;
  } else {
    resIco.innerHTML = '<i data-lucide="alert-triangle"></i>';
    resTitle.textContent = t("reg.res.failT");
    resMsg.textContent = t("reg.res.failM");
    resWaTxt.textContent = t("reg.res.failBtn");
    resRetry.hidden = false;
  }
  resWaBtn.href = opt.link;
  icons();
  resultPanel.scrollIntoView({behavior: RM ? "auto" : "smooth", block:"center"});
  resultPanel.focus({preventScroll:true});
}
function hideResult(){ resultPanel.hidden = true; form.hidden = false; }
resRetry.addEventListener("click", () => { hideResult(); document.getElementById("fName").focus(); });

/* silent POST to FormSubmit (AJAX, JSON, 10s timeout) */
function sendFormSubmit(d, ref){
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 10000);
  return fetch("https://formsubmit.co/ajax/" + CONFIG.formEmail, {
    method: "POST",
    signal: ctrl.signal,
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      _subject: t("mail.subject"),
      _template: "table",
      _captcha: "false",
      _honey: fHoney.value,
      "Ref": ref,
      "Lang": LANG.toUpperCase(),
      "Parent": d.name,
      "Phone / WhatsApp": d.phone,
      "Level": d.levelText,
      "Pupil": d.student || "—",
      "Program": d.courseText,
      "Message": d.msg || "—",
      "Page": location.href
    })
  }).then(r => r.json()).then(j => {
    if (!(j.success === "true" || j.success === true)) throw new Error(j.message || "formsubmit");
  }).finally(() => clearTimeout(to));
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  clearErrs();

  /* 1 — check every field BEFORE sending anything */
  const d = collect();
  const bad = validate(d);
  if (bad.length){
    bad.forEach(markErr);
    const first = document.getElementById(bad[0]);
    first.closest(".field").scrollIntoView({behavior: RM ? "auto" : "smooth", block:"center"});
    first.focus({preventScroll:true});
    submitBtn.classList.add("shake");
    setTimeout(() => submitBtn.classList.remove("shake"), 400);
    toast(t("toast.err"), t("toast.errMsg"), true);
    return;
  }

  /* 2 — bot trap: honeypot filled → pretend success, send nothing */
  if (fHoney.value){
    showResult("ok", {ref:"CS-XXXX", link: waLinkFor(d)});
    form.reset();
    return;
  }

  /* 3 — deliver */
  if (!CONFIG.formEnabled){
    /* MODE B — WhatsApp, zero setup, always works */
    const link = waLinkFor(d);
    window.open(link, "_blank");
    showResult("wa", {link});
    form.reset();
    clearErrs();
    return;
  }

  /* MODE A — FormSubmit email, with WhatsApp fallback on any failure */
  const ref = "CS-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random()*9000);
  const label = submitBtn.querySelector("span"), old = label.textContent;
  submitBtn.classList.add("loading"); submitBtn.disabled = true; label.textContent = t("reg.sending");
  try {
    await sendFormSubmit(d, ref);
    showResult("ok", {ref, link: waLinkFor(d)});
    form.reset();
    clearErrs();
  } catch (err){
    showResult("fail", {link: waLinkFor(d)});   /* nothing reset — data kept */
  } finally {
    submitBtn.classList.remove("loading"); submitBtn.disabled = false; label.textContent = old;
  }
});

/* live error clearing */
form.querySelectorAll("input, select, textarea").forEach(el => {
  const clear = () => { const f = el.closest(".field"); if (f){ f.classList.remove("err"); el.setAttribute("aria-invalid","false"); } };
  el.addEventListener("input", clear);
  el.addEventListener("change", clear);
});

/* ================= LIVE CLOCK (Souk El Arbaa — Africa/Casablanca) ================= */
const fmtHMS = new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Casablanca",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
const fmtHM = new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Casablanca",hour:"2-digit",minute:"2-digit",hour12:false});
const fmtH = new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Casablanca",hour:"2-digit",hour12:false});
const liveLine = document.getElementById("liveLine");
function tick(){
  const s = fmtHMS.format(new Date()), hm = fmtHM.format(new Date()), h = +fmtH.format(new Date());
  const key = h >= 18 ? "live.evening" : h >= 6 ? "live.day" : "live.night";
  liveLine.textContent = t(key).replace("{hm}", hm);
}

/* ================= STARFIELD ================= */
(function(){
  const hero = document.getElementById("top"), cv = document.getElementById("stars");
  const ctx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio||1, 2);
  let W=0, H=0, stars=[], meteor=null, nextMeteor=5000, mx=0, my=0, smx=0, smy=0, running=true;
  const isLight = () => document.documentElement.dataset.theme === "light";
  function resize(){
    W = hero.clientWidth; H = hero.clientHeight;
    cv.width = W*dpr; cv.height = H*dpr;
    cv.style.width = W+"px"; cv.style.height = H+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.min(innerWidth < 700 ? 90 : 240, Math.round(W*H/(innerWidth < 700 ? 14000 : 8500)));
    stars = Array.from({length:n}, () => ({
      x:Math.random(), y:Math.random(), r:.4+Math.random()*1.3, d:Math.random(),
      ph:Math.random()*Math.PI*2, sp:.4+Math.random()*1.2,
      tint: Math.random()<.08 ? (Math.random()<.5 ? "63,224,197" : "240,176,63") : "234,240,248"
    }));
    if (RM) draw(0);
  }
  hero.addEventListener("pointermove", e => {
    if (innerWidth < 760) return;
    mx = e.clientX/innerWidth - .5; my = e.clientY/innerHeight - .5;
    document.getElementById("moonWrap").style.transform = `translate(${mx*-16}px, calc(-50% + ${my*-9}px))`;
  });
  function draw(ts){
    if (isLight()) { ctx.clearRect(0,0,W,H); return; }
    ctx.clearRect(0,0,W,H);
    smx += (mx-smx)*.04; smy += (my-smy)*.04;
    const tt = ts/1000;
    for (const s of stars){
      const a = (.25 + s.d*.55) * (RM ? 1 : .65 + .35*Math.sin(tt*s.sp + s.ph));
      ctx.beginPath();
      ctx.arc(s.x*W + smx*s.d*30, s.y*H + smy*s.d*16, s.r*(.6+s.d*.8), 0, 7);
      ctx.fillStyle = `rgba(${s.tint},${a})`; ctx.fill();
    }
    if (!RM){
      if (!meteor && ts > nextMeteor){
        const l = Math.random() < .5;
        meteor = {x: W*.15 + Math.random()*W*.7, y: 20 + Math.random()*H*.3,
                  vx:(l?1:-1)*(5+Math.random()*3), vy:2.2+Math.random()*1.6, life:1};
        nextMeteor = ts + 8000 + Math.random()*9000;
      }
      if (meteor){
        meteor.x += meteor.vx; meteor.y += meteor.vy; meteor.life -= .016;
        const a = Math.max(meteor.life, 0);
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx*12, meteor.y - meteor.vy*12);
        ctx.strokeStyle = `rgba(234,240,248,${a*.9})`; ctx.lineWidth = 1.3; ctx.lineCap = "round"; ctx.stroke();
        ctx.beginPath(); ctx.arc(meteor.x, meteor.y, 1.6, 0, 7);
        ctx.fillStyle = `rgba(234,240,248,${a})`; ctx.fill();
        if (meteor.life <= 0 || meteor.x < -60 || meteor.x > W+60 || meteor.y > H+60) meteor = null;
      }
    }
  }
  function loop(ts){ if (running) draw(ts); requestAnimationFrame(loop); }
  resize(); addEventListener("resize", resize);
  if (!RM) requestAnimationFrame(loop);
  new IntersectionObserver(en => { running = en[0].isIntersecting; }).observe(hero);
})();

/* ================= THE PLACE — map + video ================= */
(function(){
  const q = encodeURIComponent(CONFIG.mapQuery);
  document.getElementById("mapAddr").textContent = CONFIG.address;
  document.getElementById("mapEmbed").innerHTML =
    `<iframe title="Map — ${CONFIG.placeName}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${q}&z=${CONFIG.zoom}&output=embed"></iframe>`;
  document.getElementById("btnDirections").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  document.getElementById("btnMaps").href = `https://www.google.com/maps/search/?api=1&query=${q}`;

  const cinema = document.getElementById("cinema"),
        poster = document.getElementById("cPoster"),
        video  = document.getElementById("cVideo"),
        play   = document.getElementById("cPlay");
  poster.src = CONFIG.videoPoster;
  play.addEventListener("click", () => {
    cinema.classList.add("playing");
    if (!video.src) video.src = CONFIG.videoSrc;
    video.play().catch(()=>{});
  });
  video.addEventListener("ended", () => {
    cinema.classList.remove("playing");
    video.removeAttribute("src"); video.load();
  });
})();

/* ================= THEME + LANGUAGE SWITCH ================= */
const metaTheme = document.getElementById("metaTheme");
function syncThemeAssets(){
  const light = document.documentElement.dataset.theme === "light";
  metaTheme.content = light ? "#F3F0E9" : "#05080F";
  const iconHref = light ? "assets/logo-dark-theme.png" : "assets/logo.png";
  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach(el => { el.href = iconHref; });
}
document.getElementById("tBtn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('cs-theme', next); } catch(e){}
  syncThemeAssets();
});
syncThemeAssets();

function applyStatic(){
  document.querySelectorAll("[data-i18n]").forEach(el => el.innerHTML = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
}
function setLang(l){
  LANG = l;
  try { localStorage.setItem('cs-lang', l); } catch(e){}
  document.documentElement.lang = l;
  document.documentElement.dir = (l === "ar") ? "rtl" : "ltr";
  document.title = t("docTitle");
  document.querySelectorAll("[data-setlang]").forEach(b => b.classList.toggle("on", b.dataset.setlang === l));
  const openIds = new Set([...list.querySelectorAll(".prog.open")].map(el => el.id));
  hideResult(); /* if the result panel was open, return to the fresh form */
  applyStatic();
  renderMarquee(); renderPrograms(); renderRooms(); renderBoard(); renderTeachers(); buildSelect();
  openIds.forEach(id => { const el = document.getElementById(id); if (el) { el.classList.add("open"); el.querySelector(".prog-head").setAttribute("aria-expanded","true"); } });
  list.querySelectorAll(".prog").forEach(el => el.classList.add("in"));
  if (tGrid) tGrid.querySelectorAll(".t-card").forEach(el => el.classList.add("in"));
  roomsGrid.querySelectorAll(".room-card").forEach(el => el.classList.add("in"));
  renderV(vi, false); vRestart();
  tick(); icons();
}
document.querySelectorAll("[data-setlang]").forEach(b =>
  b.addEventListener("click", () => { if (b.dataset.setlang !== LANG) setLang(b.dataset.setlang); }));

/* ================= INITIAL RENDER ================= */
applyStatic();
renderMarquee(); renderPrograms(); renderRooms(); renderBoard(); renderTeachers(); buildSelect();
renderV(0,false); vRestart();
tick(); setInterval(tick, 1000);
document.querySelectorAll("[data-setlang]").forEach(b => b.classList.toggle("on", b.dataset.setlang === LANG));

/* ================= REVEALS, NAV, MENU ================= */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    if (en.target.id === "board") decodeBoard();
    io.unobserve(en.target);
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const navLinks = document.querySelectorAll("nav.main a");
const secObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#"+en.target.id));
  });
}, {rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(s => secObs.observe(s));

const hdr = document.getElementById("hdr");
addEventListener("scroll", () => hdr.classList.toggle("scrolled", scrollY > 12), {passive:true});

/* nav / menu / footer: land on section content under the fixed header (not empty padding) */
function scrollToSection(hash){
  const id = (hash || "").replace(/^#/, "");
  if (!id) return false;
  const section = document.getElementById(id);
  if (!section) return false;
  const target =
    section.querySelector(".sec-head, .about-side, .week-title, h2, h1") || section;
  const headerH = hdr.getBoundingClientRect().height || 72;
  const y = target.getBoundingClientRect().top + scrollY - headerH - 18;
  scrollTo({ top: Math.max(0, y), behavior: RM ? "auto" : "smooth" });
  try { history.pushState(null, "", "#" + id); } catch(e){}
  return true;
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (!href || href === "#" || href === "#top") {
      if (href === "#top") {
        e.preventDefault();
        scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
        try { history.pushState(null, "", "#top"); } catch(err){}
      }
      return;
    }
    if (scrollToSection(href)) e.preventDefault();
  });
});

const mMenu = document.getElementById("mMenu");
const setMenu = o => {
  mMenu.classList.toggle("open", o);
  mMenu.setAttribute("aria-hidden", o ? "false" : "true");
  document.body.style.overflow = o ? "hidden" : "";
  document.getElementById("mBtn").setAttribute("aria-expanded", o ? "true" : "false");
};
document.getElementById("mBtn").setAttribute("aria-expanded","false");
document.getElementById("mBtn").addEventListener("click", () => setMenu(true));
document.getElementById("mClose").addEventListener("click", () => setMenu(false));
mMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && mMenu.classList.contains("open")) setMenu(false);
});

document.getElementById("toTop").addEventListener("click", () =>
  scrollTo({top:0, behavior: RM ? "auto" : "smooth"}));

icons();
})();
