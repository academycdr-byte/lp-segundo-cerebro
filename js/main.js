/* ============================================
   SEGUNDO CEREBRO COM IA - Landing Page JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Countdown Timer ---
  const liveDate = new Date('2026-04-18T20:00:00-03:00');

  function updateCountdown() {
    const now = new Date();
    const diff = liveDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      document.querySelector('.countdown-label').textContent = 'A LIVE COMECOU!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if wasn't active)
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // --- GSAP ScrollTrigger Animations ---
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    const cards = section.querySelectorAll('.secret-card, .benefit-item, .audience-card, .faq-item');
    const content = section.querySelectorAll('.solution-content, .problem-grid, .hero-content');

    if (header) {
      gsap.from(header, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true
        }
      });
    }

    if (cards.length > 0) {
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 85%',
          once: true
        }
      });
    }

    if (content.length > 0) {
      content.forEach(el => {
        gsap.from(el, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        });
      });
    }
  });

  // Hero animation (immediate, no scroll trigger)
  gsap.from('.hero .badge', { opacity: 0, y: 20, duration: 0.5, delay: 0.2, ease: 'power2.out' });
  gsap.from('.hero h1', { opacity: 0, y: 30, duration: 0.7, delay: 0.4, ease: 'power2.out' });
  gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.6, delay: 0.6, ease: 'power2.out' });
  gsap.from('.hero .btn-cta', { opacity: 0, y: 20, duration: 0.6, delay: 0.8, ease: 'power2.out' });
  gsap.from('.hero-proof', { opacity: 0, duration: 0.6, delay: 1, ease: 'power2.out' });

  // CTA final section
  gsap.from('.section-cta-final .badge', {
    opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
    scrollTrigger: { trigger: '.section-cta-final', start: 'top 80%', once: true }
  });
  gsap.from('.section-cta-final h2', {
    opacity: 0, y: 30, duration: 0.7, delay: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: '.section-cta-final', start: 'top 80%', once: true }
  });
  gsap.from('.section-cta-final .cta-sub', {
    opacity: 0, y: 20, duration: 0.6, delay: 0.3, ease: 'power2.out',
    scrollTrigger: { trigger: '.section-cta-final', start: 'top 80%', once: true }
  });
  gsap.from('.section-cta-final .btn-cta', {
    opacity: 0, scale: 0.9, duration: 0.6, delay: 0.45, ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.section-cta-final', start: 'top 80%', once: true }
  });


  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#checkout') return; // Let checkout links work normally
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // --- UTM capture (for future use) ---
  const params = new URLSearchParams(window.location.search);
  const utmData = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
    const val = params.get(key);
    if (val) utmData[key] = val;
  });

  // Store UTMs in sessionStorage for checkout tracking
  if (Object.keys(utmData).length > 0) {
    sessionStorage.setItem('utm_data', JSON.stringify(utmData));
  }

  // Append UTMs to checkout links
  document.querySelectorAll('a[href="#checkout"]').forEach(link => {
    if (Object.keys(utmData).length > 0) {
      const checkoutUrl = new URL(link.href);
      Object.entries(utmData).forEach(([key, val]) => {
        checkoutUrl.searchParams.set(key, val);
      });
      // When real checkout URL is set, UTMs will be appended
    }
  });

});
