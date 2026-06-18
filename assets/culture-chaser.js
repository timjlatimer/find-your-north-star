/* Culture Chaser v1 — a reusable "we're chasing you" accountability mascot.
   Drop it on any KPI / Dingo card / Dingo Caller. The FIRST time it appears it asks
   the person to "Pick my personality — I dare you" (a cast of 5). It then chases them
   toward a deadline: a blatant line + a countdown that VISIBLY speeds up the closer the
   deadline gets, and a click opens a "why am I chasing you?" panel. Self-relative
   (your own deadline), opt-out always, choice = consent. Placeholder emoji icons until
   real character art comes from the image pipeline. Dependency-free, reduced-motion safe.

   Usage:  CultureChaser.attach({ id:'north-star', label:'your North Star',
                                  deadlineDays:90, progress: CultureChaser.northStarProgress });
   Multiple instances stack (vertical offset); attach() returns { destroy }.
*/
(function () {
  'use strict';
  if (window.CultureChaser) return;
  var DAY = 86400000;
  var COUNT = 0;          // mounted-instance counter (for stacking offset)
  var ATTACHED = {};      // guard against double-attach per id
  var REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ---------- the cast of 5 (Tim picks the final characters/art later) ----------
  var CAST = {
    dash: {
      name: 'The Dash', icon: '🏃', accent: '#e8b54d',
      tagline: 'Cheeky, fast, on your side — the lovable menace.',
      line: function (d, t) { return d <= 0 ? "Clock's out — but it's never too late. Let's go." : 'Day ' + (t - d + 1) + ' of ' + t + " — I'm gaining. Catch me if you can."; },
      why: "I'm the friendly chase. People finish what's chasing them — so I chase. And I speed up the closer we get to the line. You don't have to win… but I might catch you."
    },
    boo: {
      name: 'The Boogeyman', icon: '👹', accent: '#a78bfa',
      tagline: 'Ominous, relentless, never sleeps.',
      line: function (d, t) { return d <= 0 ? 'The clock ran out. I am still here. Begin again.' : 'Day ' + (t - d + 1) + '. Tick… tick… I never stop.'; },
      why: 'I am the deadline made real. I do not rest, and I am right behind you. The closer the end, the faster I come. Move.'
    },
    buddy: {
      name: 'Buddy', icon: '🐤', accent: '#f5d36b',
      tagline: "Warm, gentle, quietly cheering you on.",
      line: function (d, t) { return d <= 0 ? 'No clock between us — just take one little step today?' : "It's been a bit — want to take one step today?"; },
      why: "I'm not here to scare you. I just don't want you to miss this. One small step today is plenty — and I'll be right here."
    },
    coach: {
      name: 'Coach', icon: '📣', accent: '#f59e0b',
      tagline: 'Motivating, believes in you, wants the win.',
      line: function (d, t) { return d <= 0 ? "Clock's done — champions just restart. Let's move!" : dayWord(d) + " on the clock — you've got this. Let's move!"; },
      why: "My whole job is to get your best out of you before the buzzer. Eyes up — let's put points on the board. I get louder near the end."
    },
    sarge: {
      name: 'Sarge', icon: '🎖️', accent: '#ef6a5a',
      tagline: 'Tough love. No excuses. Expects more.',
      line: function (d, t) { return d <= 0 ? 'Time is up, recruit. Reset and go again. MOVE.' : 'Day ' + (t - d + 1) + '. ' + dayWord(d) + ' left. No excuses — move it!'; },
      why: 'I push because I expect more from you than you do right now. Discipline today, pride tomorrow. I close in fast at the end — so get after it.'
    }
  };
  var ORDER = ['dash', 'boo', 'buddy', 'coach', 'sarge'];

  // ---------- shared styles (injected once) ----------
  function injectStyles() {
    if (document.getElementById('cc-styles')) return;
    var s = document.createElement('style');
    s.id = 'cc-styles';
    s.textContent =
      '.cc{position:fixed;left:18px;bottom:18px;z-index:16;font-family:"Segoe UI",system-ui,sans-serif;color:#cfe0ef}' +
      '.cc *{box-sizing:border-box}' +
      '.cc-badge{display:flex;align-items:center;gap:9px;background:rgba(7,11,16,.86);border:1px solid #20303f;' +
      'border-left:3px solid var(--cc,#e8b54d);border-radius:13px;padding:7px 12px 7px 9px;cursor:pointer;max-width:280px;' +
      'box-shadow:0 6px 20px rgba(0,0,0,.4)}' +
      '.cc-badge:hover{border-color:var(--cc,#e8b54d)}' +
      '.cc-ico{font-size:26px;line-height:1;flex:none;display:inline-block;filter:drop-shadow(0 0 6px var(--ccg,rgba(232,181,77,.4)))}' +
      '@keyframes cc-run{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}' +
      '.cc-ico.go{animation:cc-run var(--ccs,2.4s) ease-in-out infinite}' +
      '.cc-txt{min-width:0}' +
      '.cc-name{font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--cc,#e8b54d)}' +
      '.cc-line{font-size:11.5px;font-weight:600;color:#dbe7f2;line-height:1.25;overflow:hidden}' +
      '.cc-meta{font-size:10px;color:#8aa0b4;margin-top:1px}' +
      '.cc-x{position:absolute;top:-8px;right:-8px;width:20px;height:20px;line-height:18px;border-radius:50%;text-align:center;' +
      'background:rgba(7,11,16,.95);border:1px solid #20303f;color:#9fb1c1;font-size:12px;cursor:pointer;display:block}' +
      // hover-capable pointers: keep the × tucked away until hover; touch devices always see it
      '@media (hover:hover){.cc-x{display:none}.cc:hover .cc-x{display:block}}' +
      // chooser + panel popover (scrolls if it would overflow a short screen)
      '.cc-pop{position:absolute;left:0;bottom:100%;margin-bottom:10px;width:300px;max-width:78vw;background:rgba(9,13,19,.97);' +
      'border:1px solid #2a3b4d;border-radius:15px;padding:14px;box-shadow:0 14px 40px rgba(0,0,0,.55);' +
      'max-height:calc(100vh - 40px);overflow-y:auto}' +
      '.cc-pop h4{margin:0 0 3px;font-size:14px;color:#e8b54d;font-weight:800}' +
      '.cc-pop p.sub{margin:0 0 10px;font-size:11.5px;color:#9fb1c1;line-height:1.4}' +
      '.cc-opt{display:flex;align-items:center;gap:10px;padding:8px;border:1px solid #20303f;border-radius:11px;cursor:pointer;margin-bottom:7px}' +
      '.cc-opt:hover{border-color:var(--oc,#e8b54d);background:rgba(255,255,255,.03)}' +
      '.cc-opt .oi{font-size:23px;line-height:1;flex:none}' +
      '.cc-opt .on{font-size:12.5px;font-weight:800;color:var(--oc,#e8b54d)}' +
      '.cc-opt .ot{font-size:10.5px;color:#9fb1c1;line-height:1.3}' +
      '.cc-pop .row{display:flex;gap:8px;font-size:12px;margin:7px 0}' +
      '.cc-pop .row b{color:#e8b54d}' +
      '.cc-why{font-size:12px;color:#cfe0ef;line-height:1.5;margin:8px 0 12px;font-style:italic}' +
      '.cc-actions{display:flex;gap:8px;flex-wrap:wrap}' +
      '.cc-btn{font:inherit;font-size:11px;font-weight:700;color:#cfe0ef;background:rgba(255,255,255,.05);' +
      'border:1px solid #2a3b4d;border-radius:9px;padding:6px 10px;cursor:pointer}' +
      '.cc-btn:hover{border-color:#e8b54d;color:#e8b54d}' +
      '.cc-btn.go{background:var(--cc,#e8b54d);color:#0a0f14;border-color:var(--cc,#e8b54d)}' +
      '.cc-show{position:fixed;left:14px;bottom:14px;z-index:16;width:34px;height:34px;border-radius:50%;cursor:pointer;' +
      'background:rgba(7,11,16,.82);border:1px solid #20303f;font-size:17px;line-height:32px;text-align:center}' +
      '.cc-bar{height:5px;border-radius:4px;background:#16212c;overflow:hidden;margin-top:3px}' +
      '.cc-bar i{display:block;height:100%;background:var(--cc,#e8b54d);width:0}' +
      '@media (prefers-reduced-motion:reduce){.cc-ico.go{animation:none}}' +
      // bigger tap targets on touch devices
      '@media (pointer:coarse){.cc-x{width:34px;height:34px;line-height:32px;font-size:15px}.cc-show{width:44px;height:44px;line-height:42px;font-size:20px}}' +
      '@media (max-width:560px){.cc{left:10px;bottom:10px}.cc-badge{max-width:220px}}';
    document.head.appendChild(s);
  }

  // ---------- storage helpers ----------
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function del(k) { try { localStorage.removeItem(k); } catch (e) {} }

  function attach(opts) {
    opts = opts || {};
    var id = opts.id || 'default';
    if (ATTACHED[id]) return ATTACHED[id];           // don't double-mount the same chaser
    var total = opts.deadlineDays || 90;
    var label = opts.label || 'your goal';
    var allowed = (opts.allowed && opts.allowed.length) ? opts.allowed.filter(function (k) { return CAST[k]; }) : ORDER.slice();
    var def = opts.defaultPersonality && CAST[opts.defaultPersonality] ? opts.defaultPersonality : allowed[0];
    var progress = typeof opts.progress === 'function' ? opts.progress : function () { return 0; };
    var K = { start: 'cc-start-' + id, pers: 'cc-pers-' + id, hidden: 'cc-hidden-' + id };

    injectStyles();

    // start the clock on first ever appearance
    var startMs = parseInt(get(K.start), 10);
    if (isNaN(startMs)) { startMs = stampToday(); set(K.start, String(startMs)); }

    // stack multiple instances so they never sit on top of each other
    var idx = COUNT++;
    var offY = idx * 84;

    var root = document.createElement('div');
    root.className = 'cc';
    if (offY) root.style.bottom = (18 + offY) + 'px';
    var showDot = document.createElement('div');
    showDot.className = 'cc-show'; showDot.title = 'Bring back my Culture Chaser'; showDot.textContent = '🏁';
    showDot.style.display = 'none';
    if (offY) showDot.style.bottom = (14 + offY) + 'px';

    var timer = null;

    function mount() {
      var host = document.body || document.documentElement;
      host.appendChild(root); host.appendChild(showDot);
      if (get(K.hidden) === '1') { setHidden(true); } else { render(); }
      tick();
    }
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

    // --- time + state ---
    function daysLeft() {
      var elapsed = Math.floor((stampToday() - startMs) / DAY);
      return total - elapsed; // can go negative (overdue)
    }
    function fracLeft() {
      var d = daysLeft();
      return Math.max(0, Math.min(1, d / total));
    }

    function setHidden(h) {
      set(K.hidden, h ? '1' : '0');
      root.style.display = h ? 'none' : '';
      showDot.style.display = h ? 'block' : 'none';
      if (!h) render();
    }

    // --- renders ---
    function render() {
      var pers = get(K.pers);
      if (!pers || !CAST[pers]) renderChooser(); else renderBadge(pers);
    }

    function renderChooser() {
      root.innerHTML = '';
      var pop = document.createElement('div');
      pop.className = 'cc-pop';
      var html = '<h4>🏁 Pick my personality — I dare you</h4>' +
        '<p class="sub">I\'m your Culture Chaser for <b>' + esc(label) + '</b>. You\'ve got <b>' + total + ' days</b>. Choose how I chase you — change me anytime.</p>';
      allowed.forEach(function (k) {
        var c = CAST[k];
        html += '<div class="cc-opt" data-k="' + k + '" style="--oc:' + c.accent + '">' +
          '<span class="oi">' + c.icon + '</span>' +
          '<span><span class="on">' + c.icon + ' ' + esc(c.name) + '</span><br><span class="ot">' + esc(c.tagline) + '</span></span>' +
          '</div>';
      });
      pop.innerHTML = html;
      // a small badge stub so the popover has an anchor + the dare is visible inline
      var stub = document.createElement('div');
      stub.className = 'cc-badge';
      stub.style.setProperty('--cc', '#e8b54d');
      stub.innerHTML = '<span class="cc-ico">🏁</span><span class="cc-txt"><span class="cc-name">Culture Chaser</span><span class="cc-line">Pick my personality — I dare you</span></span>';
      root.appendChild(pop); root.appendChild(stub);
      pop.querySelectorAll('.cc-opt').forEach(function (el) {
        el.addEventListener('click', function () { set(K.pers, el.getAttribute('data-k')); render(); });
      });
      stub.addEventListener('click', function () { pop.style.display = (pop.style.display === 'none' ? '' : 'none'); });
    }

    function renderBadge(persKey) {
      root.innerHTML = '';
      var c = CAST[persKey];
      var x = document.createElement('div'); x.className = 'cc-x'; x.title = 'Turn off'; x.textContent = '×';
      var badge = document.createElement('div');
      badge.className = 'cc-badge';
      badge.style.setProperty('--cc', c.accent);
      badge.innerHTML =
        '<span class="cc-ico go">' + c.icon + '</span>' +
        '<span class="cc-txt">' +
          '<span class="cc-name">' + c.icon + ' ' + esc(c.name) + '</span>' +
          '<span class="cc-line"></span>' +
          '<span class="cc-meta"></span>' +
          '<span class="cc-bar"><i></i></span>' +
        '</span>';
      root.appendChild(x); root.appendChild(badge);
      x.addEventListener('click', function (e) { e.stopPropagation(); setHidden(true); });
      badge.addEventListener('click', function () { openPanel(persKey); });
      paint(persKey);
    }

    function paint(persKey) {
      var c = CAST[persKey]; if (!c) return;
      var d = daysLeft(), p = progress(), pct = Math.round(p * 100), done = p >= 1;
      var ico = root.querySelector('.cc-ico');
      var line = root.querySelector('.cc-line');
      var meta = root.querySelector('.cc-meta');
      var bar = root.querySelector('.cc-bar i');
      if (!line) return;
      if (done) {
        line.textContent = 'You did it — I can stop chasing now. 🎉';
        if (meta) meta.textContent = '100% · ' + esc(label);
        if (ico) { ico.classList.remove('go'); ico.style.setProperty('--ccg', hexToGlow(c.accent, 0.4)); ico.style.removeProperty('--ccs'); }
      } else {
        line.textContent = c.line(d, total);
        if (meta) meta.textContent = (d <= 0 ? 'Overdue' : dayWord(d) + ' left') + ' · ' + pct + '%';
        if (ico) {
          ico.classList.add('go');
          // SPEED UP as the deadline nears: 2.5s (lots of time) -> 0.5s (almost out)
          ico.style.setProperty('--ccs', (0.5 + 2.0 * fracLeft()).toFixed(2) + 's');
          // glow intensifies near the end / overdue (frozen under reduced-motion)
          var heat = REDUCE ? 0.4 : (d <= 0 ? 0.85 : (0.3 + (1 - fracLeft()) * 0.55));
          ico.style.setProperty('--ccg', hexToGlow(c.accent, heat));
        }
      }
      if (bar) bar.style.width = pct + '%';
    }

    function openPanel(persKey) {
      var c = CAST[persKey]; var d = daysLeft(), p = progress(), pct = Math.round(p * 100);
      var existing = root.querySelector('.cc-pop'); if (existing) { existing.remove(); return; }
      var pop = document.createElement('div');
      pop.className = 'cc-pop'; pop.style.setProperty('--cc', c.accent);
      pop.innerHTML =
        '<h4>' + c.icon + ' ' + esc(c.name) + ' is chasing you</h4>' +
        '<p class="sub">Here\'s exactly why.</p>' +
        '<div class="row">🎯 <span>You\'re building <b>' + esc(label) + '</b>.</span></div>' +
        '<div class="row">⏳ <span>' + (d <= 0 ? 'Your <b>' + total + '-day</b> clock has run out — but it\'s never too late.' : '<b>' + dayWord(d) + '</b> left of your <b>' + total + '-day</b> run.') + '</span></div>' +
        '<div class="row">📈 <span>You\'re <b>' + pct + '%</b> there.</span></div>' +
        '<div class="cc-why">“' + esc(c.why) + '”</div>' +
        '<div class="cc-actions">' +
          '<button class="cc-btn go" data-a="close">Keep going</button>' +
          '<button class="cc-btn" data-a="change">Change my chaser</button>' +
          '<button class="cc-btn" data-a="off">Turn me off</button>' +
        '</div>';
      root.appendChild(pop);
      pop.querySelector('[data-a="close"]').addEventListener('click', function () { pop.remove(); });
      pop.querySelector('[data-a="change"]').addEventListener('click', function () { del(K.pers); render(); });
      pop.querySelector('[data-a="off"]').addEventListener('click', function () { setHidden(true); });
    }

    showDot.addEventListener('click', function () { setHidden(false); });

    // --- heartbeat ---
    function tick() {
      var pers = get(K.pers);
      if (get(K.hidden) !== '1' && pers && CAST[pers]) paint(pers);
    }
    timer = setInterval(tick, 3000);
    window.addEventListener('focus', tick);

    var instance = {
      destroy: function () {
        if (timer) clearInterval(timer);
        window.removeEventListener('focus', tick);
        root.remove(); showDot.remove();
        delete ATTACHED[id];
      }
    };
    ATTACHED[id] = instance;
    return instance;
  }

  // ---------- helpers ----------
  function dayWord(n) { return n + (Math.abs(n) === 1 ? ' day' : ' days'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]; }); }
  function hexToGlow(hex, a) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return 'rgba(232,181,77,' + a + ')';
    return 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',' + (+a).toFixed(2) + ')';
  }
  // today's local-midnight timestamp (stable per calendar day)
  function stampToday() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(); }

  // built-in progress reader for the North Star journeys (avg of Workshop + Destiny)
  function northStarProgress() {
    var w = 0, d = 0;
    try { var ws = parseInt(localStorage.getItem('ns-workshop-step'), 10); var wm = (window.NS_STEPS ? window.NS_STEPS.length : 12) - 1; if (!isNaN(ws) && wm > 0) w = ws / wm; } catch (e) {}
    try { var dd = parseInt(localStorage.getItem('dd-step'), 10); var dm = (window.DD_QUESTIONS ? window.DD_QUESTIONS.length + 2 : 32) - 1; if (!isNaN(dd) && dm > 0) d = dd / dm; } catch (e) {}
    return Math.max(0, Math.min(1, (w + d) / 2));
  }

  window.CultureChaser = { attach: attach, northStarProgress: northStarProgress, CAST: CAST, ORDER: ORDER };
})();
