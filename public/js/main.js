(function () {
  'use strict';

  const galleryData = [
    {
      category: 'extension',
      cat: 'Extension',
      title: 'Extension de maison individuelle',
      label: 'Villers-Bocage · 2024',
      badge: 'Avant / Après',
      image: '',
      desc: "Agrandissement de 25m² avec fondations, murs porteurs, dalle et toiture."
    },
    {
      category: 'amenagement',
      cat: 'Aménagement',
      title: 'Muret en pierre naturelle',
      label: 'Amiens · 2024',
      badge: '',
      image: '',
      desc: 'Construction d\'un muret en pierre calcaire locale.'
    },
    {
      category: 'renovation',
      cat: 'Rénovation',
      title: 'Réfection de façade ancienne',
      label: 'Albert · 2023',
      badge: 'Avant / Après',
      image: '',
      desc: 'Traitement des fissures et enduit traditionnel à la chaux.'
    },
    {
      category: 'amenagement',
      cat: 'Aménagement',
      title: 'Terrasse béton désactivé',
      label: 'Doullens · 2023',
      badge: '',
      image: '',
      desc: 'Terrasse de 40m² en béton désactivé avec margelles en pierre.'
    },
    {
      category: 'amenagement',
      cat: 'Aménagement',
      title: 'Escalier extérieur en pierre',
      label: 'Somme · 2023',
      badge: '',
      image: '',
      desc: 'Escalier d\'accès en pierre naturelle intégré au terrain.'
    }
  ];

  let currentLbIndex = 0;

  function qs(id) {
    return document.getElementById(id);
  }

  function fillLightboxBg() {
    const bg = qs('lb-bg');
    if (!bg) return;
    bg.innerHTML = '';
    for (let i = 0; i < 40; i += 1) {
      bg.appendChild(document.createElement('div'));
    }
  }

  function updateLightbox() {
    const d = galleryData[currentLbIndex];
    const cat = qs('lb-cat');
    const title = qs('lb-title');
    const desc = qs('lb-desc');
    if (!cat || !title || !desc || !d) return;
    cat.textContent = d.cat;
    title.textContent = d.title;
    desc.textContent = d.desc;
  }

  window.openLightbox = function openLightbox(idx) {
    const lb = qs('lightbox');
    if (!lb) return;
    currentLbIndex = idx;
    updateLightbox();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    fillLightboxBg();
  };

  window.closeLightbox = function closeLightbox() {
    const lb = qs('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.prevLightbox = function prevLightbox() {
    currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
  };

  window.nextLightbox = function nextLightbox() {
    currentLbIndex = (currentLbIndex + 1) % galleryData.length;
    updateLightbox();
  };

  function renderGallery() {
    const gallery = qs('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    galleryData.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.dataset.cat = item.category;
      card.onclick = () => window.openLightbox(idx);

      const imageWrap = document.createElement('div');
      imageWrap.className = 'gallery-img-placeholder';

      if (item.image) {
        const img = document.createElement('img');
        img.className = 'gallery-photo';
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        imageWrap.appendChild(img);
      } else {
        const brick = document.createElement('div');
        brick.className = 'gallery-brick-bg';
        const brickCount = idx === 0 ? 24 : 12;
        for (let i = 0; i < brickCount; i += 1) {
          brick.appendChild(document.createElement('div'));
        }
        imageWrap.appendChild(brick);
      }

      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML = '<div class="gallery-overlay-inner"><div class="gallery-overlay-icon">🔍</div><div class="gallery-overlay-text">Voir le projet</div></div>';

      const label = document.createElement('div');
      label.className = 'gallery-label';
      label.innerHTML = `${item.badge ? `<span class="av-badge">${item.badge}</span>` : ''}<h4>${item.title}</h4><p>${item.label}</p>`;

      imageWrap.appendChild(overlay);
      imageWrap.appendChild(label);
      card.appendChild(imageWrap);
      gallery.appendChild(card);
    });
  }

  window.filterGallery = function filterGallery(cat, btn) {
    document.querySelectorAll('.gallery-filter').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.style.display = cat === 'all' || item.dataset.cat === cat ? '' : 'none';
    });
  };

  window.toggleMenu = function toggleMenu() {
    const navMenu = qs('nav-menu');
    const menuToggle = qs('menu-toggle');
    if (!navMenu) return;
    const isOpen = navMenu.classList.toggle('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  window.acceptRGPD = function acceptRGPD() {
    const b = qs('rgpd-banner');
    if (b) b.style.display = 'none';
    localStorage.setItem('rgpd', 'accepted');
    loadGoogleMap();
  };

  window.refuseRGPD = function refuseRGPD() {
    const b = qs('rgpd-banner');
    if (b) b.style.display = 'none';
    localStorage.setItem('rgpd', 'refused');
  };

  function loadGoogleMap() {
    const placeholder = qs('map-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    const wrap = qs('map-wrap');
    if (!wrap || wrap.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20735.!2d2.3219!3d49.8567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVillers-Bocage%2C%2080260!5e0!3m2!1sfr!2sfr';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = "Zone d'intervention JMD - Bâtissons ensemble vos projets";
    wrap.appendChild(iframe);
  }

  window.submitForm = function submitForm() {
    const nameEl = qs('f-name');
    const telEl = qs('f-tel');
    const emailEl = qs('f-email');
    const typeEl = qs('f-type');
    const msgEl = qs('f-msg');

    const name = nameEl ? String(nameEl.value || '').trim() : '';
    const tel = telEl ? String(telEl.value || '').trim() : '';
    const email = emailEl ? String(emailEl.value || '').trim() : '';
    const type = typeEl ? String(typeEl.value || '').trim() : '';
    const msg = msgEl ? String(msgEl.value || '').trim() : '';

    if (!name || !tel || !msg) {
      alert('Merci de renseigner au minimum votre nom, téléphone et message.');
      return;
    }

    const subject = encodeURIComponent('Demande de devis - JMD - Bâtissons ensemble vos projets');
    const body = encodeURIComponent(`Nom: ${name}\nTéléphone: ${tel}\nE-mail: ${email || '-'}\nType de travaux: ${type || '-'}\n\nProjet:\n${msg}`);
    const mailtoUrl = `mailto:jeanmicheldouay2711@gmail.com?subject=${subject}&body=${body}`;
    const success = qs('form-success');
    const fallback = qs('form-fallback');
    if (success) {
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (fallback) fallback.style.display = 'none';

    // Tentative d'ouverture du client e-mail local.
    window.location.href = mailtoUrl;

    // Si rien ne s'ouvre (pas de client mail configuré), afficher une alternative claire.
    window.setTimeout(() => {
      if (fallback) {
        fallback.style.display = 'block';
      }
    }, 1200);
  };

  function initHeroCarousel() {
    const carousel = qs('hero-carousel');
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const dotsWrap = qs('hero-carousel-dots');
    const prevBtn = qs('hero-prev');
    const nextBtn = qs('hero-next');
    if (!slides.length || !dotsWrap || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let timerId = null;

    function show(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
      dotsWrap.querySelectorAll('.hero-carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    dotsWrap.innerHTML = slides.map((_, i) => `<button class="hero-carousel-dot ${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="Photo ${i + 1}"></button>`).join('');
    dotsWrap.addEventListener('click', (e) => {
      const b = e.target.closest('.hero-carousel-dot');
      if (!b) return;
      show(Number(b.dataset.i));
      restart();
    });

    function restart() {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => show(currentIndex + 1), 4500);
    }

    prevBtn.addEventListener('click', () => { show(currentIndex - 1); restart(); });
    nextBtn.addEventListener('click', () => { show(currentIndex + 1); restart(); });
    carousel.addEventListener('mouseenter', () => timerId && clearInterval(timerId));
    carousel.addEventListener('mouseleave', restart);

    show(0);
    restart();
  }

  function animateCounters() {
    document.querySelectorAll('.counter-num').forEach((el) => {
      if (el.dataset.animated === '1') return;
      const target = parseInt(el.dataset.target || '0', 10);
      el.dataset.animated = '1';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = String(Math.floor(current));
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    initHeroCarousel();

    const lb = qs('lightbox');
    if (lb) {
      lb.addEventListener('click', (e) => {
        if (e.target === lb) window.closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.closeLightbox();
      if (e.key === 'ArrowLeft') window.prevLightbox();
      if (e.key === 'ArrowRight') window.nextLightbox();
    });

    const countersSection = qs('counters');
    if (countersSection && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });
      obs.observe(countersSection);
    } else {
      animateCounters();
    }

    const consent = localStorage.getItem('rgpd');
    if (consent === 'accepted') {
      const b = qs('rgpd-banner');
      if (b) b.style.display = 'none';
      loadGoogleMap();
    } else if (consent === 'refused') {
      const b = qs('rgpd-banner');
      if (b) b.style.display = 'none';
    }

    document.querySelectorAll('#nav-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        const nav = qs('nav-menu');
        const toggle = qs('menu-toggle');
        if (nav) nav.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });

    const menuToggle = qs('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', window.toggleMenu);
    }
  });

  window.addEventListener('scroll', () => {
    const nav = qs('main-nav');
    if (nav) nav.style.height = window.scrollY > 50 ? '64px' : '78px';
    const bar = qs('progress-bar');
    if (!bar) return;
    const winH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${winH > 0 ? (window.scrollY / winH) * 100 : 0}%`;
  }, { passive: true });
})();
