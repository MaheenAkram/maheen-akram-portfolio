/* ==========================================
   Maheen Akram — Portfolio Script
   ========================================== */

(function () {
  'use strict';

  // ===== LOADER =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('done');
    }, 900);
  });

  // ===== TYPOING EFFECT =====
  const titles = [
    'Frontend Web Developer',
    'Android App Developer',
    'Generative AI Enthusiast'
  ];
  const typingEl = document.getElementById('typing-text');
  let tIndex = 0, cIndex = 0, isDeleting = false, delay = 100;

  function typeLoop() {
    const cur = titles[tIndex];
    if (isDeleting) {
      typingEl.textContent = cur.substring(0, cIndex - 1);
      cIndex--;
      delay = 45;
    } else {
      typingEl.textContent = cur.substring(0, cIndex + 1);
      cIndex++;
      delay = 100;
    }
    if (!isDeleting && cIndex === cur.length) {
      isDeleting = true; delay = 2200;
    } else if (isDeleting && cIndex === 0) {
      isDeleting = false; tIndex = (tIndex + 1) % titles.length; delay = 500;
    }
    setTimeout(typeLoop, delay);
  }
  setTimeout(typeLoop, 700);

  // ===== NAVBAR SCROLL =====
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ===== MOBILE NAV =====
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  toggle.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
  });
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobile.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    mobile.setAttribute('aria-hidden', 'true');
  }));

  // ===== CURSOR GLOW =====
  const glow = document.getElementById('cursor-glow');
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.classList.add('active');
  }, { passive: true });
  document.addEventListener('mouseleave', () => glow.classList.remove('active'), { passive: true });

  // ===== PARTICLE CANVAS =====
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const count = Math.min(Math.floor(window.innerWidth / 15), 70);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(64,208,255,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(64,208,255,${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== PROGRESS BARS ANIMATE =====
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.getAttribute('data-width');
        entry.target.style.width = w + '%';
        fillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.fill').forEach(el => fillObserver.observe(el));

  // ===== MAGNETIC BUTTONS =====
  document.querySelectorAll('.btn-primary, .btn-glass').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
      btn.style.transition = 'transform 0.3s ease';
    });
  });

  // ===== SMOOTH SCROLL OFFSET =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

})();