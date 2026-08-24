/* Editor en vivo de los portales de cliente.
 *
 * Se activa SOLO con ?edit=1 en la URL. No hay atajo de teclado a proposito:
 * publicar usa la misma clave del portal que tiene el cliente, asi que la
 * proteccion real es que el modo no se descubra por accidente.
 *
 * Como funciona: a cada nodo de texto editable se le asigna una clave estable
 * (seccion + indice + tag). Se guarda {clave: texto} y al cargar la pagina se
 * reaplica con textContent, nunca innerHTML, para que una edicion no pueda
 * inyectar markup.
 */
(function () {
  'use strict';

  var CLIENT = (document.body.getAttribute('data-client') || '').trim();
  var PAGE = (document.body.getAttribute('data-page') || 'dashboard').trim();
  if (!CLIENT) return;

  var API = '/api/page-edits/' + CLIENT + '?page=' + encodeURIComponent(PAGE);
  var LS = 'portal-edits:' + CLIENT + ':' + PAGE;

  // Solo texto plano. Se excluye lo que rompe si se edita (scripts, controles).
  var SEL = 'h1,h2,h3,h4,p,li,td,th,span.t,span.d,div.t,div.d,.note,.st,.tag,.value,.v,.k,.label,.foot';
  var SKIP = 'script,style,button,input,textarea,select,a[href^="/api"],#editBar,#editBar *';

  var edits = {};
  var dirty = {};
  var on = false;
  var nodes = [];

  function eligible(el) {
    if (el.matches(SKIP)) return false;
    if (el.closest('#editBar')) return false;
    if (el.querySelector(SEL)) return false;            // solo hojas, no contenedores
    var t = (el.textContent || '').trim();
    return t.length > 0 && t.length < 4000;
  }

  function keyFor(el, i) {
    var sec = el.closest('section');
    var si = sec ? Array.prototype.indexOf.call(document.querySelectorAll('section'), sec) : -1;
    return 's' + si + ':' + el.tagName.toLowerCase() + ':' + i;
  }

  function collect() {
    nodes = [];
    var all = document.querySelectorAll(SEL);
    Array.prototype.forEach.call(all, function (el) {
      if (eligible(el)) nodes.push(el);
    });
    nodes.forEach(function (el, i) { el.setAttribute('data-ek', keyFor(el, i)); });
  }

  function applyEdits() {
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-ek');
      if (k && Object.prototype.hasOwnProperty.call(edits, k)) el.textContent = edits[k];
    });
  }

  function bar() {
    var b = document.createElement('div');
    b.id = 'editBar';
    b.innerHTML =
      '<span class="lbl">MODO EDICIÓN</span>' +
      '<span class="cnt" id="ebCnt">sin cambios</span>' +
      '<button id="ebSave">Publicar</button>' +
      '<button id="ebRevert">Descartar</button>' +
      '<button id="ebExit">Salir</button>' +
      '<span class="msg" id="ebMsg"></span>';
    document.body.appendChild(b);

    var css = document.createElement('style');
    css.textContent =
      '#editBar{position:fixed;left:0;right:0;bottom:0;z-index:120;display:flex;align-items:center;gap:12px;' +
      'padding:11px 18px;background:#1a1a1a;color:#fff;font-family:inherit;font-size:12.5px;box-shadow:0 -2px 14px rgba(0,0,0,.2)}' +
      '#editBar .lbl{font-size:10px;font-weight:700;letter-spacing:.14em;background:#fff;color:#1a1a1a;padding:3px 8px}' +
      '#editBar .cnt{opacity:.75}' +
      '#editBar button{font-family:inherit;font-size:12px;padding:6px 13px;background:none;border:1px solid rgba(255,255,255,.35);' +
      'color:#fff;cursor:pointer}' +
      '#editBar button:hover{background:rgba(255,255,255,.12)}' +
      '#editBar #ebSave{background:#fff;color:#1a1a1a;border-color:#fff;font-weight:600}' +
      '#editBar .msg{margin-left:auto;opacity:.85}' +
      'body.editing [data-ek]{outline:1px dashed rgba(0,0,0,.22);outline-offset:2px;cursor:text}' +
      'body.editing [data-ek]:hover{outline-color:rgba(0,0,0,.5);background:rgba(255,235,150,.25)}' +
      'body.editing [data-ek]:focus{outline:2px solid #1a1a1a;background:#fff}' +
      'body.editing{padding-bottom:56px}';
    document.head.appendChild(css);

    document.getElementById('ebSave').addEventListener('click', save);
    document.getElementById('ebRevert').addEventListener('click', revert);
    document.getElementById('ebExit').addEventListener('click', function () { setMode(false); });
  }

  function tally() {
    var n = Object.keys(dirty).length;
    var c = document.getElementById('ebCnt');
    if (c) c.textContent = n ? (n + (n === 1 ? ' cambio sin publicar' : ' cambios sin publicar')) : 'sin cambios';
  }

  function msg(t, ms) {
    var m = document.getElementById('ebMsg');
    if (!m) return;
    m.textContent = t;
    if (ms) setTimeout(function () { if (m.textContent === t) m.textContent = ''; }, ms);
  }

  function setMode(v) {
    on = v;
    document.body.classList.toggle('editing', on);
    if (!document.getElementById('editBar') && on) bar();
    var b = document.getElementById('editBar');
    if (b) b.style.display = on ? 'flex' : 'none';
    nodes.forEach(function (el) {
      if (on) {
        el.setAttribute('contenteditable', 'plaintext-only');
        el.setAttribute('spellcheck', 'false');
      } else {
        el.removeAttribute('contenteditable');
      }
    });
    if (on) tally();
  }

  function onInput(e) {
    var el = e.target.closest('[data-ek]');
    if (!el || !on) return;
    var k = el.getAttribute('data-ek');
    dirty[k] = el.textContent;
    tally();
  }

  function save() {
    var merged = {};
    Object.keys(edits).forEach(function (k) { merged[k] = edits[k]; });
    Object.keys(dirty).forEach(function (k) { merged[k] = dirty[k]; });

    msg('Publicando…');
    fetch(API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edits: merged }),
    })
      .then(function (r) {
        if (r.status === 401) throw new Error('Sin permiso: entra al portal con su clave primero.');
        if (r.status === 503) throw new Error('Guardado local: falta configurar el storage.');
        if (!r.ok) throw new Error('No se pudo publicar.');
        return r.json();
      })
      .then(function () {
        edits = merged;
        dirty = {};
        try { localStorage.setItem(LS, JSON.stringify(edits)); } catch (e) {}
        tally();
        msg('Publicado. El cliente ya lo ve.', 4000);
      })
      .catch(function (err) {
        edits = merged;
        dirty = {};
        try { localStorage.setItem(LS, JSON.stringify(edits)); } catch (e) {}
        tally();
        msg(err.message + ' Queda guardado solo en este navegador.', 6000);
      });
  }

  function revert() {
    dirty = {};
    applyEdits();
    // lo que no tenia edicion previa vuelve al texto original del HTML
    location.reload();
  }

  function boot() {
    collect();

    var local = null;
    try { local = JSON.parse(localStorage.getItem(LS)); } catch (e) {}
    if (local && typeof local === 'object') edits = local;
    applyEdits();

    fetch(API, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.edits && Object.keys(d.edits).length) {
          edits = d.edits;
          try { localStorage.setItem(LS, JSON.stringify(edits)); } catch (e) {}
          applyEdits();
        }
      })
      .catch(function () {});

    document.addEventListener('input', onInput, true);
    if (/[?&]edit=1/.test(location.search)) setMode(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
