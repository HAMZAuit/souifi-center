/* ============ REAL CENTRE SETTINGS ============ */
const CONFIG = {
  placeName: "Centre Souifi — Souk El Arbaa du Gharb",
  /* Exact pin: https://maps.app.goo.gl/6noaXjyXVszhw1jM9 — أمام ثانوية مولاي عبد الله الشريف */
  address:   "أمام ثانوية مولاي عبد الله الشريف · سوق الأربعاء الغرب",
  mapQuery:  "34.678463,-5.997289",
  mapsUrl:   "https://maps.app.goo.gl/6noaXjyXVszhw1jM9",
  zoom:      17,
  phoneDisplay: "+212 612 692 300",
  centerWa: "212612692300",

  /* ── FORM DELIVERY ─────────────────────────────────────────────
     MODE B (default · active now): formEnabled:false
       → after validation, WhatsApp opens with the full request
         pre-filled. Parent presses Send. Always works, $0, no setup.

     MODE A (email via FormSubmit · free): formEnabled:true
       1) Put the centre's real Gmail in formEmail below
       2) Deploy the site, then submit the form ONCE yourself
       3) Open the "FormSubmit Activation" email in that inbox
          and click the activation link
       4) Flip formEnabled to true — every request now also
          lands in the inbox (perfect trigger for a Make.com →
          CallMeBot WhatsApp automation later, no code change) */
  formEnabled: false,
  formEmail: "centresouifi@gmail.com",   /* ⚠️ REPLACE with the centre's real email */

  videoSrc:    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  videoPoster: "https://picsum.photos/seed/centre-souifi-front/1600/900.jpg"
};
