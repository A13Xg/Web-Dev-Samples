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

// Form handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation feedback
        const btn = reservationForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Request Sent!';
        btn.style.background = '#4a7c59';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            reservationForm.reset();
        }, 3000);
    });
}

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
