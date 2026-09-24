function toggleMenu(){
  document.querySelector('.menu-links').classList.toggle('open');
}

function spawnFallingLeaf(sourceEl){
  const rect = sourceEl.getBoundingClientRect();
  const startX = rect.left + rect.width / 2 + window.scrollX;
  const startY = rect.top + rect.height / 2 + window.scrollY;

  const footer = document.querySelector('footer');
  if(!footer) return;
  const footerRect = footer.getBoundingClientRect();
  const endY = footerRect.top + window.scrollY + 12;

  const leaf = document.createElement('span');
  leaf.className = 'falling-leaf';
  leaf.textContent = '\u{1F343}';
  leaf.style.left = startX + 'px';
  leaf.style.top = startY + 'px';
  document.body.appendChild(leaf);

  requestAnimationFrame(() => {
    leaf.classList.add('pop');
    requestAnimationFrame(() => {
      leaf.style.top = endY + 'px';
    });
  });

  leaf.addEventListener('transitionend', (e) => {
    if(e.propertyName === 'top'){
      leaf.classList.add('landed');
    }
  });
}

function setupLeafObserver(){
  const leaves = document.querySelectorAll('h2 .leaf');
  if(!leaves.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        spawnFallingLeaf(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  leaves.forEach((leaf) => observer.observe(leaf));
}

document.addEventListener('DOMContentLoaded', setupLeafObserver);
