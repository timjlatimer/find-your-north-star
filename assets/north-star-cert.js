/* North Star keepsake — auto-generated from design workflow wf_cfdd0c44. Template + generator. */
window.NS_CERT_TEMPLATE = "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n<title>{{NAME}} — My North Star</title>\n<meta name=\"description\" content=\"A letter from {{NAME}} to their future self — their North Star, in their own words.\">\n<meta name=\"robots\" content=\"noindex, nofollow\">\n<style>\n  :root{\n    --ink:#eaf1f7; --muted:#9fb1c1; --soft:#6f8295;\n    --gold:#e8b54d; --gold-deep:#c9912f; --gold-soft:rgba(232,181,77,.35);\n    --cyan:#74a6ff; --teal:#36c2b4; --violet:#c9a0ff;\n    --line:#20303f; --panel:#0f1620; --panel2:#0b1219;\n    --serif:Georgia,\"Times New Roman\",serif;\n    --sans:\"Segoe UI\",system-ui,-apple-system,Roboto,sans-serif;\n  }\n  *{box-sizing:border-box}\n  html,body{margin:0;padding:0}\n  body{\n    font-family:var(--sans);\n    color:var(--ink);\n    background:radial-gradient(1200px 800px at 50% 12%, #0e1726, #070b10 60%, #04060a);\n    background-attachment:fixed;\n    min-height:100vh;\n    line-height:1.65;\n    -webkit-font-smoothing:antialiased;\n    text-rendering:optimizeLegibility;\n  }\n\n  /* ---------- toolbar (screen only) ---------- */\n  .toolbar{\n    position:sticky; top:0; z-index:50;\n    display:flex; gap:10px; justify-content:center; flex-wrap:wrap;\n    padding:12px 16px;\n    background:linear-gradient(180deg, rgba(7,11,16,.94), rgba(7,11,16,.6) 72%, transparent);\n    backdrop-filter:blur(7px);\n  }\n  .tb-btn{\n    appearance:none; cursor:pointer;\n    font-family:var(--sans); font-size:15px; font-weight:600; letter-spacing:.2px;\n    padding:12px 20px; min-height:46px; border-radius:999px;\n    border:1px solid var(--gold-deep);\n    color:#1a1206;\n    background:linear-gradient(180deg,#f4cf76,var(--gold) 56%,var(--gold-deep));\n    box-shadow:0 6px 18px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.45);\n    transition:transform .12s ease, filter .12s ease;\n  }\n  .tb-btn:hover{filter:brightness(1.05)}\n  .tb-btn:active{transform:translateY(1px)}\n  .tb-btn.ghost{\n    color:var(--ink); background:rgba(255,255,255,.03);\n    border:1px solid var(--line); box-shadow:none;\n  }\n  .tb-btn.ghost:hover{border-color:var(--gold-soft)}\n  .tb-hint{\n    flex-basis:100%; text-align:center; color:var(--soft);\n    font-size:12.5px; margin-top:2px;\n  }\n\n  /* ---------- the letter sheet (gold double-frame) ---------- */\n  .wrap{padding:8px 14px 70px; display:flex; justify-content:center}\n  .cert{\n    width:100%; max-width:720px;\n    position:relative;\n    background:\n      radial-gradient(120% 70% at 50% 0%, rgba(232,181,77,.05), transparent 60%),\n      linear-gradient(180deg,var(--panel),var(--panel2));\n    border:1px solid var(--gold-soft);\n    border-radius:18px;\n    padding:34px 24px 44px;\n    box-shadow:\n      0 30px 80px rgba(0,0,0,.55),\n      0 0 60px rgba(232,181,77,.04) inset;\n  }\n  /* inner hairline gold frame (Proclamation graft) */\n  .cert::before{\n    content:\"\"; position:absolute; inset:12px;\n    border:1px solid var(--gold-soft);\n    border-radius:12px;\n    pointer-events:none;\n    box-shadow:0 0 0 1px rgba(0,0,0,.3) inset;\n  }\n  .sheet{position:relative; z-index:1}\n\n  /* corner flourishes (Proclamation graft) */\n  .corner{position:absolute; width:26px; height:26px; opacity:.85; z-index:2; pointer-events:none}\n  .corner svg{display:block; width:100%; height:100%}\n  .corner.tl{top:18px; left:18px}\n  .corner.tr{top:18px; right:18px; transform:scaleX(-1)}\n  .corner.bl{bottom:18px; left:18px; transform:scaleY(-1)}\n  .corner.br{bottom:18px; right:18px; transform:scale(-1,-1)}\n\n  /* ---------- hero (real rendered art + crest halo) ---------- */\n  .hero{text-align:center; margin:8px auto 4px; position:relative}\n  .hero .halo{\n    content:\"\"; position:absolute; left:50%; top:46%;\n    width:min(78%,360px); aspect-ratio:1/1;\n    transform:translate(-50%,-50%);\n    background:radial-gradient(circle at 50% 50%, rgba(232,181,77,.26), transparent 62%);\n    filter:blur(10px); z-index:0; pointer-events:none;\n  }\n  .hero img{\n    position:relative; z-index:1;\n    display:block; width:min(78%,360px); height:auto; margin:0 auto;\n    filter:drop-shadow(0 10px 38px rgba(232,181,77,.28));\n    user-select:none;\n  }\n  .eyebrow{\n    margin:14px 0 0;\n    font-size:12.5px; letter-spacing:.32em; text-transform:uppercase;\n    color:var(--gold); font-weight:600;\n  }\n  .keepsake-title{\n    font-family:var(--serif); font-weight:400; font-style:italic;\n    font-size:clamp(26px,7vw,38px);\n    color:var(--ink); margin:6px 0 0; line-height:1.2;\n    text-align:center;\n  }\n\n  /* ---------- ★ rule divider ---------- */\n  .rule{\n    display:flex; align-items:center; justify-content:center; gap:14px;\n    margin:26px auto; color:var(--gold);\n  }\n  .rule::before,.rule::after{\n    content:\"\"; height:1px; flex:1; max-width:150px;\n    background:linear-gradient(90deg,transparent,var(--gold-soft),transparent);\n  }\n  .rule .star{font-size:14px; line-height:1; opacity:.95}\n\n  /* ---------- salutation + opening (KEEP from Letter) ---------- */\n  .dear{\n    font-family:var(--serif);\n    font-size:clamp(20px,5.4vw,26px);\n    color:var(--ink); margin:4px 0 14px;\n  }\n  .dear .name{color:var(--gold); font-style:italic}\n  .opening{\n    font-size:clamp(16px,4.4vw,18px);\n    color:var(--muted); margin:0 0 8px;\n  }\n\n  /* ---------- statement: hero screenshot moment (Poster graft) ---------- */\n  .statement-wrap{\n    margin:30px auto;\n    padding:34px 26px;\n    border:1px solid var(--gold-soft);\n    border-radius:18px;\n    background:\n      radial-gradient(420px 240px at 50% 0%, rgba(232,181,77,.10), transparent 70%),\n      linear-gradient(180deg, var(--panel), var(--panel2));\n    box-shadow:0 16px 44px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.03);\n    text-align:center;\n  }\n  .statement-label{\n    font-size:12px; letter-spacing:.3em; text-transform:uppercase;\n    color:var(--gold); font-weight:600; margin:0 0 16px;\n  }\n  .statement{\n    font-family:var(--serif); font-weight:400;\n    font-size:clamp(24px,6.4vw,38px);\n    line-height:1.34; color:var(--ink); margin:0;\n    text-wrap:balance;\n    white-space:pre-wrap; overflow-wrap:anywhere;\n  }\n  .statement::before{content:\"\\201C\"; color:var(--gold); margin-right:.04em}\n  .statement::after{content:\"\\201D\"; color:var(--gold); margin-left:.02em}\n\n  /* ---------- journey scroll (KEEP Letter's left-rule entries) ---------- */\n  .journey-intro{\n    font-family:var(--serif); font-style:italic; text-align:center;\n    color:var(--muted); font-size:clamp(16px,4.4vw,18px); margin:0 0 6px;\n  }\n  .journey{margin:10px auto 0; max-width:620px}\n  .entry{margin:0 0 26px; padding:0 2px}\n  .entry-label{\n    display:flex; align-items:center; gap:9px;\n    font-size:13.5px; letter-spacing:.04em; text-transform:uppercase;\n    color:var(--gold); font-weight:600; margin:0 0 8px;\n  }\n  .entry-label::before{content:\"\\2605\"; font-size:11px; color:var(--gold); opacity:.85}\n  .entry-body{\n    font-size:clamp(16.5px,4.6vw,19px); color:var(--ink); margin:0;\n    padding-left:20px; border-left:2px solid var(--gold-soft);\n    white-space:pre-wrap; overflow-wrap:anywhere;\n  }\n  /* paired-prompt sub-entry variant (core values + the value that cost; legacy sub-lines) */\n  .entry-sub{margin-top:14px}\n  .entry-sub-label{\n    font-size:12.5px; letter-spacing:.04em; text-transform:uppercase;\n    color:var(--soft); font-weight:600; margin:0 0 6px; padding-left:20px;\n  }\n\n  /* ---------- closing (KEEP from Letter) + seal (Proclamation graft) ---------- */\n  .closing{text-align:center; margin:40px auto 0}\n  .closing .vow{\n    font-family:var(--serif); font-style:italic;\n    color:var(--muted); font-size:clamp(16px,4.4vw,18px); margin:0 0 4px;\n  }\n  .seal{margin:22px auto 6px; width:74px; height:74px}\n  .seal svg{width:100%; height:100%; display:block}\n  .sign{\n    font-family:var(--serif);\n    font-size:clamp(20px,5.4vw,26px);\n    color:var(--gold); margin:6px 0 0;\n  }\n  .meta{margin:20px 0 0; font-size:12.5px; color:var(--soft); letter-spacing:.04em}\n  .meta .dateline{color:var(--muted)}\n  .wordmark{\n    margin:8px 0 0; font-size:12px; letter-spacing:.26em; text-transform:uppercase;\n    color:var(--soft);\n  }\n  .wordmark b{color:var(--gold); font-weight:600}\n\n  /* ---------- responsive ---------- */\n  @media (max-width:480px){\n    .cert{padding:26px 15px 32px; border-radius:14px}\n    .cert::before{inset:9px}\n    .corner{width:20px;height:20px}\n    .statement-wrap{padding:28px 18px}\n  }\n\n  /* ---------- print: cream keepsake (gold-deep frame so it prints clean) ---------- */\n  @media print{\n    @page{margin:14mm}\n    .toolbar{display:none !important}\n    .wrap{padding:0}\n    html,body{background:#fffdf6 !important; color:#1d1a12 !important}\n    .cert{\n      max-width:100%; background:#fffdf6 !important;\n      border:2px solid var(--gold-deep); box-shadow:none;\n      border-radius:8px; padding:14mm 12mm; break-inside:auto;\n    }\n    .cert::before{border-color:var(--gold-deep); inset:6mm}\n    .hero .halo{display:none}\n    .hero img{filter:none; width:min(56%,280px)}\n    .eyebrow,.statement-label,.entry-label{color:var(--gold-deep) !important}\n    .keepsake-title,.dear,.statement,.sign{color:#1d1a12 !important}\n    .dear .name,.sign{color:var(--gold-deep) !important}\n    .opening,.journey-intro,.closing .vow,.meta,.wordmark{color:#5b5444 !important}\n    .statement-wrap{\n      background:#fffaf0 !important; border:1px solid var(--gold-deep) !important;\n      box-shadow:none !important; break-inside:avoid;\n      -webkit-print-color-adjust:exact; print-color-adjust:exact;\n    }\n    .statement::before,.statement::after,.entry-label::before{color:var(--gold-deep) !important}\n    .entry-body{color:#1d1a12 !important; border-left:2px solid #d9b65f !important}\n    .rule{color:var(--gold-deep) !important}\n    .rule::before,.rule::after{background:linear-gradient(90deg,transparent,var(--gold-deep),transparent) !important}\n    .corner svg path,.corner svg circle{stroke:var(--gold-deep) !important; fill:var(--gold-deep) !important}\n    .seal svg circle{stroke:var(--gold-deep) !important}\n    .seal svg path{fill:var(--gold-deep) !important}\n    .entry,.statement-wrap{break-inside:avoid}\n    a[href]:after{content:\"\"}\n  }\n</style>\n</head>\n<body>\n\n  <!-- This saved page carries its OWN toolbar (hidden when printing) -->\n  <nav class=\"toolbar\" role=\"toolbar\" aria-label=\"Save or print this page\">\n    <button class=\"tb-btn\" id=\"nsSaveBtn\" type=\"button\">★ Save this page</button>\n    <button class=\"tb-btn ghost\" id=\"nsPrintBtn\" type=\"button\">Print / Save as PDF</button>\n    <div class=\"tb-hint\">This page is yours. Save it to your phone or computer and open it anytime — even offline.</div>\n  </nav>\n\n  <main class=\"wrap\">\n    <article class=\"cert\">\n\n      <!-- corner flourishes -->\n      <span class=\"corner tl\" aria-hidden=\"true\"><svg viewBox=\"0 0 26 26\"><path d=\"M1 25V8C1 4 4 1 8 1h17\" fill=\"none\" stroke=\"#e8b54d\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><circle cx=\"3.2\" cy=\"22.8\" r=\"1.5\" fill=\"#e8b54d\"/></svg></span>\n      <span class=\"corner tr\" aria-hidden=\"true\"><svg viewBox=\"0 0 26 26\"><path d=\"M1 25V8C1 4 4 1 8 1h17\" fill=\"none\" stroke=\"#e8b54d\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><circle cx=\"3.2\" cy=\"22.8\" r=\"1.5\" fill=\"#e8b54d\"/></svg></span>\n      <span class=\"corner bl\" aria-hidden=\"true\"><svg viewBox=\"0 0 26 26\"><path d=\"M1 25V8C1 4 4 1 8 1h17\" fill=\"none\" stroke=\"#e8b54d\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><circle cx=\"3.2\" cy=\"22.8\" r=\"1.5\" fill=\"#e8b54d\"/></svg></span>\n      <span class=\"corner br\" aria-hidden=\"true\"><svg viewBox=\"0 0 26 26\"><path d=\"M1 25V8C1 4 4 1 8 1h17\" fill=\"none\" stroke=\"#e8b54d\" stroke-width=\"1.4\" stroke-linecap=\"round\"/><circle cx=\"3.2\" cy=\"22.8\" r=\"1.5\" fill=\"#e8b54d\"/></svg></span>\n\n      <div class=\"sheet\">\n\n        <!-- HERO: real rendered art + crest halo -->\n        <section class=\"hero\">\n          <span class=\"halo\" aria-hidden=\"true\"></span>\n          <img src=\"{{HERO_SRC}}\" alt=\"A luminous gold cosmic compass-star rising over softly lit clouds — a North Star.\"\n               onerror=\"if(this.src.indexOf('http')!==0){this.src='https://timjlatimer.github.io/find-your-north-star/assets/img/ns-celebration-stars.webp';}\">\n          <p class=\"eyebrow\">My North Star</p>\n          <h1 class=\"keepsake-title\">A Letter to Myself</h1>\n        </section>\n\n        <div class=\"rule\" aria-hidden=\"true\"><span class=\"star\">&#9733;</span></div>\n\n        <!-- SALUTATION + OPENING (Letter soul) -->\n        <p class=\"dear\">Dear <span class=\"name\">{{NAME}}</span>,</p>\n        <p class=\"opening\">On the day I found the words, this is what I knew to be true about my life and the difference I am here to make. I am writing it down so that on the hard days, I can find my way back.</p>\n\n        <!-- STATEMENT: the single biggest screenshot moment -->\n        <div class=\"statement-wrap\">\n          <p class=\"statement-label\">This is my North Star</p>\n          <p class=\"statement\">{{STATEMENT}}</p>\n        </div>\n\n        <div class=\"rule\" aria-hidden=\"true\"><span class=\"star\">&#9733;</span></div>\n\n        <p class=\"journey-intro\">And here is how I came to know it &mdash; in my own words.</p>\n\n        <!-- JOURNEY: injected by the generator -->\n        <section class=\"journey\">\n          {{JOURNEY}}\n        </section>\n\n        <div class=\"rule\" aria-hidden=\"true\"><span class=\"star\">&#9733;</span></div>\n\n        <!-- CLOSING + wax seal -->\n        <div class=\"closing\">\n          <p class=\"vow\">I wrote this. I meant it. I will live it.</p>\n          <div class=\"seal\" aria-hidden=\"true\">\n            <svg viewBox=\"0 0 74 74\">\n              <circle cx=\"37\" cy=\"37\" r=\"34\" fill=\"none\" stroke=\"#e8b54d\" stroke-width=\"1\" opacity=\".55\"/>\n              <circle cx=\"37\" cy=\"37\" r=\"29\" fill=\"none\" stroke=\"#e8b54d\" stroke-width=\"1\" opacity=\".9\"/>\n              <path d=\"M37 20l4.2 9.6L51 31l-7 6.6 1.8 9.8L37 42.7 28.2 47.4 30 37.6 23 31l9.8-1.4z\" fill=\"#e8b54d\"/>\n            </svg>\n          </div>\n          <p class=\"sign\">&mdash; {{NAME}}</p>\n          <p class=\"meta\"><span class=\"dateline\">Written {{DATE}}</span></p>\n          <p class=\"wordmark\">Find Your <b>North Star</b> &middot; {{YEAR}}</p>\n        </div>\n\n      </div>\n    </article>\n  </main>\n\n  <script>\n    (function(){\n      var p = document.getElementById('nsPrintBtn');\n      if(p){ p.addEventListener('click', function(){ window.print(); }); }\n\n      // Save THIS page as a self-contained .html file. Single injection point:\n      // the filename is derived from document.title (already HTML-escaped at generation).\n      var s = document.getElementById('nsSaveBtn');\n      if(s){\n        s.addEventListener('click', function(){\n          try{\n            var html = '<!doctype html>\\n' + document.documentElement.outerHTML;\n            var blob = new Blob([html], {type:'text/html;charset=utf-8'});\n            var url = URL.createObjectURL(blob);\n            var a = document.createElement('a');\n            var who = (document.title || 'My North Star')\n                        .replace(/[^a-z0-9]+/gi,'-').replace(/^-+|-+$/g,'');\n            a.href = url;\n            a.download = (who || 'My-North-Star') + '.html';\n            document.body.appendChild(a);\n            a.click();\n            setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(url); }, 1500);\n          }catch(e){\n            alert('To keep this page: use your browser menu and choose “Save page”, or “Print → Save as PDF”. It stays on your device — nothing is uploaded.');\n          }\n        });\n      }\n    })();\n  </script>\n\n</body>\n</html>";

/* ============================================================================
   North Star keepsake generator  —  self-contained, vanilla JS, no libraries.
   Drop this inside the workshop IIFE (it can reference the existing `answers`
   object, or be passed any answers map). Public API:
     buildNorthStarPage(answers) -> Promise<string>   (full self-contained HTML)
     openNorthStarPage(answers)  -> Promise<void>      (opens it in a new tab)
     saveNorthStarPage(answers)  -> Promise<void>      (downloads My-North-Star.html)
   buildNorthStarPage is ASYNC because it base64-inlines the hero image.
   ========================================================================== */
(function (global) {
  'use strict';

  var HERO_URL = 'https://timjlatimer.github.io/find-your-north-star/assets/img/ns-celebration-stars.webp';
  var HERO_LOCAL = 'assets/img/ns-celebration-stars.webp'; // tried first when same-origin

  /* ---- the keepsake template (final_html_template) lives here as a string ---- */
  /* Paste the FULL final_html_template between the backticks below. It must
     contain the placeholders {{NAME}} {{STATEMENT}} {{DATE}} {{HERO_SRC}}
     {{JOURNEY}} {{YEAR}}. Kept as a constant so this file is fully standalone. */
  var TEMPLATE = global.NS_CERT_TEMPLATE || ''; // host sets window.NS_CERT_TEMPLATE = `...`;

  var ENTRY_TPL =
    '<div class="entry">' +
      '<p class="entry-label">{{LABEL}}</p>' +
      '<p class="entry-body">{{WORDS}}</p>' +
    '</div>';

  var ENTRY_PAIRED_TPL =
    '<div class="entry">' +
      '<p class="entry-label">{{LABEL}}</p>' +
      '<p class="entry-body">{{WORDS}}</p>' +
      '<div class="entry-sub">' +
        '<p class="entry-sub-label">{{SUB_LABEL}}</p>' +
        '<p class="entry-body">{{SUB_WORDS}}</p>' +
      '</div>' +
    '</div>';

  /* ---- ORDERED journey list, mapped to the real step field IDs.
         A `sub` makes it a paired entry (rendered with the sub-variant). ---- */
  var JOURNEY = [
    { id:'funeral_family',    label:'What I want said at my funeral — by my family' },
    { id:'funeral_friend',    label:'What I want said at my funeral — by a friend' },
    { id:'funeral_colleague', label:'What I want said at my funeral — by a colleague' },
    { id:'funeral_community', label:'What I want said at my funeral — by my community' },
    { id:'breaks_heart_1',    label:'What breaks my heart' },
    { id:'breaks_heart_2',    label:'The problem I feel called to solve' },
    { id:'alive_activities',  label:'What makes me come alive',
      sub:{ id:'alive_superpower', label:'My superpower' } },
    { id:'values_core',       label:'My core values',
      sub:{ id:'values_test',  label:'A value I held when it cost me' } },
    { id:'legacy_world',      label:'The legacy I want to leave in the world' },
    { id:'legacy_people',     label:'The people I most want to serve' },
    { id:'legacy_statement',  label:'The one thing I want to leave behind' },
    { id:'commitment',        label:'My 30-day commitment' }
  ];

  /* ---- helpers ---- */
  function escHtml(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }
  // escape, then turn newlines into <br> (call ONLY on user free-text)
  function escMultiline(s){
    return escHtml(s).replace(/\r\n|\r|\n/g,'<br>');
  }
  function nonBlank(s){ return s != null && String(s).trim() !== ''; }

  function getNiceDate(){
    // self-contained; "June 27, 2026"
    try{
      return new Date().toLocaleDateString(undefined,
        { year:'numeric', month:'long', day:'numeric' });
    }catch(e){
      return new Date().toDateString();
    }
  }

  /* ---- build the journey HTML from the ordered list ---- */
  function buildJourney(answers){
    var out = [];
    JOURNEY.forEach(function(item){
      var words = answers[item.id];
      if(!nonBlank(words)) return; // skip-if-blank (no orphan labels)

      if(item.sub && nonBlank(answers[item.sub.id])){
        out.push(
          ENTRY_PAIRED_TPL
            .replace('{{LABEL}}', escHtml(item.label))
            .replace('{{WORDS}}', escMultiline(words))
            .replace('{{SUB_LABEL}}', escHtml(item.sub.label))
            .replace('{{SUB_WORDS}}', escMultiline(answers[item.sub.id]))
        );
      } else {
        out.push(
          ENTRY_TPL
            .replace('{{LABEL}}', escHtml(item.label))
            .replace('{{WORDS}}', escMultiline(words))
        );
      }
    });
    return out.join('\n');
  }

  /* ---- build journey HTML from an explicit list (for callers with their own
         data shape, e.g. the 8-minute quick path): [{label, words, subLabel, subWords}] ---- */
  function buildJourneyFromList(list){
    var out = [];
    (list || []).forEach(function(item){
      if(!item || !nonBlank(item.words)) return;
      if(nonBlank(item.subWords)){
        out.push(ENTRY_PAIRED_TPL
          .replace('{{LABEL}}', escHtml(item.label||''))
          .replace('{{WORDS}}', escMultiline(item.words))
          .replace('{{SUB_LABEL}}', escHtml(item.subLabel||''))
          .replace('{{SUB_WORDS}}', escMultiline(item.subWords)));
      } else {
        out.push(ENTRY_TPL
          .replace('{{LABEL}}', escHtml(item.label||''))
          .replace('{{WORDS}}', escMultiline(item.words)));
      }
    });
    return out.join('\n');
  }

  /* ---- resolve hero: try base64 (offline-gorgeous), fall back to hosted URL ---- */
  function fetchAsDataURI(url){
    return fetch(url, { cache:'force-cache' })
      .then(function(r){ if(!r.ok) throw new Error('bad status'); return r.blob(); })
      .then(function(b){
        return new Promise(function(res, rej){
          var fr = new FileReader();
          fr.onload  = function(){ res(fr.result); };
          fr.onerror = function(){ rej(fr.error || new Error('reader')); };
          fr.readAsDataURL(b);
        });
      });
  }
  function resolveHeroSrc(){
    // Prefer the local asset (same origin as the workshop), then the hosted CDN,
    // and finally fall back to the hosted absolute URL if base64 isn't possible.
    return fetchAsDataURI(HERO_LOCAL)
      .catch(function(){ return fetchAsDataURI(HERO_URL); })
      .catch(function(){ return HERO_URL; }); // hosted URL fallback (needs network later)
  }

  /* ---- assemble the full HTML string ---- */
  // We split on the placeholder rather than .replace() so a "$" or "$&" inside the
  // user's statement can never be misread as a regex replacement pattern.
  function inject(tpl, token, value){
    return tpl.split(token).join(value);
  }

  function buildNorthStarPage(answers, opts){
    answers = answers || {};
    var name, statement, journey;
    if(opts && (opts.statement || opts.journey)){
      // explicit override (8-minute quick path supplies its own shape)
      name      = nonBlank(opts.name) ? String(opts.name).trim() : 'Friend';
      statement = opts.statement || '';
      journey   = buildJourneyFromList(opts.journey);
    } else {
      name      = nonBlank(answers.your_name) ? String(answers.your_name).trim() : 'Friend';
      statement = answers.refined_statement || answers.draft_statement || '';
      journey   = buildJourney(answers);
    }
    var date      = getNiceDate();
    var year      = String(new Date().getFullYear());

    if(!TEMPLATE){
      return Promise.reject(new Error('NS_CERT_TEMPLATE is not set. Assign the keepsake HTML to window.NS_CERT_TEMPLATE.'));
    }

    return resolveHeroSrc().then(function(heroSrc){
      var html = TEMPLATE;
      // {{NAME}} appears in <title>, <meta>, salutation, signoff -> escape once, replace all.
      html = inject(html, '{{NAME}}',      escHtml(name));
      html = inject(html, '{{STATEMENT}}', escMultiline(statement));
      html = inject(html, '{{DATE}}',      escHtml(date));
      html = inject(html, '{{YEAR}}',      escHtml(year));
      html = inject(html, '{{HERO_SRC}}',  heroSrc); // data: URI or trusted hosted URL, not user text
      html = inject(html, '{{JOURNEY}}',   journey);  // already-escaped entry markup
      return html;
    });
  }

  /* ---- open in a new tab via Blob URL (with same-tab fallback) ---- */
  function openNorthStarPage(answers, opts){
    return buildNorthStarPage(answers, opts).then(function(html){
      var blob = new Blob([html], { type:'text/html;charset=utf-8' });
      var url  = URL.createObjectURL(blob);
      var w = window.open(url, '_blank');
      if(!w){
        // popup blocked -> navigate the current tab to the keepsake
        location.href = url;
      }
      // revoke later so the new tab finishes loading first
      setTimeout(function(){ URL.revokeObjectURL(url); }, 60000);
    });
  }

  /* ---- download as a self-contained file ---- */
  function saveNorthStarPage(answers, opts){
    return buildNorthStarPage(answers, opts).then(function(html){
      var who = (opts && opts.name) ? String(opts.name) : (answers && answers.your_name ? String(answers.your_name) : 'My-North-Star');
      var name = who.replace(/[^a-z0-9]+/gi,'-').replace(/^-+|-+$/g,'') || 'My-North-Star';
      var blob = new Blob([html], { type:'text/html;charset=utf-8' });
      var url  = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = name + '.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(function(){ a.remove(); URL.revokeObjectURL(url); }, 1500);
    });
  }

  /* ---- export ---- */
  global.buildNorthStarPage = buildNorthStarPage;
  global.openNorthStarPage  = openNorthStarPage;
  global.saveNorthStarPage  = saveNorthStarPage;

})(typeof window !== 'undefined' ? window : this);
