/* Living Wallpaper v1.1 — "your world" as a two-question KPI.
   The globe is split pole-to-pole: the LEFT half lights up with your North Star
   WORKSHOP progress, the RIGHT half with your DESTINY DISCOVERED progress — so you
   can see both journeys at a glance. The label tells you which set you're in (it
   turns gold for the page you're on). Remembers where you park it and whether you
   turned it off. Reduced-motion safe, draggable, dependency-free.
   Art: assets/img/globe-north-star.webp (existing pipeline image). */
(function () {
  'use strict';
  if (window.__livingWallpaper) return;
  window.__livingWallpaper = true;

  var POS_KEY = 'lw-pos', OFF_KEY = 'lw-hidden';

  // ---- progress for each journey (plain step index in localStorage; works locked or not) ----
  function pct(stepKey, totalGlobal, fallbackTotal) {
    try {
      var max = (totalGlobal || fallbackTotal) - 1;
      var v = parseInt(localStorage.getItem(stepKey), 10);
      if (!isNaN(v) && max > 0) return Math.max(0, Math.min(1, v / max));
    } catch (e) {}
    return 0;
  }
  function workshopP() { return pct('ns-workshop-step', window.NS_STEPS && window.NS_STEPS.length, 12); }
  function destinyP()  { return pct('dd-step', window.DD_QUESTIONS && (window.DD_QUESTIONS.length + 2), 32); }

  // which journey is THIS page? -> highlight that half's label
  var here = (location.pathname || '').toLowerCase();
  var onWorkshop = here.indexOf('workshop') > -1;
  var onDestiny  = here.indexOf('destiny') > -1;

  // ---- styles ----
  var style = document.createElement('style');
  style.textContent =
    '.lw-orb{position:fixed;right:18px;bottom:18px;width:120px;z-index:15;cursor:grab;user-select:none;' +
    'touch-action:none;text-align:center;font-family:"Segoe UI",system-ui,sans-serif}' +
    '.lw-orb.drag{cursor:grabbing}' +
    '.lw-globe{position:relative;width:100%;' +
    'filter:drop-shadow(0 0 var(--gw,6px) rgba(232,181,77,var(--ga,.12)));transition:filter 1s ease}' +
    '.lw-globe img{width:100%;display:block;border-radius:14px;border:1px solid #20303f;pointer-events:none;' +
    '-webkit-user-drag:none;user-drag:none;transition:filter 1s ease}' +
    '.lw-globe .lf{clip-path:inset(0 50% 0 0);filter:brightness(var(--bL,.45)) saturate(var(--sL,.25))}' +
    '.lw-globe .rt{position:absolute;top:0;left:0;clip-path:inset(0 0 0 50%);' +
    'filter:brightness(var(--bR,.45)) saturate(var(--sR,.25))}' +
    '.lw-orb .cap{margin-top:6px;font-size:10.5px;font-weight:700;color:#9fb1c1;background:rgba(7,11,16,.72);' +
    'border:1px solid #20303f;border-radius:11px;padding:3px 8px;display:inline-block;white-space:nowrap}' +
    '.lw-orb .cap .on{color:#e8b54d}' +
    '.lw-orb .x{position:absolute;top:-8px;right:-8px;width:20px;height:20px;line-height:18px;border-radius:50%;' +
    'background:rgba(7,11,16,.92);border:1px solid #20303f;color:#9fb1c1;font-size:12px;cursor:pointer;' +
    'display:none;text-align:center;z-index:2}' +
    '.lw-orb:hover .x{display:block}' +
    '.lw-show{position:fixed;right:14px;bottom:14px;z-index:15;width:34px;height:34px;border-radius:50%;cursor:pointer;' +
    'background:rgba(7,11,16,.82);border:1px solid #20303f;color:#e8b54d;font-size:16px;line-height:32px;text-align:center;' +
    'font-family:"Segoe UI",system-ui,sans-serif}' +
    '@keyframes lwbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}' +
    '.lw-orb .floaty{animation:lwbob 6s ease-in-out infinite}' +
    '.lw-orb.drag .floaty{animation:none}' +
    '@media (prefers-reduced-motion:reduce){.lw-orb .floaty{animation:none}}' +
    '@media (max-width:560px){.lw-orb{width:90px;right:10px;bottom:10px}.lw-orb .x{display:block}}';
  document.head.appendChild(style);

  // ---- build widget ----
  var orb = document.createElement('div');
  orb.className = 'lw-orb';
  orb.title = 'Left = your Workshop, right = your Destiny. Drag me anywhere; the × hides me.';
  orb.innerHTML =
    '<div class="x" title="Hide my world">×</div>' +
    '<div class="floaty"><div class="lw-globe">' +
      '<img class="lf" draggable="false" src="assets/img/globe-north-star.webp" alt="Workshop half of your world, lighting up as you progress">' +
      '<img class="rt" draggable="false" src="assets/img/globe-north-star.webp" alt="Destiny half of your world, lighting up as you progress">' +
    '</div></div>' +
    '<div class="cap"><span class="cw">Workshop 0%</span> · <span class="cd">Destiny 0%</span></div>';

  var showDot = document.createElement('div');
  showDot.className = 'lw-show';
  showDot.title = 'Show my world';
  showDot.textContent = '🌍'; // globe
  showDot.style.display = 'none';

  function mount() {
    var root = document.body || document.documentElement;
    root.appendChild(orb);
    root.appendChild(showDot);
    restorePos();
    if (localStorage.getItem(OFF_KEY) === '1') setHidden(true);
    apply();
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  // ---- light up each half by its own journey ----
  function apply() {
    var L = workshopP(), R = destinyP(), avg = (L + R) / 2;
    orb.style.setProperty('--bL', (0.45 + L * 0.65).toFixed(2));   // dim -> bright
    orb.style.setProperty('--sL', (0.25 + L * 1.05).toFixed(2));   // muted -> vivid
    orb.style.setProperty('--bR', (0.45 + R * 0.65).toFixed(2));
    orb.style.setProperty('--sR', (0.25 + R * 1.05).toFixed(2));
    var g = orb.querySelector('.lw-globe');
    if (g) {
      g.style.setProperty('--gw', Math.round(6 + avg * 26) + 'px');  // shared glow grows
      g.style.setProperty('--ga', (0.12 + avg * 0.55).toFixed(2));
    }
    var cw = orb.querySelector('.cw'), cd = orb.querySelector('.cd');
    if (cw) { cw.textContent = 'Workshop ' + Math.round(L * 100) + '%'; cw.className = 'cw' + (onWorkshop ? ' on' : ''); }
    if (cd) { cd.textContent = 'Destiny ' + Math.round(R * 100) + '%'; cd.className = 'cd' + (onDestiny ? ' on' : ''); }
  }
  apply();
  setInterval(apply, 1500);
  window.addEventListener('focus', apply);

  // ---- on/off (persists across visits) ----
  function setHidden(h) {
    orb.style.display = h ? 'none' : '';
    showDot.style.display = h ? 'block' : 'none';
    try { localStorage.setItem(OFF_KEY, h ? '1' : '0'); } catch (e) {}
  }
  orb.querySelector('.x').addEventListener('click', function (e) { e.stopPropagation(); setHidden(true); });
  showDot.addEventListener('click', function () { setHidden(false); apply(); });

  // ---- remember where you park it (don't move their cheese) ----
  function savePos() {
    try { localStorage.setItem(POS_KEY, JSON.stringify({ x: orb.style.left, y: orb.style.top })); } catch (e) {}
  }
  function restorePos() {
    try {
      var p = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
      if (p && p.x && p.y) {
        var x = parseInt(p.x, 10), y = parseInt(p.y, 10);
        // clamp into view so a saved spot never strands off-screen after a resize
        var w = orb.offsetWidth || 120, h = orb.offsetHeight || 150;
        if (!isNaN(x) && !isNaN(y)) {
          x = Math.max(2, Math.min(x, window.innerWidth - w - 2));
          y = Math.max(2, Math.min(y, window.innerHeight - h - 2));
          orb.style.left = x + 'px'; orb.style.top = y + 'px';
          orb.style.right = 'auto'; orb.style.bottom = 'auto';
        }
      }
    } catch (e) {}
  }

  // ---- draggable (document-level; native image-drag killed) ----
  var ox = 0, oy = 0, moved = false;
  function onMove(e) {
    moved = true;
    orb.style.left = (e.clientX - ox) + 'px';
    orb.style.top = (e.clientY - oy) + 'px';
    orb.style.right = 'auto'; orb.style.bottom = 'auto';
  }
  function onUp() {
    orb.classList.remove('drag');
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    if (moved) savePos();
  }
  orb.addEventListener('pointerdown', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('x')) return; // close button, not a drag
    e.preventDefault();                       // stop the browser from "dragging the image"
    moved = false;
    orb.classList.add('drag');
    var r = orb.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
})();
