document.addEventListener('DOMContentLoaded', () => {
  const spot = document.getElementById('spot');
  if (spot) {
    window.addEventListener('pointermove', e => {
      spot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
  }

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
      btn.style.transition = 'transform .5s cubic-bezier(.2,1,.3,1)';
    });
    btn.addEventListener('mouseenter', () => { btn.style.transition = 'none'; });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseFloat(el.dataset.val), suf = el.dataset.suf || '';
        let start = null;
        const dur = 1300;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const num = eased * val;
          el.textContent = (Number.isInteger(val) ? Math.round(num) : num.toFixed(1)) + suf;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.counter').forEach(el => io.observe(el));

  const cards = document.querySelectorAll('.stack-card');
  if (cards.length) {
    window.addEventListener('scroll', () => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const nr = next.parentElement.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(Math.max((vh - nr.top) / vh, 0), 1);
        card.style.transform = `scale(${1 - progress * 0.07})`;
        card.style.opacity = 1 - progress * 0.55;
        card.style.filter = `brightness(${1 - progress * 0.5})`;
      });
    }, { passive: true });
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header.nav nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
