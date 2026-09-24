function toggleMenu(){
  document.querySelector('.menu-links').classList.toggle('open');
}

let leafPileCount = 0;

function spawnFallingLeaf(sourceEl){
  sourceEl.classList.add('leaf-launched');
  setTimeout(() => {
    sourceEl.classList.remove('leaf-launched');
  }, 3000);

  const rect = sourceEl.getBoundingClientRect();
  const startX = rect.left + rect.width / 2 + window.scrollX;
  const startY = rect.top + rect.height / 2 + window.scrollY;

  const footerText = document.querySelector('#footer-text');
  if(!footerText) return;
  const footerRect = footerText.getBoundingClientRect();

  const pileIndex = leafPileCount++;
  const jitterX = (Math.random() - 0.5) * 16;
  const stackRise = Math.min(pileIndex * 5, 26);
  const rotation = (Math.random() - 0.5) * 60;

  const endX = footerRect.left + window.scrollX - 24 - (pileIndex % 4) * 8 + jitterX;
  const endY = footerRect.top + window.scrollY + footerRect.height / 2 - stackRise;

  const leaf = document.createElement('span');
  leaf.className = 'falling-leaf';
  leaf.textContent = '\u{1F33F}';
  leaf.style.left = startX + 'px';
  leaf.style.top = startY + 'px';
  leaf.style.setProperty('--land-rotate', rotation + 'deg');
  document.body.appendChild(leaf);

  requestAnimationFrame(() => {
    leaf.classList.add('pop');
    requestAnimationFrame(() => {
      leaf.style.left = endX + 'px';
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

function initLeavesOnFirstScroll(){
  setupLeafObserver();
  window.removeEventListener('scroll', initLeavesOnFirstScroll);
}

window.addEventListener('scroll', initLeavesOnFirstScroll, { passive: true });
