const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

function toggleMenu() {
  nav.classList.toggle('open');
  nav.classList.toggle('hide');
}

menuBtn.addEventListener('click', toggleMenu);

function handleResize() {
  if (window.innerWidth > 1000) {
    nav.classList.remove('hide');
    nav.classList.remove('open');
  } else {
    nav.classList.add('hide');
  }
}

handleResize();
window.addEventListener('resize', handleResize);

const gallery = document.querySelector('.gallery');

function makeFullSrc(src) {
  if (!src) return src;
  if (src.includes('-sm')) return src.replace('-sm', '-full');
  if (src.includes('-thumb')) return src.replace('-thumb', '-full');
  return src;
}

gallery.addEventListener('click', (event) => {
  const clickedImage = event.target.closest('img');
  if (!clickedImage) return;

  const src = clickedImage.getAttribute('src');
  const alt = clickedImage.getAttribute('alt') || '';
  const fullSrc = makeFullSrc(src);

  const modal = document.createElement('dialog');
  modal.className = 'viewer';
  modal.innerHTML = `<img src="${fullSrc}" alt="${alt}"><button class="close-viewer" aria-label="Close viewer">X</button>`;
  document.body.appendChild(modal);
  modal.showModal();

  const closeBtn = modal.querySelector('.close-viewer');
  closeBtn.addEventListener('click', () => {
    modal.close();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });

  modal.addEventListener('close', () => {
    modal.remove();
  });
});
