// =============================================================
// DarkRoot Organizations — vanilla JS, no framework, no build step.
// Reads all content from window CONFIG (js/config.js).
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCursor();
  initNav();
  initHero();
  initAbout();
  initDepartments();
  initProjects();
  initTeam();
  initTechStack();
  initGallery();
  initCareers();
  initFaq();
  initContact();
  initFooter();
  initScrollReveal();
  initScrollProgress();
  initTilt();
  initHeroScene();
  initMapCanvas();
});

const DEPT_ICONS = {
  brain: 'fa-solid fa-brain', code: 'fa-solid fa-code', globe: 'fa-solid fa-globe',
  mobile: 'fa-solid fa-mobile-screen', shield: 'fa-solid fa-shield-halved', cloud: 'fa-solid fa-cloud',
  layout: 'fa-solid fa-swatchbook', terminal: 'fa-solid fa-terminal', cpu: 'fa-solid fa-microchip',
  link: 'fa-solid fa-link',
};

/* =============================================================
   LOADING SCREEN
============================================================= */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const fill = document.getElementById('loading-bar-fill');
  const percent = document.getElementById('loading-percent');
  const start = performance.now();
  const duration = 1500;

  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    fill.style.width = `${p * 100}%`;
    percent.textContent = `INITIALIZING · ${Math.round(p * 100)}%`;
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => {
        screen.classList.add('hidden');
        setTimeout(() => screen.remove(), 600);
      }, 200);
    }
  }
  requestAnimationFrame(tick);
}

/* =============================================================
   CUSTOM CURSOR
============================================================= */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  const pos = { x: 0, y: 0 };
  const glowPos = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
    const target = e.target.closest('a, button, [role="button"], input, textarea, select');
    glow.classList.toggle('pointer', !!target);
  });

  function loop() {
    glowPos.x += (pos.x - glowPos.x) * 0.16;
    glowPos.y += (pos.y - glowPos.y) * 0.16;
    glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* =============================================================
   NAVBAR
============================================================= */
function initNav() {
  const navLinks = document.getElementById('nav-links');
  const mobileMenu = document.getElementById('mobile-menu');
  navLinks.innerHTML = CONFIG.nav.map((l) => `<li><a href="${l.href}" data-href="${l.href}">${l.label}</a></li>`).join('');
  mobileMenu.innerHTML = CONFIG.nav.map((l) => `<a href="${l.href}">${l.label}</a>`).join('');

  const toggle = document.getElementById('menu-toggle');
  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
    })
  );

  const sections = CONFIG.nav.map((l) => document.querySelector(l.href)).filter(Boolean);
  const linkEls = navLinks.querySelectorAll('a');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          linkEls.forEach((a) => a.classList.toggle('active', a.dataset.href === `#${entry.target.id}`));
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}

/* =============================================================
   SCROLL PROGRESS
============================================================= */
function initScrollProgress() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${docHeight > 0 ? (scrollTop / docHeight) * 100 : 0}%`;
    },
    { passive: true }
  );
}

/* =============================================================
   SCROLL REVEAL
============================================================= */
function initScrollReveal() {
  document.querySelectorAll('.reveal').forEach((el) => observeReveal(el));
}

function observeReveal(el, delayMs) {
  el.classList.add('reveal');
  if (delayMs) el.style.transitionDelay = `${delayMs}ms`;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  observer.observe(el);
}

/* =============================================================
   3D TILT (vanilla, no library)
============================================================= */
function initTilt() {
  document.body.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.dept-card, .team-card, .project-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  });
  document.body.addEventListener('mouseleave', (e) => {
    const card = e.target.closest && e.target.closest('.dept-card, .team-card, .project-card');
    if (card) card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  }, true);
}

/* =============================================================
   HERO
============================================================= */
function initHero() {
  const titleEl = document.getElementById('hero-title');
  titleEl.innerHTML = CONFIG.hero.titleLines.map((line, i) => `<span class="${i === 1 ? 'text-gradient' : ''}">${line}</span>`).join('');
  document.getElementById('hero-subtitle').textContent = CONFIG.hero.subtitle;

  const icons = ['fa-solid fa-microchip', 'fa-solid fa-code', 'fa-solid fa-shield-halved', 'fa-solid fa-cloud', 'fa-solid fa-brain'];
  const container = document.getElementById('floating-icons');
  container.innerHTML = icons
    .map((icon, i) => {
      const top = 10 + Math.random() * 70;
      const left = 5 + Math.random() * 90;
      const delay = i * 0.6;
      const size = 18 + Math.random() * 14;
      return `<i class="floating-icon ${icon}" style="top:${top}%; left:${left}%; font-size:${size}px; animation-delay:${delay}s;"></i>`;
    })
    .join('');

  document.querySelectorAll('.hero-actions .btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => (btn.style.transform = 'translate(0,0)'));
  });
}

/* =============================================================
   ABOUT
============================================================= */
function initAbout() {
  document.getElementById('about-mission').textContent = CONFIG.about.mission;
  document.getElementById('about-vision').textContent = CONFIG.about.vision;

  document.getElementById('values-grid').innerHTML = CONFIG.about.values
    .map((v) => `<div class="glass value-card reveal"><h3>${v.title}</h3><p>${v.text}</p></div>`)
    .join('');
  document.querySelectorAll('#values-grid .reveal').forEach((el, i) => observeReveal(el, i * 80));

  document.getElementById('about-timeline-items').innerHTML = CONFIG.about.timeline
    .map(
      (t) => `
    <div class="timeline-entry glass reveal">
      <span class="timeline-year">${t.year}</span>
      <p class="year">${t.year}</p>
      <p>${t.text}</p>
    </div>`
    )
    .join('');
  document.querySelectorAll('#about-timeline-items .reveal').forEach((el, i) => observeReveal(el, i * 80));

  const progress = document.getElementById('about-timeline-progress');
  const wrap = document.querySelector('#about .timeline-line');
  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progress.style.height = '100%';
          lineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  lineObserver.observe(wrap);

  const statsGrid = document.getElementById('about-stats');
  statsGrid.innerHTML = CONFIG.about.stats
    .map(
      (s, i) => `<div class="glass stat-card reveal" style="transition-delay:${i * 60}ms"><div class="stat-value text-gradient" data-value="${s.value}" data-suffix="${s.suffix}">0</div><div class="stat-label">${s.label}</div></div>`
    )
    .join('');
  statsGrid.querySelectorAll('.reveal').forEach((el) => observeReveal(el));

  const counters = statsGrid.querySelectorAll('.stat-value');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  counters.forEach((c) => counterObserver.observe(c));
}

function animateCounter(el) {
  const value = Number(el.dataset.value);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = Math.floor(p * value) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = value + suffix;
  }
  requestAnimationFrame(tick);
}

/* =============================================================
   DEPARTMENTS
============================================================= */
function initDepartments() {
  const grid = document.getElementById('dept-grid');
  grid.innerHTML = CONFIG.departments
    .map(
      (d, i) => `
    <div class="glass dept-card reveal" style="transition-delay:${(i % 3) * 80}ms">
      <div class="dept-burst"></div>
      <div class="dept-icon"><i class="${DEPT_ICONS[d.icon] || 'fa-solid fa-star'}"></i></div>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
    </div>`
    )
    .join('');
  grid.querySelectorAll('.reveal').forEach((el) => observeReveal(el));
}

/* =============================================================
   PROJECTS
============================================================= */
function initProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = CONFIG.projects
    .map(
      (p, i) => `
    <div class="glass project-card reveal" data-id="${p.id}" style="transition-delay:${(i % 2) * 100}ms">
      <div class="project-thumb">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="project-overlay"><span class="tag">${p.tags[0]}</span></div>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-actions">
          <a href="${p.demo}" target="_blank" rel="noreferrer" class="btn btn-primary" onclick="event.stopPropagation()"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
          <a href="${p.github}" target="_blank" rel="noreferrer" class="btn btn-outline" onclick="event.stopPropagation()"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
      </div>
    </div>`
    )
    .join('');
  grid.querySelectorAll('.reveal').forEach((el) => observeReveal(el));
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card.dataset.id));
  });
}

function openProjectModal(id) {
  const project = CONFIG.projects.find((p) => p.id === id);
  if (!project) return;
  document.getElementById('modal-image').src = project.image;
  document.getElementById('modal-image').alt = project.title;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  document.getElementById('modal-tags').innerHTML = project.tags.map((t) => `<span class="tag">${t}</span>`).join('');
  document.getElementById('modal-demo').href = project.demo;
  document.getElementById('modal-github').href = project.github;
  document.getElementById('project-modal').classList.add('open');
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'modal-close' || e.target.id === 'project-modal') {
    document.getElementById('project-modal').classList.remove('open');
  }
});

/* =============================================================
   TEAM
============================================================= */
function initTeam() {
  const grid = document.getElementById('team-grid');
  grid.innerHTML = CONFIG.team
    .map(
      (m, i) => `
    <div class="glass team-card reveal" style="transition-delay:${(i % 3) * 90}ms">
      <div class="team-photo"><img src="${m.photo}" alt="${m.name}" loading="lazy" /></div>
      <div class="team-body">
        <h3>${m.name}</h3>
        <p class="team-role">${m.role}</p>
        <div class="team-skills">
          ${m.skills
            .map(
              (s) => `
            <div>
              <div class="skill-bar-label"><span>${s.n}</span><span>${s.v}%</span></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" data-target="${s.v}"></div></div>
            </div>`
            )
            .join('')}
        </div>
        <div class="team-socials">
          <a href="${m.socials.github}" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          <a href="${m.socials.linkedin}" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
          <a href="${m.socials.x}" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
        </div>
      </div>
    </div>`
    )
    .join('');
  grid.querySelectorAll('.reveal').forEach((el) => observeReveal(el));

  const bars = grid.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.target}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => observer.observe(b));
}

/* =============================================================
   TECH STACK
============================================================= */
function initTechStack() {
  document.getElementById('tech-grid').innerHTML = CONFIG.techStack
    .map((t, i) => `<div class="glass tech-chip reveal" style="transition-delay:${(i % 8) * 40}ms">${t}</div>`)
    .join('');
  document.querySelectorAll('#tech-grid .reveal').forEach((el) => observeReveal(el));
}

/* =============================================================
   GALLERY
============================================================= */
function initGallery() {
  document.getElementById('gallery-grid').innerHTML = CONFIG.gallery
    .map(
      (img, i) => `
    <div class="gallery-item reveal" style="transition-delay:${(i % 4) * 70}ms">
      <img src="${img}" alt="DarkRoot gallery image ${i + 1}" loading="lazy" />
      <div class="gallery-shine"></div>
    </div>`
    )
    .join('');
  document.querySelectorAll('#gallery-grid .reveal').forEach((el) => observeReveal(el));
}

/* =============================================================
   CAREERS
============================================================= */
function initCareers() {
  document.getElementById('careers-intro').textContent = CONFIG.careers.intro;

  const emailNote = document.getElementById('apply-email-note');
  if (emailNote) {
    emailNote.textContent = CONFIG.brand.email;
    emailNote.href = `mailto:${CONFIG.brand.email}`;
  }

  document.getElementById('careers-steps').innerHTML = CONFIG.careers.timeline
    .map((s) => `<div class="careers-step"><span class="step-num">${s.step.split('.')[0]}</span><div><strong style="font-family:var(--font-accent); font-size:0.9rem;">${s.step.split('. ')[1]}</strong><p>${s.text}</p></div></div>`)
    .join('');

  document.getElementById('careers-benefits').innerHTML = CONFIG.careers.benefits
    .map((b) => `<div class="glass benefit-chip"><i class="fa-solid fa-check" style="color:var(--blue); margin-right:8px;"></i>${b}</div>`)
    .join('');

  document.getElementById('positions-list').innerHTML = CONFIG.careers.openPositions
    .map(
      (p, i) => `
    <div class="glass position-card reveal" style="transition-delay:${i * 70}ms">
      <h4>${p.title}</h4>
      <p class="position-type">${p.type}</p>
      <p>${p.description}</p>
      <a href="#apply-form" class="btn btn-outline apply-link" data-role="${p.title}">Apply</a>
    </div>`
    )
    .join('');
  document.querySelectorAll('#positions-list .reveal').forEach((el) => observeReveal(el));

  const roleSelect = document.getElementById('apply-role');
  CONFIG.careers.openPositions.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.title;
    opt.textContent = p.title;
    roleSelect.appendChild(opt);
  });

  document.querySelectorAll('.apply-link').forEach((link) => {
    link.addEventListener('click', () => {
      roleSelect.value = link.dataset.role;
    });
  });

  // Floating labels for apply form
  ['name', 'email', 'message'].forEach((key) => {
    const field = document.getElementById(`field-apply-${key}`);
    const input = document.getElementById(`apply-${key}`);
    input.addEventListener('focus', () => field.classList.add('active'));
    input.addEventListener('blur', () => field.classList.toggle('active', input.value.length > 0));
  });

  const applyForm = document.getElementById('apply-form');
  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = applyForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting…';
    submitBtn.disabled = true;

    fetch('https://formspree.io/f/xlgyvrpe', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(applyForm),
    })
      .then((res) => {
        if (res.ok) {
          document.getElementById('apply-success').classList.add('show');
          applyForm.reset();
          setTimeout(() => document.getElementById('apply-success').classList.remove('show'), 4000);
        } else {
          alert('Something went wrong submitting your application. Please try again.');
        }
      })
      .catch(() => {
        alert('Network error — please check your connection and try again.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

/* =============================================================
   FAQ
============================================================= */
function initFaq() {
  const list = document.getElementById('faq-list');
  list.innerHTML = CONFIG.faq
    .map(
      (item, i) => `
    <div class="glass faq-item reveal ${i === 0 ? 'open' : ''}" style="transition-delay:${i * 60}ms">
      <button class="faq-question">
        <span>${item.q}</span>
        <span class="faq-chevron"><i class="fa-solid fa-chevron-down"></i></span>
      </button>
      <div class="faq-answer"><p>${item.a}</p></div>
    </div>`
    )
    .join('');
  list.querySelectorAll('.reveal').forEach((el) => observeReveal(el));
  list.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
  });
}

/* =============================================================
   CONTACT
============================================================= */
function initContact() {
  const { brand } = CONFIG;
  const emailEl = document.getElementById('contact-email');
  emailEl.textContent = brand.email;
  emailEl.href = `mailto:${brand.email}`;
  document.getElementById('contact-discord').href = brand.discord;
  document.getElementById('contact-github').href = brand.github;
  document.getElementById('contact-linkedin').href = brand.linkedin;
  document.getElementById('contact-location').textContent = brand.location;

  ['name', 'email', 'message'].forEach((key) => {
    const field = document.getElementById(`field-${key}`);
    const input = document.getElementById(`input-${key}`);
    input.addEventListener('focus', () => field.classList.add('active'));
    input.addEventListener('blur', () => field.classList.toggle('active', input.value.length > 0));
  });

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-name');
    const email = document.getElementById('input-email');
    const message = document.getElementById('input-message');
    let valid = true;

    function setError(key, msg) {
      const field = document.getElementById(`field-${key}`);
      const errorEl = document.getElementById(`error-${key}`);
      if (msg) {
        field.classList.add('error');
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
        valid = false;
      } else {
        field.classList.remove('error');
        errorEl.style.display = 'none';
      }
    }

    setError('name', name.value.trim() ? '' : 'Please enter your name.');
    setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Enter a valid email.');
    setError('message', message.value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.');

    if (!valid) return;

    // Submits to your Formspree endpoint.
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    fetch('https://formspree.io/f/xlgyvrpe', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
      .then((res) => {
        if (res.ok) {
          document.getElementById('form-success').classList.add('show');
          form.reset();
          ['name', 'email', 'message'].forEach((key) => document.getElementById(`field-${key}`).classList.remove('active'));
          setTimeout(() => document.getElementById('form-success').classList.remove('show'), 4000);
        } else {
          setError('message', 'Something went wrong sending your message. Please try again.');
        }
      })
      .catch(() => {
        setError('message', 'Network error — please check your connection and try again.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

/* =============================================================
   FOOTER
============================================================= */
function initFooter() {
  document.getElementById('footer-links').innerHTML = CONFIG.nav.map((l) => `<li style="display:inline;"><a href="${l.href}">${l.label}</a></li>`).join('');
  document.getElementById('footer-socials').innerHTML = `
    <a href="${CONFIG.brand.github}" target="_blank" rel="noreferrer" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
    <a href="${CONFIG.brand.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
    <a href="${CONFIG.brand.discord}" target="_blank" rel="noreferrer" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
    <a href="mailto:${CONFIG.brand.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
  `;
  document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${CONFIG.brand.fullName}. Built with vanilla HTML, CSS & JS.`;

  document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.getElementById('newsletter-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletter-input');
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    const btn = e.target;
    const original = btn.textContent;
    btn.textContent = 'Subscribing…';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'New newsletter signup — DarkRoot');

    fetch('https://formspree.io/f/xlgyvrpe', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((res) => {
        btn.textContent = res.ok ? 'Subscribed ✓' : 'Try again';
        if (res.ok) input.value = '';
      })
      .catch(() => {
        btn.textContent = 'Try again';
      })
      .finally(() => {
        btn.disabled = false;
        setTimeout(() => (btn.textContent = original), 2500);
      });
  });
}

/* =============================================================
   CONTACT MAP CANVAS — simple animated node-map (no external map API/key needed)
============================================================= */
function initMapCanvas() {
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;

  function resize() {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const nodes = Array.from({ length: 24 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1 + Math.random() * 2,
    speed: 0.0003 + Math.random() * 0.0006,
    phase: Math.random() * Math.PI * 2,
  }));

  function draw(time) {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0c0c10';
    ctx.fillRect(0, 0, w, h);

    // grid lines
    ctx.strokeStyle = 'rgba(0,229,255,0.06)';
    for (let x = 0; x < w; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // connections
    ctx.strokeStyle = 'rgba(124,58,237,0.25)';
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }
    }

    // nodes (pulsing)
    nodes.forEach((n) => {
      const pulse = 0.6 + 0.4 * Math.sin(time * n.speed * 10 + n.phase);
      ctx.beginPath();
      ctx.arc(n.x * w, n.y * h, n.r * pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,229,255,0.8)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* =============================================================
   3D HERO SCENE (three.js via CDN — neural network core)
============================================================= */
function initHeroScene() {
  function start() {
    if (typeof THREE === 'undefined') {
      setTimeout(start, 200);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0x404060, 1.2));
    const light1 = new THREE.PointLight(0x00e5ff, 3, 22);
    light1.position.set(4, 4, 4);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x7c3aed, 2.6, 22);
    light2.position.set(-4, -2, -3);
    scene.add(light2);

    const group = new THREE.Group();
    scene.add(group);

    // Neural network: nodes + connecting edges
    const nodeCount = 60;
    const nodePositions = [];
    const nodeGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 1.2 });

    for (let i = 0; i < nodeCount; i++) {
      const r = 1.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const pos = new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
      nodePositions.push(pos);
      const mesh = new THREE.Mesh(nodeGeo, i % 4 === 0 ? new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: 1.2 }) : nodeMat);
      mesh.position.copy(pos);
      group.add(mesh);
    }

    // Connect nearby nodes with faint lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.18 });
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.1 && Math.random() > 0.75) {
          const geometry = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]]);
          group.add(new THREE.Line(geometry, lineMat));
        }
      }
    }

    // Core sphere
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.6, 2),
      new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 1.6, wireframe: true, roughness: 0.2, metalness: 0.6 })
    );
    group.add(core);

    // Particle field
    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0x9d8dff, size: 0.018, transparent: true, opacity: 0.5, depthWrite: false });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();
    function animate() {
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.06 + mouse.x * 0.35;
      group.rotation.x = mouse.y * 0.2;
      particles.rotation.y = t * 0.012;
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.02;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  start();
}
