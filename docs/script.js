const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const pre = document.getElementById(targetId);
    if (!pre) return;
    const text = pre.innerText || pre.textContent;
    navigator.clipboard.writeText(text.trim()).then(() => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// Fetch latest release and wire up OS picker
const dlAssets = { win: null, lin: null };

(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/AumGupta/abyss-jellyfin/releases/latest');
    if (!res.ok) return;
    const data = await res.json();
    dlAssets.lin = (data.assets || []).find(a => a.name.endsWith('.sh')) || null;
    dlAssets.win = (data.assets || []).find(a => a.name.endsWith('.exe')) || null;
    // Keep hidden anchors updated for any legacy references
    const btnLin = document.getElementById('download-btn-lin');
    const btnWin = document.getElementById('download-btn-win');
    const lblLin = document.getElementById('download-label-lin');
    const lblWin = document.getElementById('download-label-win');
    if (btnLin && dlAssets.lin) { btnLin.href = dlAssets.lin.browser_download_url; }
    if (btnWin && dlAssets.win) { btnWin.href = dlAssets.win.browser_download_url; }
    if (lblLin && dlAssets.lin) { lblLin.textContent = dlAssets.lin.name; }
    if (lblWin && dlAssets.win) { lblWin.textContent = dlAssets.win.name; }
    // Auto-detect platform and pre-select
    autoSelectOS();
  } catch (e) { }
})();

function autoSelectOS() {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) selectOS('windows');
  else if (ua.includes('Mac')) selectOS('macos');
  else selectOS('linux');
}

function selectOS(os) {
  const btnActive = document.getElementById('download-btn-active');
  const labelActive = document.getElementById('download-label-active');
  const noteActive = document.getElementById('install-note-active');
  if (!btnActive || !labelActive) return;

  document.querySelectorAll('.os-card').forEach(c => {
    c.classList.toggle('active', c.dataset.os === os);
    c.setAttribute('aria-pressed', c.dataset.os === os);
  });

  const isWin = os === 'windows';
  const asset = isWin ? dlAssets.win : dlAssets.lin;
  const fallback = 'https://github.com/AumGupta/abyss-jellyfin/releases/latest';
  const ext = isWin ? '.exe' : '.sh';
  const platform = os === 'windows' ? 'Windows' : os === 'macos' ? 'macOS' : 'Linux';
  const runNote = isWin
    ? 'For Windows &middot; Requires Jellyfin admin credentials'
    : `For ${platform} &middot; Run with: <code>sudo bash ${asset ? asset.name : 'abyss-setup.sh'}</code>`;

  btnActive.href = asset ? asset.browser_download_url : fallback;
  labelActive.textContent = asset ? `Download ${asset.name}` : `Download Installer ${ext}`;
  noteActive.innerHTML = runNote;
}

// OS card click handlers
document.querySelectorAll('.os-card').forEach(card => {
  card.addEventListener('click', () => selectOS(card.dataset.os));
});

// Hamburger menu
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Accent swatch - update code block on click
const swatches = document.querySelectorAll('.swatch');
const accentValEl = document.querySelector('.accent-val');

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    swatches.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-pressed', 'false');
    });
    swatch.classList.add('active');
    swatch.setAttribute('aria-pressed', 'true');

    if (accentValEl) {
      const val = swatch.getAttribute('data-val');
      const rgb = swatch.style.getPropertyValue('--c');
      accentValEl.textContent = val;
      accentValEl.style.color = `rgb(${rgb})`;
      setTimeout(() => { accentValEl.style.color = ''; }, 600);

      const navActive = document.getElementById('prev-nav-active');
      const listIcon = document.getElementById('prev-listitem-icon');
      const playBtn = document.getElementById('prev-play-btn');
      const progress = document.getElementById('prev-card-progress');
      const rgbStr = `rgb(${rgb})`;
      const rgbDim = `rgba(${rgb}, 0.15)`;

      if (navActive) { navActive.style.background = rgbStr; navActive.style.color = '#121212'; }
      if (listIcon) { listIcon.style.background = rgbDim; listIcon.style.color = rgbStr; }
      if (playBtn) { playBtn.style.color = rgbStr; }
      if (progress) { progress.style.background = rgbStr; }
    }
  });
});

// Radius slider
const SNAP_STOPS = [0, 4, 8, 12, 16, 18, 20, 24];
const SNAP_RADIUS = 1.5;

const slider = document.getElementById('radius-slider');
const radiusValEl = document.querySelector('.radius-val');
const radiusDisplay = document.querySelector('.radius-display');
const stopLabels = document.querySelectorAll('.radius-stops span');

function updateRadiusUI(val) {
  const px = `${val}px`;

  if (radiusValEl) radiusValEl.textContent = px;
  if (radiusDisplay) radiusDisplay.textContent = px;
  if (slider) slider.setAttribute('aria-valuenow', val);

  stopLabels.forEach(label => {
    label.classList.toggle('active', parseInt(label.dataset.val) === val);
  });

  if (slider) {
    const pct = (val / 24) * 100;
    slider.style.background = `linear-gradient(to right,
      rgba(245,245,247,0.7) 0%,
      rgba(245,245,247,0.7) ${pct}%,
      rgba(255,255,255,0.08) ${pct}%,
      rgba(255,255,255,0.08) 100%)`;
  }

  const card = document.getElementById('prev-card');
  const playBtn = document.getElementById('prev-play-btn');
  if (card) card.style.borderRadius = px;
  if (playBtn) playBtn.style.borderRadius = px;
}

function snapValue(raw) {
  for (const stop of SNAP_STOPS) {
    if (Math.abs(raw - stop) <= SNAP_RADIUS) return stop;
  }
  return raw;
}

if (slider) {
  slider.addEventListener('input', () => {
    const snapped = snapValue(parseInt(slider.value));
    slider.value = snapped;
    updateRadiusUI(snapped);
  });

  stopLabels.forEach(label => {
    label.addEventListener('click', () => {
      const val = parseInt(label.dataset.val);
      slider.value = val;
      updateRadiusUI(val);
    });
  });

  updateRadiusUI(parseInt(slider.value));
}

// Smooth anchor scroll with fixed nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY + 10;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => {
      const refined = target.getBoundingClientRect().top + window.scrollY + 10;
      if (Math.abs(refined - window.scrollY) > 10) {
        window.scrollTo({ top: refined, behavior: 'smooth' });
      }
    }, 600);
  });
});