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
        const href = this.getAttribute('href');
        // Only prevent default for valid anchors, not for hash-only links with onclick handlers
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Special handling for logo links to scroll to top
document.querySelectorAll('a[href="#top"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

// ===== MODAL SYSTEM =====

function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const focusable = overlay.querySelector('input, select, textarea, button:not(.modal-close)');
    if (focusable) setTimeout(() => focusable.focus(), 50);
}

function closeModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function resetModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    const form = overlay.querySelector('form');
    if (form) form.reset();
    const success = overlay.querySelector('.modal-success');
    if (success) success.classList.remove('visible');
    const formContent = overlay.querySelector('.modal-form-content');
    if (formContent) formContent.style.display = '';
    overlay.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible'));
    overlay.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function showSuccess(modalId, successId) {
    const formContent = document.querySelector(`#${modalId} .modal-form-content`);
    const success = document.getElementById(successId);
    if (formContent) formContent.style.display = 'none';
    if (success) success.classList.add('visible');
}

function openSignInModal() {
    resetModal('modal-signin');
    // Restore forgot password link visibility
    const forgotLink = document.querySelector('#modal-signin .forgot-link');
    const forgotSuccess = document.querySelector('#modal-signin .forgot-success');
    if (forgotLink) forgotLink.hidden = false;
    if (forgotSuccess) forgotSuccess.hidden = true;
    openModal('modal-signin');
}

function openTrialModal(plan) {
    resetModal('modal-trial');
    if (plan) {
        const planSelect = document.getElementById('trial-plan');
        if (planSelect) planSelect.value = plan;
    }
    openModal('modal-trial');
}

function openDemoModal() {
    openModal('modal-demo');
}

function openScheduleDemoModal() {
    resetModal('modal-schedule');
    populateScheduleDates();
    openModal('modal-schedule');
}

function populateScheduleDates() {
    const select = document.getElementById('schedule-date');
    if (!select) return;
    while (select.options.length > 1) select.remove(1);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const label = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
        const val = d.toISOString().slice(0, 10);
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = label;
        select.appendChild(opt);
    }
}

function handleForgotPassword() {
    const forgotLink = document.querySelector('#modal-signin .forgot-link');
    const forgotSuccess = document.querySelector('#modal-signin .forgot-success');
    if (forgotLink) forgotLink.hidden = true;
    if (forgotSuccess) forgotSuccess.hidden = false;
}

// ESC key closes any open modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
    }
});

// Backdrop click closes modal
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay.id);
    });
});

// ===== FORM VALIDATION HELPERS =====

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('error');
    if (error) error.classList.add('visible');
}

function clearFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('visible');
}

function bindClearOnInput(ids) {
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const evt = (el.tagName === 'SELECT') ? 'change' : 'input';
        el.addEventListener(evt, () => clearFieldError(id, `${id}-error`));
    });
}

// ===== SIGN IN FORM =====
document.getElementById('signin-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    clearFieldError('signin-email', 'signin-email-error');
    clearFieldError('signin-password', 'signin-password-error');
    if (!validateEmail(document.getElementById('signin-email').value)) {
        showFieldError('signin-email', 'signin-email-error');
        valid = false;
    }
    if (!document.getElementById('signin-password').value) {
        showFieldError('signin-password', 'signin-password-error');
        valid = false;
    }
    if (valid) showSuccess('modal-signin', 'signin-success');
});
bindClearOnInput(['signin-email', 'signin-password']);

// ===== TRIAL SIGNUP FORM =====
document.getElementById('trial-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const textFields = [
        { id: 'trial-firstname', check: v => v.trim() !== '' },
        { id: 'trial-lastname',  check: v => v.trim() !== '' },
        { id: 'trial-email',     check: validateEmail },
        { id: 'trial-company',   check: v => v.trim() !== '' },
        { id: 'trial-password',  check: v => v.length >= 8 },
    ];
    textFields.forEach(({ id, check }) => {
        clearFieldError(id, `${id}-error`);
        if (!check(document.getElementById(id).value)) {
            showFieldError(id, `${id}-error`);
            valid = false;
        }
    });
    const terms = document.getElementById('trial-terms');
    const termsError = document.getElementById('trial-terms-error');
    if (!terms.checked) {
        termsError.classList.add('visible');
        valid = false;
    } else {
        termsError.classList.remove('visible');
    }
    if (valid) showSuccess('modal-trial', 'trial-success');
});
bindClearOnInput(['trial-firstname', 'trial-lastname', 'trial-email', 'trial-company', 'trial-password']);
document.getElementById('trial-terms')?.addEventListener('change', () => {
    document.getElementById('trial-terms-error').classList.remove('visible');
});

// ===== SCHEDULE DEMO FORM =====
document.getElementById('schedule-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = [
        { id: 'schedule-name',      check: v => v.trim() !== '' },
        { id: 'schedule-email',     check: validateEmail },
        { id: 'schedule-company',   check: v => v.trim() !== '' },
        { id: 'schedule-employees', check: v => v !== '' },
        { id: 'schedule-date',      check: v => v !== '' },
        { id: 'schedule-time',      check: v => v !== '' },
    ];
    fields.forEach(({ id, check }) => {
        clearFieldError(id, `${id}-error`);
        if (!check(document.getElementById(id).value)) {
            showFieldError(id, `${id}-error`);
            valid = false;
        }
    });
    if (valid) showSuccess('modal-schedule', 'schedule-success');
});
bindClearOnInput(['schedule-name', 'schedule-email', 'schedule-company', 'schedule-employees', 'schedule-date', 'schedule-time']);
