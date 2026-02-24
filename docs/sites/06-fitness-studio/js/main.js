// Navigation scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = el.textContent;
    const hasPlus = target.includes('+');
    const hasK = target.includes('K');
    let numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));

    if (hasK) numericValue *= 1;

    let current = 0;
    const increment = numericValue / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }

        let display = Math.floor(current);
        if (hasK) display += 'K';
        if (hasPlus) display += '+';
        el.textContent = display;
    }, 40);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll(`
    .feature,
    .class-card,
    .trainer-card,
    .pricing-card,
    .section-header
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.1}s, transform 0.5s ease ${(index % 4) * 0.1}s`;
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');

    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        contactForm.reset();
    }, 2000);
});

// Modal helpers
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close buttons and overlay click
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
    });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) { overlay.style.display = 'none'; document.body.style.overflow = ''; }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => { m.style.display = 'none'; });
        document.body.style.overflow = '';
    }
});

// Pricing plan button handling — open membership modal
const pricingButtons = document.querySelectorAll('.pricing-join-btn');
const planPrices = { Basic: '$49/month', Pro: '$89/month', Elite: '$149/month' };

pricingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan');
        document.getElementById('modal-plan-name').textContent = plan + ' Plan';
        document.getElementById('modal-plan-price').textContent = planPrices[plan] || '';
        document.getElementById('membership-form').reset();
        document.querySelector('#membership-modal .modal-form-state').style.display = '';
        document.querySelector('#membership-modal .modal-success-state').style.display = 'none';
        openModal('membership-modal');
    });
});

// Membership form submit
document.getElementById('membership-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#membership-modal .modal-form-state').style.display = 'none';
    document.querySelector('#membership-modal .modal-success-state').style.display = 'block';
});

// Class booking buttons
document.querySelectorAll('.book-class-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const className = btn.getAttribute('data-class');
        document.getElementById('booking-class-name').textContent = className;
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('booking-date');
        document.getElementById('booking-form').reset();
        dateInput.min = today;
        document.querySelector('#class-booking-modal .modal-booking-state').style.display = '';
        document.querySelector('#class-booking-modal .modal-booking-success').style.display = 'none';
        openModal('class-booking-modal');
    });
});

// Class booking form submit
document.getElementById('booking-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#class-booking-modal .modal-booking-state').style.display = 'none';
    document.querySelector('#class-booking-modal .modal-booking-success').style.display = 'block';
});

// Modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    }
    .modal-container {
        background: #1c1c1e;
        border-radius: 10px;
        padding: 2.5rem;
        width: 100%;
        max-width: 460px;
        position: relative;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        background: none;
        border: none;
        font-size: 1.75rem;
        color: rgba(255,255,255,0.4);
        cursor: pointer;
        line-height: 1;
        padding: 0;
        transition: color 0.2s;
    }
    .modal-close:hover { color: #fff; }
    .modal-plan-header {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 1.75rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .modal-plan-header h3 {
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #fff;
        margin: 0;
    }
    .modal-plan-price {
        color: #f97316;
        font-size: 1rem;
        font-weight: 600;
    }
    .modal-form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
    }
    #membership-form .form-group,
    #booking-form .form-group {
        margin-bottom: 0.75rem;
    }
    #membership-form input,
    #booking-form input {
        width: 100%;
        padding: 0.8rem 1rem;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 6px;
        color: #fff;
        font-size: 0.9rem;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }
    #membership-form input::placeholder,
    #booking-form input::placeholder { color: rgba(255,255,255,0.35); }
    #membership-form input:focus,
    #booking-form input:focus {
        outline: none;
        border-color: #f97316;
        background: rgba(249,115,22,0.06);
    }
    #booking-date { color-scheme: dark; }
    .btn-block { width: 100%; margin-top: 0.5rem; }
    .modal-success-state,
    .modal-booking-success {
        text-align: center;
        padding: 1.5rem 0;
    }
    .modal-success-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #22c55e;
        color: #fff;
        font-size: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.25rem;
    }
    .modal-success-state h3,
    .modal-booking-success h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    .modal-success-state p,
    .modal-booking-success p { color: rgba(255,255,255,0.65); }
    .modal-booking-state h3 {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    .modal-class-name {
        color: #f97316;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
    }
    .book-class-btn {
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        display: block;
    }
`;
document.head.appendChild(modalStyles);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hero content animation on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroStats = document.querySelector('.hero-stats');

    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-30px)';
        heroContent.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 100);
    }

    if (heroStats) {
        heroStats.style.opacity = '0';
        heroStats.style.transform = 'translateX(30px)';
        heroStats.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';

        setTimeout(() => {
            heroStats.style.opacity = '1';
            heroStats.style.transform = 'translateX(0)';
        }, 100);
    }
});
