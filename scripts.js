function toggleMenu(){
  document.querySelector('.menu-links').classList.toggle('open');
}
 
function updateVine(){
  const fill = document.querySelector('.vine-fill');
  const leaf = document.querySelector('.vine-leaf');
  if(!fill || !leaf) return;
 
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
 
  fill.style.height = percent + '%';
  leaf.style.top = percent + '%';
}
 
window.addEventListener('scroll', updateVine, { passive: true });
window.addEventListener('load', updateVine);
window.addEventListener('resize', updateVine);
