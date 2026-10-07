const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('bookingForm').addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const startDate = new Date(data.get('startDate'));
    const endDate = new Date(data.get('endDate'));

    if (endDate < startDate) {
        alert('Check-Out Date must be after Check-In Date.');
        return;
    }

    const subject = encodeURIComponent(
        `Reservation inquiry - ${data.get('booking')}`
    );

    const body = encodeURIComponent(
`Hello Inocencia Private Resort,

I would like to inquire about a reservation.

Name: ${data.get('name')}
Phone: ${data.get('phone')}
Email: ${data.get('email')}

Check-In Date: ${data.get('startDate')}
Check-Out Date: ${data.get('endDate')}

Number of Guests: ${data.get('guests')}
Booking Type: ${data.get('booking')}

Message:
${data.get('message') || 'No additional message'}

Thank you.`
    );

    document.getElementById('formNote').textContent =
        'Opening your email app…';

    window.location.href =
        `mailto:inocenciaprivateresort@gmail.com?subject=${subject}&body=${body}`;
});
