/* Feedback flotante de portales de cliente.
   Uso: <script src="/portal-feedback.js" data-cliente="qhu"></script>
   Manda a POST /api/feedback/<cliente> con la sección visible como contexto. */
(function () {
  var el = document.currentScript;
  var cliente = (el && el.getAttribute('data-cliente')) || '';
  if (!cliente) return;
  var acento = (el && el.getAttribute('data-acento')) || '#4338F0';
  var tinta = (el && el.getAttribute('data-tinta')) || '#0F1633';

  var css = document.createElement('style');
  css.textContent = [
    '.fbw{position:fixed;right:20px;bottom:20px;z-index:9000;font-family:inherit}',
    '.fbw *{box-sizing:border-box}',
    '.fb-btn{display:inline-flex;align-items:center;gap:9px;border:0;cursor:pointer;font:inherit;font-size:13.5px;font-weight:650;',
    'color:#fff;background:' + tinta + ';padding:12px 18px;border-radius:999px;box-shadow:0 8px 26px -8px rgba(15,22,51,.5);',
    'transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s}',
    '.fb-btn:hover{transform:translateY(-2px);box-shadow:0 14px 34px -10px rgba(15,22,51,.55)}',
    '.fb-btn svg{width:16px;height:16px;flex:none}',
    '.fb-panel{position:absolute;right:0;bottom:calc(100% + 12px);width:340px;max-width:calc(100vw - 40px);background:#fff;',
    'border:1px solid rgba(15,22,51,.12);border-radius:14px;box-shadow:0 24px 60px -18px rgba(15,22,51,.4);padding:18px;',
    'opacity:0;transform:translateY(8px) scale(.98);pointer-events:none;transition:opacity .2s,transform .2s}',
    '.fbw.open .fb-panel{opacity:1;transform:none;pointer-events:auto}',
    '.fb-panel h5{margin:0 0 3px;font-size:15px;font-weight:800;letter-spacing:-.02em;color:' + tinta + '}',
    '.fb-panel .sub{margin:0 0 13px;font-size:12.2px;line-height:1.5;color:rgba(15,22,51,.6)}',
    '.fb-ctx{display:inline-block;margin:0 0 11px;font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;',
    'color:' + acento + ';background:rgba(67,56,240,.09);padding:5px 9px;border-radius:999px}',
    '.fb-panel textarea{width:100%;min-height:104px;resize:vertical;font:inherit;font-size:13.5px;line-height:1.55;color:' + tinta + ';',
    'padding:11px 12px;border:1px solid rgba(15,22,51,.16);border-radius:9px;outline:none;background:#fff}',
    '.fb-panel input{width:100%;font:inherit;font-size:13px;color:' + tinta + ';padding:9px 12px;margin-top:8px;',
    'border:1px solid rgba(15,22,51,.16);border-radius:9px;outline:none;background:#fff}',
    '.fb-panel textarea:focus,.fb-panel input:focus{border-color:' + acento + ';box-shadow:0 0 0 3px rgba(67,56,240,.12)}',
    '.fb-send{margin-top:11px;width:100%;border:0;cursor:pointer;font:inherit;font-size:13.5px;font-weight:700;color:#fff;',
    'background:' + acento + ';padding:11px;border-radius:9px;transition:opacity .2s}',
    '.fb-send:hover{opacity:.9}.fb-send:disabled{opacity:.5;cursor:default}',
    '.fb-msg{margin:10px 0 0;font-size:12.4px;line-height:1.5;text-align:center;color:rgba(15,22,51,.65)}',
    '.fb-x{position:absolute;top:11px;right:12px;border:0;background:none;cursor:pointer;font-size:19px;line-height:1;',
    'color:rgba(15,22,51,.35);padding:2px 5px}.fb-x:hover{color:' + tinta + '}',
    '@media(max-width:520px){.fbw{right:14px;bottom:14px}.fb-btn span{display:none}.fb-btn{padding:14px;border-radius:50%}}',
    '@media print{.fbw{display:none}}'
  ].join('');
  document.head.appendChild(css);

  var wrap = document.createElement('div');
  wrap.className = 'fbw';
  wrap.innerHTML =
    '<div class="fb-panel" role="dialog" aria-label="Dejar feedback">' +
      '<button class="fb-x" aria-label="Cerrar">&times;</button>' +
      '<h5>&iquest;Algo para comentar?</h5>' +
      '<p class="sub">Dej&aacute; tu comentario y nos llega directo. Si es sobre una parte puntual, escrib&iacute;lo desde ah&iacute;.</p>' +
      '<span class="fb-ctx" hidden></span>' +
      '<textarea placeholder="Escrib&iacute; ac&aacute;..." aria-label="Comentario"></textarea>' +
      '<input type="text" placeholder="Tu nombre (opcional)" aria-label="Nombre" />' +
      '<button class="fb-send">Enviar</button>' +
      '<p class="fb-msg" hidden></p>' +
    '</div>' +
    '<button class="fb-btn" aria-label="Dejar feedback">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/>' +
      '</svg><span>Feedback</span>' +
    '</button>';
  document.body.appendChild(wrap);

  var btn = wrap.querySelector('.fb-btn'),
      panel = wrap.querySelector('.fb-panel'),
      ta = wrap.querySelector('textarea'),
      nombre = wrap.querySelector('input'),
      send = wrap.querySelector('.fb-send'),
      msg = wrap.querySelector('.fb-msg'),
      ctx = wrap.querySelector('.fb-ctx'),
      cerrar = wrap.querySelector('.fb-x');

  // Sección visible: el último <section id> que pasó el tercio superior.
  var actual = '';
  var secs = [].slice.call(document.querySelectorAll('section[id]'));
  function titulo(s) {
    var h = s.querySelector('h2, h3');
    return h ? h.textContent.trim().replace(/\s+/g, ' ') : s.id;
  }
  function recalc() {
    var best = '';
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].getBoundingClientRect().top <= window.innerHeight * 0.34) best = titulo(secs[i]);
    }
    actual = best;
    ctx.hidden = !actual;
    ctx.textContent = actual;
  }
  if (secs.length) {
    recalc();
    var tick = false;
    var onScroll = function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () { tick = false; recalc(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function abrir(v) {
    wrap.classList.toggle('open', v);
    if (v) { recalc(); setTimeout(function () { ta.focus(); }, 60); }
  }
  btn.addEventListener('click', function () { abrir(!wrap.classList.contains('open')); });
  cerrar.addEventListener('click', function () { abrir(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrir(false); });
  document.addEventListener('click', function (e) {
    if (wrap.classList.contains('open') && !wrap.contains(e.target)) abrir(false);
  });

  function enviar() {
    var texto = ta.value.trim();
    if (!texto) { ta.focus(); return; }
    send.disabled = true;
    send.textContent = 'Enviando...';
    msg.hidden = true;
    fetch('/api/feedback/' + encodeURIComponent(cliente), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mensaje: texto,
        seccion: actual,
        autor: nombre.value.trim(),
        pagina: location.pathname
      })
    }).then(function (r) {
      if (!r.ok) throw new Error();
      return r.json().catch(function () { return {}; });
    }).then(function (d) {
      // 200 con guardado=false y email=false significa que no quedo registrado
      // en ningun lado: no le mentimos al cliente diciendo que llego.
      if (d && d.guardado === false && d.email === false) throw new Error('no persistido');
      ta.value = '';
      send.textContent = 'Enviar';
      send.disabled = false;
      msg.hidden = false;
      msg.textContent = 'Listo, nos llegó. Gracias.';
      setTimeout(function () { abrir(false); msg.hidden = true; }, 1900);
    }).catch(function () {
      send.textContent = 'Enviar';
      send.disabled = false;
      msg.hidden = false;
      msg.textContent = 'No se pudo enviar. Probá de nuevo en un momento.';
    });
  }
  send.addEventListener('click', enviar);
  ta.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') enviar();
  });
})();
