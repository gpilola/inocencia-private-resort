const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(button=>button.addEventListener('click',()=>{lightboxImg.src=button.dataset.src;lightbox.hidden=false;document.body.style.overflow='hidden'}));
function closeLightbox(){lightbox.hidden=true;lightboxImg.src='';document.body.style.overflow=''}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closeLightbox()});
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const startDate = data.get('startDate');
  const endDate = data.get('endDate');
  const note = document.getElementById('formNote');
  if (endDate < startDate) {
    note.textContent = 'Check-Out Date must be after Check-In Date.';
    return;
  }
  const details = `Reservation inquiry: ${data.get('booking')} | ${startDate} to ${endDate} | ${data.get('guests')} guest(s) | ${data.get('name')} | ${data.get('phone')} | ${data.get('message') || 'No additional message'}`;
  navigator.clipboard?.writeText(details).catch(() => {});
  note.textContent = 'Your booking details were copied. Paste them into Messenger after it opens.';
  window.open('https://m.me/inocenciaprivateresort', '_blank', 'noopener');
});
