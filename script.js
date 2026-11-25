/* =========================================================
   Nizar Zarroug — Portfolio · Vanilla JS
   ========================================================= */

// ---------- Liste des certificats ----------
// Pour afficher l'image d'un certificat : créez un dossier "certificats" à côté de index.html,
// déposez-y l'image, puis écrivez son chemin dans le champ img (ex. img: "certificats/personal-branding.png").
var CERTS = [
  { group: "ENSIT Junior Entreprise", note: "Formations organisées par l'ENSIT Junior Entreprise", items: [
    { title: "Personal Branding", who: "Animée par Tarek Gassa", when: "15/11/2025", img: "" },
    { title: "Project Management", who: "Animée par Hamza Khanchouch", when: "16/11/2025", img: "" },
    { title: "Montage vidéos", who: "Animée par Bahaeddine Farhati", when: "15/11/2025", img: "" },
    { title: "Techniques de négociation", who: "Animée par Wahb Zouid", when: "06/12/2025", img: "" },
    { title: "Sponsoring", who: "Animée par Ala Eddine Ben Yacoub", when: "24/01/2026", img: "" },
    { title: "Qualité", who: "Animée par Mme Zeineb", when: "24/01/2026", img: "" },
    { title: "Comment décrocher un stage d'été (session 1)", who: "Animée par Tarek Gassa", when: "02/04/2026", img: "" },
    { title: "Comment décrocher un stage d'été (session 2)", who: "Animée par Mohamed Farhat Dridi", when: "04/04/2026", img: "" }
  ]},
  { group: "AeroVision ENSIT Club", note: "Club d'aéronautique de l'ENSIT", items: [
    { title: "Certificat d'adhésion – membre actif", who: "AeroVision ENSIT Club", when: "2025/2026", img: "" },
    { title: "Conférence Innov'Aero 1.0", who: "Contribution et implication", when: "", img: "" },
    { title: "Formation DronExperience", who: "Participation et réussite de la formation", when: "", img: "" },
    { title: "Glider Workshop", who: "Participation à l'atelier", when: "", img: "" },
    { title: "Événement « Public Speaking »", who: "Formateur : Mohamed Néji Kasraoui", when: "", img: "" }
  ]},
  { group: "IEEE ENSIT SBJC (IAS / IES / PES)", note: "Branche étudiante IEEE de l'ENSIT", items: [
    { title: "Machine Predictive Maintenance Classification Workshop (Session 2)", who: "Présenté par Hadj Sassi Mahdi · Certificate of Recognition", when: "", img: "" },
    { title: "Pitch Perfect : From Idea to Impact", who: "Présenté par Molka Wesleti · Certificate of Appreciation", when: "", img: "" }
  ]},
  { group: "Certification", note: "", items: [
    { title: "CSWA – Certified SolidWorks Associate", who: "Certification en conception 3D", when: "", img: "" }
  ]}
];

(function(){
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Petit utilitaire de création d'éléments
  function el(tag, cls, text){
    var n = document.createElement(tag);
    if(cls){ n.className = cls; }
    if(text){ n.textContent = text; }
    return n;
  }
  function icon(id, cls){
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('class', 'icon' + (cls ? ' ' + cls : ''));
    s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS(ns, 'use');
    u.setAttribute('href', '#' + id);
    s.appendChild(u);
    return s;
  }

  // ---------- Certificats : rendu + filtres ----------
  var GROUP_ICONS = ['i-users', 'i-plane', 'i-cog', 'i-award'];
  var box = document.getElementById('cert-container');
  var filters = document.getElementById('cert-filters');
  var total = 0;

  CERTS.forEach(function(g, gi){
    var wrap = el('div', 'cert-group');
    wrap.dataset.group = String(gi);

    var head = el('div', 'cert-group-head');
    head.appendChild(el('h3', '', g.group));
    if(g.note){ head.appendChild(el('span', 'meta', g.note)); }
    wrap.appendChild(head);

    var grid = el('div', 'cert-grid');
    g.items.forEach(function(c, ci){
      var card = el('div', 'card cert spotlight reveal');
      card.style.setProperty('--d', Math.min(ci, 6) * 60 + 'ms');
      var ico = el('span', 'cert-ico'); ico.appendChild(icon(GROUP_ICONS[gi] || 'i-award')); card.appendChild(ico);
      card.appendChild(el('h4', '', c.title));
      if(c.when){ card.appendChild(el('div', 'when', c.when)); }
      if(c.who){ card.appendChild(el('div', 'who', c.who)); }
      if(c.img){
        var a = el('a', '', 'Voir le certificat');
        a.href = c.img; a.target = '_blank'; a.rel = 'noopener';
        a.appendChild(icon('i-arrow'));
        card.appendChild(a);
      }
      grid.appendChild(card);
    });
    total += g.items.length;
    wrap.appendChild(grid);
    box.appendChild(wrap);
  });

  function makeFilter(label, value, count, active){
    var b = el('button', 'filter' + (active ? ' active' : ''), label);
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', active ? 'true' : 'false');
    b.dataset.filter = value;
    b.appendChild(el('span', 'count', String(count)));
    filters.appendChild(b);
  }
  makeFilter('Tous', 'all', total, true);
  CERTS.forEach(function(g, gi){ makeFilter(g.group, String(gi), g.items.length, false); });

  filters.addEventListener('click', function(e){
    var b = e.target.closest('.filter');
    if(!b){ return; }
    filters.querySelectorAll('.filter').forEach(function(f){
      var on = f === b;
      f.classList.toggle('active', on);
      f.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    var v = b.dataset.filter;
    box.querySelectorAll('.cert-group').forEach(function(g){
      var show = v === 'all' || g.dataset.group === v;
      g.hidden = !show;
      if(show){
        g.querySelectorAll('.reveal').forEach(function(c){
          c.classList.remove('show'); void c.offsetWidth; c.classList.add('show');
        });
      }
    });
  });

  var certCount = document.getElementById('cert-count');
  certCount.dataset.count = String(total);
  certCount.textContent = String(total);

  // ---------- Année dans le pied de page ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Thème clair / sombre (mémorisé si possible) ----------
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function syncThemeColor(){
    if(themeMeta){ themeMeta.setAttribute('content', root.getAttribute('data-theme') === 'light' ? '#f5f7fb' : '#07090f'); }
  }
  syncThemeColor();
  document.getElementById('theme').addEventListener('click', function(){
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    syncThemeColor();
    try{ localStorage.setItem('theme', next); }catch(e){}
  });

  // ---------- Menu mobile ----------
  var menu = document.getElementById('menu');
  var burger = document.getElementById('burger');
  function setMenu(open){
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  burger.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function(e){ if(e.target.closest('a')){ setMenu(false); } });
  document.addEventListener('click', function(e){
    if(menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)){ setMenu(false); }
  });

  // ---------- Compteurs animés ----------
  function countUp(node, target, suffix){
    if(reduceMotion){ node.textContent = target + (suffix || ''); return; }
    var start = null, dur = 1200;
    function step(t){
      if(!start){ start = t; }
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * eased) + (suffix || '');
      if(p < 1){ requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }

  // ---------- Apparition au défilement + barres de compétences ----------
  function onVisible(target){
    target.classList.add('show');
    target.querySelectorAll('.bar i').forEach(function(b){ b.style.width = b.dataset.w + '%'; });
    target.querySelectorAll('.pct[data-pct]').forEach(function(p){ countUp(p, +p.dataset.pct, '%'); });
    target.querySelectorAll('[data-count]').forEach(function(c){ countUp(c, +c.dataset.count); });
  }
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ onVisible(en.target); io.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(n){ io.observe(n); });
  } else {
    revealEls.forEach(onVisible);
  }

  // ---------- Défilement : en-tête, progression, lien actif, retour en haut ----------
  var header = document.getElementById('header');
  var progress = document.getElementById('progress');
  var toTop = document.getElementById('to-top');
  var sections = document.querySelectorAll('main section[id]');
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  var ticking = false;

  function onScroll(){
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 10);
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    toTop.classList.toggle('show', y > 700);

    var probe = y + window.innerHeight * .35, current = '';
    sections.forEach(function(s){ if(s.offsetTop <= probe){ current = s.id; } });
    if(y + window.innerHeight >= document.documentElement.scrollHeight - 4){ current = 'contact'; }
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if(!ticking){ ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // ---------- Effet « spotlight » sur les cartes ----------
  var finePointer = window.matchMedia && matchMedia('(pointer: fine)').matches;
  if(finePointer){
    document.addEventListener('pointermove', function(e){
      var card = e.target.closest && e.target.closest('.spotlight');
      if(!card){ return; }
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });

    // Légère inclinaison 3D du portrait
    var portrait = document.getElementById('portrait');
    if(portrait && !reduceMotion){
      portrait.addEventListener('pointermove', function(e){
        var r = portrait.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        portrait.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
        portrait.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
      });
      portrait.addEventListener('pointerleave', function(){
        portrait.style.setProperty('--rx', '0deg');
        portrait.style.setProperty('--ry', '0deg');
      });
    }
  }

  // ---------- Copier l'e-mail ----------
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg){
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2200);
  }
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.dataset.copy;
      function done(){ showToast('Adresse e-mail copiée'); }
      if(navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(text).then(done, function(){ fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  });
  function fallbackCopy(text){
    var ta = el('textarea'); ta.value = text; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    document.body.removeChild(ta);
  }

  // ---------- Visionneuse d'image ----------
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox.querySelector('img');
  var lastFocus = null;
  function openLightbox(img){
    lastFocus = document.activeElement;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.getElementById('lightbox-close').focus();
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if(lastFocus){ lastFocus.focus(); }
  }
  document.querySelectorAll('[data-lightbox]').forEach(function(fig){
    var img = fig.querySelector('img');
    fig.addEventListener('click', function(){ openLightbox(img); });
    fig.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openLightbox(img); }
    });
  });
  lightbox.addEventListener('click', function(e){ if(e.target !== lbImg){ closeLightbox(); } });

  // ---------- Touche Échap ----------
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape'){ return; }
    if(lightbox.classList.contains('open')){ closeLightbox(); }
    if(menu.classList.contains('open')){ setMenu(false); burger.focus(); }
  });
})();
