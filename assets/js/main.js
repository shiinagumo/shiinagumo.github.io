(() => {
  const boot = document.getElementById('boot');
  const finishBoot = () => boot?.classList.add('done');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finishBoot();
  else window.setTimeout(finishBoot, 1700);
  document.getElementById('skip-boot')?.addEventListener('click', finishBoot);
  document.getElementById('year').textContent = new Date().getFullYear();
  const clock = document.getElementById('clock');
  const updateClock = () => { clock.textContent = new Date().toLocaleTimeString('en-GB', {hour12:false}); };
  updateClock(); window.setInterval(updateClock, 1000);
  const toggle = document.getElementById('sound-toggle');
  let enabled = false; let audio;
  const beep = () => {
    if (!enabled) return;
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audio.createOscillator(); const gain = audio.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = 520;
      gain.gain.setValueAtTime(.018, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .065);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(); oscillator.stop(audio.currentTime + .065);
    } catch (_) { /* Optional audio may be unavailable. */ }
  };
  toggle?.addEventListener('click', () => {
    enabled = !enabled; toggle.textContent = enabled ? 'SOUND ON' : 'SOUND OFF';
    toggle.setAttribute('aria-pressed', String(enabled)); beep();
  });
  document.querySelectorAll('a').forEach(link => link.addEventListener('click', beep));
})();
