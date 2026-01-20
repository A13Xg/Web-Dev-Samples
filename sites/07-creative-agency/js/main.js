// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Cursor hover effect on links
document.querySelectorAll('a, button, .project').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
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
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

    let current = 0;
    const increment = Math.ceil(numericValue / 40);
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        el.textContent = current + (hasPlus ? '+' : '');
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
    .project,
    .service,
    .team-member,
    .section-header
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.7s ease ${(index % 4) * 0.1}s, transform 0.7s ease ${(index % 4) * 0.1}s`;
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero animation on load
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(40px)';
        heroText.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';

        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 100);
    }

    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(40px)';
        heroVisual.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';

        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 100);
    }
});

// Parallax effect on project images
document.querySelectorAll('.project-image').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        img.querySelector('img').style.transform = `scale(1.03) translate(${x * 10}px, ${y * 10}px)`;
    });

    img.addEventListener('mouseleave', () => {
        img.querySelector('img').style.transform = 'scale(1)';
    });
});
