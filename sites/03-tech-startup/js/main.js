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

// Pricing toggle
const billingToggle = document.getElementById('billing-toggle');
const toggleLabels = document.querySelectorAll('.toggle-label');
const priceAmounts = document.querySelectorAll('.price-amount[data-monthly]');

billingToggle?.addEventListener('change', () => {
    const isAnnual = billingToggle.checked;

    toggleLabels.forEach((label, index) => {
        label.classList.toggle('active', index === (isAnnual ? 1 : 0));
    });

    priceAmounts.forEach(amount => {
        const price = isAnnual ? amount.dataset.annual : amount.dataset.monthly;
        amount.textContent = `$${price}`;
    });
});

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
    .feature-card,
    .step,
    .pricing-card,
    .testimonial-card,
    .section-header
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
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

// Counter animation for stats
const stats = document.querySelectorAll('.stat-value');

const animateCounter = (el) => {
    const target = el.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
    const suffix = target.replace(/[0-9.]/g, '');

    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }

        if (Number.isInteger(numericValue)) {
            el.textContent = Math.floor(current) + suffix;
        } else {
            el.textContent = current.toFixed(1) + suffix;
        }
    }, 30);
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

// Gradient orb mouse interaction
const gradientOrbs = document.querySelectorAll('.gradient-orb');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    gradientOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;
        orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// Dashboard bar animation on scroll
const chartBars = document.querySelectorAll('.bar');
const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            chartBars.forEach((bar, index) => {
                bar.style.animationDelay = `${index * 0.1}s`;
                bar.style.animation = 'barGrow 1s ease-out forwards';
            });
            dashboardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const chartContainer = document.querySelector('.chart-container');
if (chartContainer) {
    dashboardObserver.observe(chartContainer);
}
