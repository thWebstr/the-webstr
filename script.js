// CURSOR
const cur = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
});

(function anim(){
  rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
  curR.style.left=rx+'px'; curR.style.top=ry+'px';
  requestAnimationFrame(anim);
})();

function setupCursorHovers() {
  document.querySelectorAll('a, button, .work-card, .work-filter, .service-row').forEach(el => {
    el.addEventListener('mouseenter',()=>{
      cur.style.width='5px';cur.style.height='5px';
      curR.style.width='48px';curR.style.height='48px';
      curR.style.borderColor='rgba(102,0,255,.7)';
    });
    el.addEventListener('mouseleave',()=>{
      cur.style.width='8px';cur.style.height='8px';
      curR.style.width='32px';curR.style.height='32px';
      curR.style.borderColor='rgba(102,0,255,.45)';
    });
  });
}

// ── REVEAL ON SCROLL ──
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => observer.observe(el));
});

// ── FORM MAILTO HANDLER ──
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Grab field data
    const name = document.getElementById('contact-name').value || 'Visitor';
    const email = document.getElementById('contact-email').value;
    const subjectRaw = document.getElementById('contact-subject');
    const subject = subjectRaw ? subjectRaw.value : 'Portfolio Inquiry';
    const message = document.getElementById('contact-message').value;
    
    // Format email body
    const formattedBody = `Hello The Webstr,%0D%0A%0D%0AHere are the details of my request:%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AProject Details:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ABest regards,%0D%0A${name}`;
    
    // Open native mail app correctly populated
    window.location.href = `mailto:thewebstr25@gmail.com?subject=New ${encodeURIComponent(subject)} Request from ${encodeURIComponent(name)}&body=${formattedBody}`;
  });
}

// NAV on scroll
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// WORK FILTERS
function setupWorkFilters() {
  document.querySelectorAll('.work-filter').forEach(btn => {
    btn.addEventListener('click', function(){
      document.querySelectorAll('.work-filter').forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      document.querySelectorAll('.work-card').forEach(card => {
        const match = f==='all' || card.dataset.cat===f;
        card.style.display = match ? 'block' : 'none';
        if(card.classList.contains('featured')) {
          card.style.gridColumn = (match && f!=='design') ? 'span 2' : 'span 1';
        }
      });
    });
  });
}

// CONTACT FORM
function setupContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent! →';
      submitBtn.style.background = '#00C853';
      form.reset();
      
      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = 'var(--violet)';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initReveals();
  setupCursorHovers();
  setupWorkFilters();
  setupContactForm();
});
