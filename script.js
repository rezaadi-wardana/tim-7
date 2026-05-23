/* =========================================
   PORTFOLIO — script.js
   ========================================= */


// ── NAVBAR SCROLL ──────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ── HAMBURGER / MOBILE MENU ───────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ── SCROLL REVEAL ─────────────────────────
function initReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

initReveal();


// ── ACTIVE NAV LINK (HIGHLIGHT ON SCROLL) ─
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });


// ── SMOOTH SCROLL ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ── BACK TO TOP ───────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.style.opacity = window.scrollY > 400 ? '1' : '0';
  backToTop.style.transform = window.scrollY > 400 ? 'translateY(0)' : 'translateY(10px)';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Init hidden style
backToTop.style.opacity = '0';
backToTop.style.transform = 'translateY(10px)';
backToTop.style.transition = 'opacity 0.35s ease, transform 0.35s ease';


// ── CONTACT FORM ──────────────────────────
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showStatus('⚠️ Harap isi semua bidang.', 'var(--accent-2)');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('⚠️ Format email tidak valid.', 'var(--accent-2)');
    return;
  }

  // Simulasi pengiriman (ganti dengan fetch ke backend / EmailJS / Formspree)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Mengirim...';

  setTimeout(() => {
    showStatus('✅ Pesan terkirim! Saya akan segera menghubungi kamu.', 'var(--accent)');
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Kirim Pesan ✉️';
  }, 1400);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(msg, color) {
  formStatus.textContent = msg;
  formStatus.style.color = color;
  formStatus.style.opacity = '1';
  setTimeout(() => {
    formStatus.style.opacity = '0';
  }, 5000);
}


// ── PROJECT CARD TILT (subtle 3D) ─────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      translateY(-5px)
      perspective(600px)
      rotateY(${x * 6}deg)
      rotateX(${-y * 6}deg)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});


// ── HERO TEXT TYPING EFFECT ───────────────
// Kamu bisa mengaktifkan efek ini jika ingin judul diketik otomatis
// Uncomment kode di bawah jika ingin menggunakannya

/*
const typedLines = ['Creative', 'Developer'];
let lineIndex = 0, charIndex = 0;
const titleLines = document.querySelectorAll('.hero-title .line');

function typeWriter() {
  if (lineIndex >= typedLines.length) return;
  const line = titleLines[lineIndex];
  const text = typedLines[lineIndex];

  if (charIndex < text.length) {
    line.textContent += text[charIndex];
    charIndex++;
    setTimeout(typeWriter, 90);
  } else {
    lineIndex++;
    charIndex = 0;
    if (lineIndex < typedLines.length) {
      setTimeout(typeWriter, 400);
    }
  }
}

// Reset text dan mulai typing
titleLines.forEach(el => el.textContent = '');
setTimeout(typeWriter, 600);
*/


// ── SKILL CARD PROGRESS COUNTER ───────────
// Animasikan angka di stat section
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.textContent.replace(/[0-9]/g, '');

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const statHeadings = document.querySelectorAll('.stat h3');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent;           // e.g. "3+"
      const num = parseInt(raw);
      const suffix = raw.replace(/[0-9]/g, ''); // "+"
      el.textContent = '0' + suffix;
      animateCounter(el, num, 1200);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statHeadings.forEach(el => statObserver.observe(el));


// ── INIT ──────────────────────────────────
console.log('%c🚀 Portofolio loaded!', 'color:#c8a96e;font-size:14px;font-weight:bold;');
