function toggleMenu(){
  document.querySelector('.menu-links').classList.toggle('open');
}
 
function updateVine(){
  const leaf = document.querySelector('.vine-leaf');
  if(!leaf) return;
 
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
 
  leaf.style.top = percent + '%';
 
  if(scrollTop > 10){
    leaf.classList.add('active');
  } else {
    leaf.classList.remove('active');
  }
}
 
window.addEventListener('scroll', updateVine, { passive: true });
window.addEventListener('load', updateVine);
window.addEventListener('resize', updateVine);
