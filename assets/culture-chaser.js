/* Culture Chaser v1.2 — a reusable "we're chasing you" accountability mascot.
   Drop it on any KPI / Dingo card / Dingo Caller. First appearance asks the person to
   "Pick my personality — I dare you" (a cast of 5). It then chases them to a deadline:
   a blatant line + a countdown that VISIBLY speeds up near the end, per-personality
   motion, occasional spoken "speech bubbles" (banter), an optional VOICE (browser
   speech, OFF by default), and a click-for-"why" panel. Self-relative, opt-out always,
   choice = consent. Emoji placeholders until real art. Dependency-free, reduced-motion safe.

   Usage:  CultureChaser.attach({ id:'north-star', label:'your North Star',
                                  deadlineDays:90, progress: CultureChaser.northStarProgress });
*/
(function () {
  'use strict';
  if (window.CultureChaser) return;
  var DAY = 86400000;
  var COUNT = 0, ATTACHED = {};
  var REDUCE = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ---------- the cast of 5 (name/icon/colour, the badge line, the "why", banter quips, voice tuning) ----------
  var CAST = {
    dash: {
      name: 'The Dash', icon: '🏃', accent: '#e8b54d', vox: { rate: 1.32, pitch: 1.25 },
      tagline: 'Cheeky, fast, on your side — the lovable menace.',
      line: function (d, t) { return d <= 0 ? "Clock's out — but it's never too late. Let's go." : 'Day ' + (t - d + 1) + ' of ' + t + " — I'm gaining. Catch me if you can."; },
      why: "I'm the friendly chase. People finish what's chasing them — so I chase. And I speed up the closer we get to the line. You don't have to win… but I might catch you.",
      quips: function (d, t, p) { return [
        "Still here? I've lapped you twice. " + dayWord(d) + " left.",
        p + "% done. I believe in you. Mostly.",
        "Tick tock, slowpoke — " + dayWord(d) + " on the clock.",
        "I run, you scroll. We are not the same.",
        "Your North Star called. Straight to voicemail. Again."
      ]; }
    },
    boo: {
      name: 'The Boogeyman', icon: '👹', accent: '#a78bfa', vox: { rate: 0.82, pitch: 0.4 },
      tagline: 'Ominous, relentless, never sleeps.',
      line: function (d, t) { return d <= 0 ? 'The clock ran out. I am still here. Begin again.' : 'Day ' + (t - d + 1) + '. Tick… tick… I never stop.'; },
      why: 'I am the deadline made real. I do not rest, and I am right behind you. The closer the end, the faster I come. Move.',
      quips: function (d, t, p) { return [
        dayWord(d) + " left… I can wait. I'm very patient.",
        "I live under your unfinished to-do list.",
        "Boo. Also: " + p + "%. Disappointing.",
        "Every day you skip… I get a little stronger.",
        "I'll be in your notifications. And your dreams."
      ]; }
    },
    buddy: {
      name: 'Buddy', icon: '🐤', accent: '#f5d36b', vox: { rate: 1.0, pitch: 1.6 },
      tagline: 'Warm, gentle, quietly cheering you on.',
      line: function (d, t) { return d <= 0 ? 'No clock between us — just take one little step today?' : "It's been a bit — want to take one step today?"; },
      why: "I'm not here to scare you. I just don't want you to miss this. One small step today is plenty — and I'll be right here.",
      quips: function (d, t, p) { return [
        "Hi! No pressure… but maybe one tiny step? 💛",
        "You're at " + p + "%! I'm so proud already.",
        dayWord(d) + " left — we've got this, together.",
        "I made you a cheer. It's just me, peeping. Peep!",
        "Even one answer today would make my whole week."
      ]; }
    },
    coach: {
      name: 'Coach', icon: '📣', accent: '#f59e0b', vox: { rate: 1.16, pitch: 1.0 },
      tagline: 'Motivating, believes in you, wants the win.',
      line: function (d, t) { return d <= 0 ? "Clock's done — champions just restart. Let's move!" : dayWord(d) + " on the clock — you've got this. Let's move!"; },
      why: "My whole job is to get your best out of you before the buzzer. Eyes up — let's put points on the board. I get louder near the end.",
      quips: function (d, t, p) { return [
        dayWord(d) + " on the clock — let's PUT ONE ON THE BOARD.",
        p + "%?! That's momentum — don't you dare stop now.",
        "Champions show up tired. Suit up.",
        "I didn't drive all this way to watch you quit.",
        "Water break's over. Back on the field."
      ]; }
    },
    sarge: {
      name: 'Sarge', icon: '🎖️', accent: '#ef6a5a', vox: { rate: 1.0, pitch: 0.6 },
      tagline: 'Tough love. No excuses. Expects more.',
      line: function (d, t) { return d <= 0 ? 'Time is up, recruit. Reset and go again. MOVE.' : 'Day ' + (t - d + 1) + '. ' + dayWord(d) + ' left. No excuses — move it!'; },
      why: 'I push because I expect more from you than you do right now. Discipline today, pride tomorrow. I close in fast at the end — so get after it.',
      quips: function (d, t, p) { return [
        "Day " + (t - d + 1) + ". " + dayWord(d) + " left. Move it, recruit.",
        p + "%? My grandmother climbs faster. No excuses.",
        "You don't get tired. You get finished.",
        "Drop and give me a North Star.",
        "I've seen better effort from a screensaver."
      ]; }
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
      // per-personality "chasing" motion — bolder, each speeds up near the deadline via --ccs
      '@keyframes cc-dash{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}' +
      '@keyframes cc-boo{0%,100%{transform:translateY(0) scale(1);opacity:.68}50%{transform:translateY(-6px) scale(1.13);opacity:1}}' +
      '@keyframes cc-buddy{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}' +
      '@keyframes cc-coach{0%,100%{transform:translateY(0) rotate(-10deg)}50%{transform:translateY(-7px) rotate(10deg)}}' +
      '@keyframes cc-sarge{0%{transform:translateX(-8px) rotate(-3deg)}50%{transform:translateX(8px) rotate(3deg)}100%{transform:translateX(-8px) rotate(-3deg)}}' +
      '.cc-ico.go{animation:cc-run var(--ccs,2.4s) ease-in-out infinite}' +
      '.cc-ico.go.cc-dash{animation-name:cc-dash;animation-timing-function:cubic-bezier(.2,.85,.2,1)}' +
      '.cc-ico.go.cc-boo{animation-name:cc-boo}' +
      '.cc-ico.go.cc-buddy{animation-name:cc-buddy}' +
      '.cc-ico.go.cc-coach{animation-name:cc-coach}' +
      '.cc-ico.go.cc-sarge{animation-name:cc-sarge}' +
      '.cc-txt{min-width:0}' +
      '.cc-name{font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--cc,#e8b54d)}' +
      '.cc-line{font-size:11.5px;font-weight:600;color:#dbe7f2;line-height:1.25;overflow:hidden}' +
      '.cc-meta{font-size:10px;color:#8aa0b4;margin-top:1px}' +
      '.cc-x{position:absolute;top:-8px;right:-8px;width:20px;height:20px;line-height:18px;border-radius:50%;text-align:center;' +
      'background:rgba(7,11,16,.92);border:1px solid #20303f;color:#9fb1c1;font-size:12px;cursor:pointer;display:block;z-index:2}' +
      '@media (hover:hover){.cc-x{display:none}.cc:hover .cc-x{display:block}}' +
      '.cc-v{position:absolute;top:-8px;left:-8px;width:22px;height:22px;line-height:20px;border-radius:50%;text-align:center;' +
      'background:rgba(7,11,16,.95);border:1px solid #20303f;font-size:12px;cursor:pointer;z-index:2}' +
      // speech bubble (banter)
      '.cc-bubble{position:absolute;bottom:100%;left:0;margin-bottom:9px;max-width:250px;background:rgba(9,13,19,.97);' +
      'border:1px solid #2a3b4d;border-left:3px solid var(--cc,#e8b54d);border-radius:13px 13px 13px 4px;padding:8px 11px;' +
      'font-size:12px;line-height:1.4;color:#e8eef5;box-shadow:0 10px 30px rgba(0,0,0,.5);opacity:0;transform:translateY(6px);' +
      'transition:opacity .35s ease,transform .35s ease;pointer-events:none}' +
      '.cc-bubble.show{opacity:1;transform:translateY(0)}' +
      // chooser + why-panel popover
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
      '@media (prefers-reduced-motion:reduce){.cc-ico{animation:none!important}}' +
      '@media (pointer:coarse){.cc-x{width:34px;height:34px;line-height:32px;font-size:15px}.cc-v{width:34px;height:34px;line-height:32px;font-size:15px}.cc-show{width:44px;height:44px;line-height:42px;font-size:20px}}' +
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
    if (ATTACHED[id]) return ATTACHED[id];
    var total = opts.deadlineDays || 90;
    var label = opts.label || 'your goal';
    var allowed = (opts.allowed && opts.allowed.length) ? opts.allowed.filter(function (k) { return CAST[k]; }) : ORDER.slice();
    var def = opts.defaultPersonality && CAST[opts.defaultPersonality] ? opts.defaultPersonality : allowed[0];
    var progress = typeof opts.progress === 'function' ? opts.progress : function () { return 0; };
    var K = { start: 'cc-start-' + id, pers: 'cc-pers-' + id, hidden: 'cc-hidden-' + id, voice: 'cc-voice-' + id };

    injectStyles();

    var startMs = parseInt(get(K.start), 10);
    if (isNaN(startMs)) { startMs = stampToday(); set(K.start, String(startMs)); }

    var idx = COUNT++, offY = idx * 84;
    var root = document.createElement('div');
    root.className = 'cc';
    if (offY) root.style.bottom = (18 + offY) + 'px';
    var showDot = document.createElement('div');
    showDot.className = 'cc-show'; showDot.title = 'Bring back my Culture Chaser'; showDot.textContent = '🏁';
    showDot.style.display = 'none';
    if (offY) showDot.style.bottom = (14 + offY) + 'px';

    var timer = null, banter = null;

    function mount() {
      var host = document.body || document.documentElement;
      host.appendChild(root); host.appendChild(showDot);
      if (get(K.hidden) === '1') { setHidden(true); } else { render(); }
      tick();
    }
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

    function daysLeft() { return total - Math.floor((stampToday() - startMs) / DAY); }
    function fracLeft() { var d = daysLeft(); return Math.max(0, Math.min(1, d / total)); }

    function setHidden(h) {
      set(K.hidden, h ? '1' : '0');
      root.style.display = h ? 'none' : '';
      showDot.style.display = h ? 'block' : 'none';
      if (h) { clearTimeout(banter); try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
      else render();
    }

    function render() {
      var pers = get(K.pers);
      if (!pers || !CAST[pers]) renderChooser(); else renderBadge(pers);
    }

    function renderChooser() {
      clearTimeout(banter);
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
      clearTimeout(banter);
      root.innerHTML = '';
      var c = CAST[persKey];
      var voiceOn = get(K.voice) === '1';
      var x = document.createElement('div'); x.className = 'cc-x'; x.title = 'Turn off'; x.textContent = '×';
      var v = document.createElement('div'); v.className = 'cc-v'; v.title = 'Voice on/off'; v.textContent = voiceOn ? '🔊' : '🔇';
      var badge = document.createElement('div');
      badge.className = 'cc-badge';
      badge.style.setProperty('--cc', c.accent);
      badge.innerHTML =
        '<span class="cc-ico go cc-' + persKey + '">' + c.icon + '</span>' +
        '<span class="cc-txt">' +
          '<span class="cc-name">' + c.icon + ' ' + esc(c.name) + '</span>' +
          '<span class="cc-line"></span>' +
          '<span class="cc-meta"></span>' +
          '<span class="cc-bar"><i></i></span>' +
        '</span>';
      root.appendChild(x); root.appendChild(v); root.appendChild(badge);
      x.addEventListener('click', function (e) { e.stopPropagation(); setHidden(true); });
      v.addEventListener('click', function (e) {
        e.stopPropagation();
        var on = get(K.voice) !== '1';
        set(K.voice, on ? '1' : '0');
        v.textContent = on ? '🔊' : '🔇';
        if (on) { var q = "Voice on. " + pickQuip(persKey); showBubble(q); speak(q, persKey); }
        else { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (er) {} }
      });
      badge.addEventListener('click', function () { openPanel(persKey); });
      paint(persKey);
      // an instant hello, then ongoing banter
      var hi = pickQuip(persKey);
      setTimeout(function () { if (get(K.pers) === persKey && get(K.hidden) !== '1') { showBubble(hi); if (get(K.voice) === '1') speak(hi, persKey); } }, 900);
      scheduleBanter(persKey);
    }

    function paint(persKey) {
      var c = CAST[persKey]; if (!c) return;
      var d = daysLeft(), p = progress(), pct = Math.round(p * 100), done = p >= 1;
      var ico = root.querySelector('.cc-ico'), line = root.querySelector('.cc-line'),
          meta = root.querySelector('.cc-meta'), bar = root.querySelector('.cc-bar i');
      if (!line) return;
      if (done) {
        line.textContent = 'You did it — I can stop chasing now. 🎉';
        if (meta) meta.textContent = '100% · ' + esc(label);
        if (ico) { ico.classList.remove('go'); ico.style.setProperty('--ccg', hexToGlow(c.accent, 0.4)); ico.style.removeProperty('--ccs'); }
        clearTimeout(banter);
      } else {
        line.textContent = c.line(d, total);
        if (meta) meta.textContent = (d <= 0 ? 'Overdue' : dayWord(d) + ' left') + ' · ' + pct + '%';
        if (ico) {
          ico.classList.add('go');
          ico.style.setProperty('--ccs', (0.5 + 2.0 * fracLeft()).toFixed(2) + 's');
          var heat = REDUCE ? 0.4 : (d <= 0 ? 0.85 : (0.3 + (1 - fracLeft()) * 0.55));
          ico.style.setProperty('--ccg', hexToGlow(c.accent, heat));
        }
      }
      if (bar) bar.style.width = pct + '%';
    }

    // ---------- banter (speech bubbles + optional voice) ----------
    function pickQuip(persKey) {
      var c = CAST[persKey]; if (!c || !c.quips) return '';
      var arr = c.quips(daysLeft(), total, Math.round(progress() * 100));
      return arr[Math.floor(Math.random() * arr.length)] || '';
    }
    function showBubble(text) {
      if (!text || get(K.hidden) === '1') return;
      var b = root.querySelector('.cc-bubble');
      if (!b) { b = document.createElement('div'); b.className = 'cc-bubble'; root.insertBefore(b, root.firstChild); }
      b.textContent = text;
      // reflow so the transition replays
      void b.offsetWidth; b.classList.add('show');
      clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 6500);
    }
    function speak(text, persKey) {
      try {
        if (!('speechSynthesis' in window)) return;
        var clean = String(text).replace(/[^\x00-\x7F]+/g, ' ').trim();   // drop emoji etc.
        if (!clean) return;
        var u = new SpeechSynthesisUtterance(clean);
        var vx = (CAST[persKey] && CAST[persKey].vox) || { rate: 1, pitch: 1 };
        u.rate = vx.rate; u.pitch = vx.pitch; u.volume = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
    function scheduleBanter(persKey) {
      clearTimeout(banter);
      banter = setTimeout(function () {
        if (get(K.hidden) !== '1' && get(K.pers) === persKey && progress() < 1) {
          var q = pickQuip(persKey);
          showBubble(q);
          if (get(K.voice) === '1') speak(q, persKey);
        }
        scheduleBanter(persKey);
      }, 24000 + Math.floor(Math.random() * 22000)); // every ~24–46s
    }

    function openPanel(persKey) {
      var c = CAST[persKey]; var d = daysLeft(), pct = Math.round(progress() * 100);
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
          '<button class="cc-btn" data-a="voice">' + (get(K.voice) === '1' ? '🔊 Voice: on' : '🔇 Voice: off') + '</button>' +
          '<button class="cc-btn" data-a="change">Change my chaser</button>' +
          '<button class="cc-btn" data-a="off">Turn me off</button>' +
        '</div>';
      root.appendChild(pop);
      pop.querySelector('[data-a="close"]').addEventListener('click', function () { pop.remove(); });
      pop.querySelector('[data-a="voice"]').addEventListener('click', function () {
        var on = get(K.voice) !== '1'; set(K.voice, on ? '1' : '0');
        var vb = root.querySelector('.cc-v'); if (vb) vb.textContent = on ? '🔊' : '🔇';
        this.textContent = on ? '🔊 Voice: on' : '🔇 Voice: off';
        if (on) { var q = "Voice on. " + pickQuip(persKey); showBubble(q); speak(q, persKey); }
        else { try { window.speechSynthesis.cancel(); } catch (e) {} }
      });
      pop.querySelector('[data-a="change"]').addEventListener('click', function () { del(K.pers); render(); });
      pop.querySelector('[data-a="off"]').addEventListener('click', function () { setHidden(true); });
    }

    showDot.addEventListener('click', function () { setHidden(false); });

    function tick() {
      var pers = get(K.pers);
      if (get(K.hidden) !== '1' && pers && CAST[pers]) paint(pers);
    }
    timer = setInterval(tick, 3000);
    window.addEventListener('focus', tick);

    var instance = {
      destroy: function () {
        if (timer) clearInterval(timer);
        clearTimeout(banter);
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
  function stampToday() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime(); }

  function northStarProgress() {
    var w = 0, d = 0;
    try { var ws = parseInt(localStorage.getItem('ns-workshop-step'), 10); var wm = (window.NS_STEPS ? window.NS_STEPS.length : 12) - 1; if (!isNaN(ws) && wm > 0) w = ws / wm; } catch (e) {}
    try { var dd = parseInt(localStorage.getItem('dd-step'), 10); var dm = (window.DD_QUESTIONS ? window.DD_QUESTIONS.length + 2 : 32) - 1; if (!isNaN(dd) && dm > 0) d = dd / dm; } catch (e) {}
    return Math.max(0, Math.min(1, (w + d) / 2));
  }

  window.CultureChaser = { attach: attach, northStarProgress: northStarProgress, CAST: CAST, ORDER: ORDER };
})();
