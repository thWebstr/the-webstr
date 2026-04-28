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

// PAGE ROUTING
function showPage(name, pushState = true) {
  const targetPage = document.getElementById('page-'+name);
  if (!targetPage) return;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-current', 'false');
  });
  
  const targetNav = document.getElementById('nav-'+name);
  
  targetPage.classList.add('active');
  if (targetNav) {
    targetNav.classList.add('active');
    targetNav.setAttribute('aria-current', 'page');
  }
  
  // A11y: Update status and manage focus
  const statusEl = document.getElementById('page-status');
  if (statusEl) statusEl.textContent = `Moved to ${name} page`;
  
  window.scrollTo({top:0,behavior:'smooth'});
  
  if (pushState) {
    history.pushState({page: name}, "", name === 'home' ? "/" : `#${name}`);
  }
  
  triggerReveals();
}

// Handle Browser Back/Forward
window.addEventListener('popstate', (e) => {
  const page = e.state ? e.state.page : 'home';
  showPage(page, false);
});

// Handle Initial Hash
function handleInitialPage() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showPage(hash, false);
  } else {
    showPage('home', false);
  }
}

// SCROLL REVEAL
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); } });
}, {threshold:0.08, rootMargin:'0px 0px -40px 0px'});

function triggerReveals() {
  setTimeout(() => {
    document.querySelectorAll('.page.active .reveal').forEach(el => {
      el.classList.remove('in');
      revealObserver.observe(el);
    });
  }, 50);
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
  handleInitialPage();
  setupCursorHovers();
  setupWorkFilters();
  setupContactForm();
});
