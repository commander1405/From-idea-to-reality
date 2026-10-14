(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const counter = document.getElementById('slide-counter');
  const fill = document.getElementById('progress-fill');
  const title = document.getElementById('progress-title');
  const percent = document.getElementById('progress-percent');
  const fullscreen = document.getElementById('fullscreen');
  const endOverlay = document.getElementById('end-overlay');
  const restart = document.getElementById('restart');
  const labels = ['THE BEGINNING','THE SPARK','THE CHALLENGE','THE BUILD','THE TURNING POINT','DARKKNIGHT STUDIO','OUR PROJECTS','MEGA BOT','THE BEGINNING'];
  let index = 0;
  let animating = false;
  const pad = n => String(n).padStart(2, '0');

  function showSlide(target) {
    if (animating || target < 0 || target >= slides.length || target === index) return;
    animating = true;
    const old = slides[index];
    const incoming = slides[target];
    old.classList.add('leaving');
    old.classList.remove('active');
    incoming.classList.remove('leaving');
    incoming.classList.add('active');
    index = target;
    counter.innerHTML = `${pad(index + 1)} <b>/</b> ${pad(slides.length)}`;
    fill.style.width = `${((index + 1) / slides.length) * 100}%`;
    title.textContent = labels[index];
    percent.textContent = `${Math.round(((index + 1) / slides.length) * 100)}%`;
    prev.disabled = index === 0;
    next.querySelector('small').textContent = index === slides.length - 1 ? 'FINISH' : 'NEXT';
    next.setAttribute('aria-label', index === slides.length - 1 ? 'Finish presentation' : 'Next slide');
    endOverlay.classList.remove('visible');
    endOverlay.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => { old.classList.remove('leaving'); animating = false; }, 680);
  }
  function forward() {
    if (index < slides.length - 1) showSlide(index + 1);
    else { endOverlay.classList.add('visible'); endOverlay.setAttribute('aria-hidden', 'false'); }
  }
  prev.addEventListener('click', () => showSlide(index - 1));
  next.addEventListener('click', forward);
  restart.addEventListener('click', () => { endOverlay.classList.remove('visible'); endOverlay.setAttribute('aria-hidden', 'true'); if (index !== 0) showSlide(0); });
  fullscreen.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (_) { /* Fullscreen may be unavailable in some browsers. */ }
  });
  document.addEventListener('keydown', event => {
    if (['ArrowRight','ArrowDown',' ','PageDown','Enter'].includes(event.key)) {
      if (event.target.closest('a,button')) return;
      event.preventDefault(); forward();
    } else if (['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(event.key)) {
      if (event.target.closest('a,button')) return;
      event.preventDefault(); showSlide(index - 1);
    } else if (event.key === 'Escape') {
      endOverlay.classList.remove('visible'); endOverlay.setAttribute('aria-hidden', 'true');
    }
  });
  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 65) delta < 0 ? forward() : showSlide(index - 1);
  }, { passive: true });
  // Initial state
  prev.disabled = true;
  fill.style.width = `${100 / slides.length}%`;
})();
