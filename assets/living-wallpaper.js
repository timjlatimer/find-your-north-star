/* Living Wallpaper v1 — "you're building your world."
   A small floating world + North Star that starts dim and brightens / gains colour
   as you move through a North Star exercise. Progress is read from the plain
   step-index in localStorage (works whether or not answers are passphrase-locked).
   Reusable on any North Star page. Reduced-motion safe, draggable, dependency-free.
   The art (assets/img/globe-north-star.webp) is the existing pipeline image. */
(function () {
  'use strict';
  if (window.__livingWallpaper) return;
  window.__livingWallpaper = true;

  // ---- progress: take the furthest-along of the two journeys (plain step index) ----
  function progress() {
    var best = 0;
    try {
      var ddMax = (window.DD_QUESTIONS ? window.DD_QUESTIONS.length + 2 : 32) - 1; // welcome + Qs + celebration
      var dd = parseInt(localStorage.getItem('dd-step'), 10);
      if (!isNaN(dd) && ddMax > 0) best = Math.max(best, dd / ddMax);
      var wsMax = (window.NS_STEPS ? window.NS_STEPS.length : 12) - 1;
      var ws = parseInt(localStorage.getItem('ns-workshop-step'), 10);
      if (!isNaN(ws) && wsMax > 0) best = Math.max(best, ws / wsMax);
    } catch (e) {}
    return Math.max(0, Math.min(1, best));
  }

  // ---- styles ----
  var style = document.createElement('style');
  style.textContent =
    '.lw-orb{position:fixed;right:18px;bottom:18px;width:120px;z-index:15;cursor:grab;user-select:none;' +
    'touch-action:none;text-align:center;font-family:"Segoe UI",system-ui,sans-serif}' +
    '.lw-orb.drag{cursor:grabbing}' +
    '.lw-orb img{width:100%;display:block;border-radius:14px;border:1px solid #20303f;' +
    'filter:brightness(var(--b,.45)) saturate(var(--s,.25)) ' +
    'drop-shadow(0 0 var(--gw,6px) rgba(232,181,77,var(--ga,.12)));transition:filter 1s ease}' +
    '.lw-orb .cap{margin-top:6px;font-size:10.5px;font-weight:700;color:#9fb1c1;background:rgba(7,11,16,.72);' +
    'border:1px solid #20303f;border-radius:11px;padding:3px 8px;display:inline-block;white-space:nowrap}' +
    '.lw-orb .cap b{color:#e8b54d}' +
    '@keyframes lwbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}' +
    '.lw-orb .floaty{animation:lwbob 6s ease-in-out infinite}' +
    '@media (prefers-reduced-motion:reduce){.lw-orb .floaty{animation:none}}' +
    '@media (max-width:560px){.lw-orb{width:90px;right:10px;bottom:10px}}';
  document.head.appendChild(style);

  // ---- widget ----
  var orb = document.createElement('div');
  orb.className = 'lw-orb';
  orb.title = 'Your world brightens as you build your North Star. Drag me anywhere.';
  orb.innerHTML =
    '<div class="floaty"><img src="assets/img/globe-north-star.webp" alt="Your world and your North Star, lighting up as you progress"></div>' +
    '<div class="cap">building your world · <b><span class="pc">0</span>%</b></div>';
  function mount() { (document.body || document.documentElement).appendChild(orb); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  // ---- light it up by progress ----
  function apply() {
    var p = progress();
    var pc = orb.querySelector('.pc');
    if (pc) pc.textContent = Math.round(p * 100);
    orb.style.setProperty('--b', (0.45 + p * 0.65).toFixed(2));      // dim -> bright
    orb.style.setProperty('--s', (0.25 + p * 1.05).toFixed(2));      // muted -> vivid
    orb.style.setProperty('--gw', Math.round(6 + p * 26) + 'px');    // glow grows
    orb.style.setProperty('--ga', (0.12 + p * 0.55).toFixed(2));     // glow strengthens
  }
  apply();
  setInterval(apply, 1500);
  window.addEventListener('focus', apply);

  // ---- draggable ----
  var ox = 0, oy = 0, dragging = false;
  orb.addEventListener('pointerdown', function (e) {
    dragging = true; orb.classList.add('drag');
    var r = orb.getBoundingClientRect(); ox = e.clientX - r.left; oy = e.clientY - r.top;
    try { orb.setPointerCapture(e.pointerId); } catch (e2) {}
  });
  orb.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    orb.style.left = (e.clientX - ox) + 'px'; orb.style.top = (e.clientY - oy) + 'px';
    orb.style.right = 'auto'; orb.style.bottom = 'auto';
  });
  function end() { dragging = false; orb.classList.remove('drag'); }
  orb.addEventListener('pointerup', end);
  orb.addEventListener('pointercancel', end);
})();
