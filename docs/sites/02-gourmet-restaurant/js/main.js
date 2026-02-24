// Page loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// Navigation scroll effect
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
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
    menuToggle.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuToggle?.classList.remove('active');
    });
});

// Parallax effect on scroll
const parallaxBg = document.querySelector('.parallax-bg');
if (parallaxBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        parallaxBg.style.transform = `translateY(${rate}px)`;
    });
}

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate
const animateElements = document.querySelectorAll(`
    .story-content,
    .menu-item,
    .experience-card,
    .gallery-item,
    .reservations-content
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
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

// Toast notification helper
function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Form handling
const reservationForm = document.querySelector('.reservation-form');
const reservationSuccess = document.querySelector('.reservation-success');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dateInput = reservationForm.querySelector('input[type="date"]');
        const timeSelect = reservationForm.querySelector('select:nth-of-type(1)');
        const guestsSelect = reservationForm.querySelector('select:nth-of-type(2)');
        const nameInput = reservationForm.querySelector('input[type="text"]');
        const emailInput = reservationForm.querySelector('input[type="email"]');
        const phoneInput = reservationForm.querySelector('input[type="tel"]');

        const date = dateInput.value;
        const time = timeSelect.value;
        const guests = guestsSelect.value;
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!date || !time || !guests || !name || !email || !phone) {
            showToast('Please fill in all required fields.');
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date + 'T00:00:00');
        if (selectedDate < today) {
            showToast('Please select today or a future date for your reservation.');
            return;
        }

        const dateFormatted = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById('confirm-date').textContent = dateFormatted;
        document.getElementById('confirm-time').textContent = time;
        document.getElementById('confirm-guests').textContent = guests;
        document.getElementById('confirm-name').textContent = name;

        reservationForm.style.display = 'none';
        reservationSuccess.style.display = 'block';
    });

    document.getElementById('new-reservation-btn')?.addEventListener('click', () => {
        reservationSuccess.style.display = 'none';
        reservationForm.style.display = '';
        reservationForm.reset();
    });
}

const reservationStyles = document.createElement('style');
reservationStyles.textContent = `
    .toast-notification {
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-80px);
        background: #111;
        color: #fff;
        padding: 14px 24px;
        border-radius: 3px;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8rem;
        letter-spacing: 0.08em;
        z-index: 9999;
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0;
        box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        border-left: 3px solid #c9a96e;
        white-space: nowrap;
    }
    .toast-notification.toast-visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    .reservation-success {
        text-align: center;
        padding: 3rem 1rem;
        color: #fff;
    }
    .reservation-success .success-icon {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 1px solid #c9a96e;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: #c9a96e;
        margin: 0 auto 1.5rem;
    }
    .reservation-success h3 {
        font-family: 'Cormorant Garamond', serif;
        font-size: 2.5rem;
        font-weight: 300;
        letter-spacing: 0.05em;
        margin-bottom: 2rem;
    }
    .success-summary {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem 2rem;
        max-width: 440px;
        margin: 0 auto 2.5rem;
        text-align: left;
    }
    .summary-item {
        border-bottom: 1px solid rgba(201,169,110,0.25);
        padding-bottom: 0.75rem;
    }
    .summary-label {
        display: block;
        font-size: 0.65rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #c9a96e;
        margin-bottom: 0.3rem;
    }
    .summary-value {
        font-size: 0.9rem;
        color: rgba(255,255,255,0.88);
    }
`;
document.head.appendChild(reservationStyles);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image lazy loading with fade effect
const images = document.querySelectorAll('img[src]');
images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});
