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

// Contact form handling
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (field) => {
        const group = field.closest('.form-group');
        if (!field.required) return true;
        const empty = !field.value.trim();
        const invalidEmail = field.type === 'email' && !emailPattern.test(field.value.trim());
        if (empty || invalidEmail) {
            group.classList.add('has-error');
            return false;
        }
        group.classList.remove('has-error');
        return true;
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        let valid = true;
        fields.forEach(field => { if (!validateField(field)) valid = false; });

        if (valid) {
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
        }
    });

    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            field.closest('.form-group').classList.remove('has-error');
        });
    });
}

// ===== PROJECT CASE STUDY MODAL =====
const projectData = {
    lumina: {
        title: 'Lumina',
        category: 'Branding / Web',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
        description: 'Complete brand identity and e-commerce platform for a sustainable lighting company — from strategic positioning to a full Webflow build.',
        challenge: 'Lumina needed to communicate premium quality and environmental responsibility simultaneously — two values that often feel at odds in consumer perception. Their existing brand was generic and indistinguishable from competitors, and their digital presence did not reflect the sophistication of their products.',
        approach: 'We developed a brand strategy built around "considered illumination" — the idea that true luxury in lighting is about intentionality, not excess. The identity pairs an elegant wordmark with a custom icon derived from light-diffusion patterns. The e-commerce platform was built in Webflow with a custom checkout experience optimised for high-value, considered purchases.',
        result: 'Post-launch analytics showed a 42% conversion rate increase in the first quarter. Average order value increased by 28%. The brand was featured in Wallpaper* magazine\'s annual design issue, driving a significant spike in organic traffic and wholesale enquiries.',
        skills: ['Brand Strategy', 'Identity Design', 'Webflow', 'E-commerce', 'UX Design', 'Photography Art Direction'],
        liveUrl: 'https://example.com/linkID-70142'
    },
    prism: {
        title: 'Prism',
        category: 'Art Direction',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
        description: 'A complete visual identity system for a leading contemporary art gallery — designed to be as dynamic and multifaceted as the works it represents.',
        challenge: 'Contemporary art galleries face a paradox: their brand must be strong enough to communicate authority and curatorial vision, yet flexible enough not to overshadow the diverse artworks they present. Prism\'s previous identity was rigid and dated, no longer attracting the younger collectors they were targeting.',
        approach: 'We created a modular identity system built around the idea of refracted light — the same way a prism breaks white light into a spectrum, the brand expresses itself differently across contexts while remaining unmistakably Prism. The core logo is a geometric form that recolours based on the exhibition it accompanies, supported by a comprehensive design system for print and digital.',
        result: 'The new identity was featured as a case study in Print magazine\'s design annual. Prism reported a 35% increase in private view attendance and secured three new international gallery partnerships in the first year following the rebrand.',
        skills: ['Visual Identity', 'Art Direction', 'Brand Systems', 'Print Design', 'Digital Templates', 'Motion Identity'],
        liveUrl: 'https://example.com/linkID-70243'
    },
    horizon: {
        title: 'Horizon',
        category: 'Product Design',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop',
        description: 'Product design for a next-generation mobile investment platform — making wealth-building accessible and genuinely engaging for a new generation of investors.',
        challenge: 'The investment app market is dominated by either legacy platforms that feel intimidating or simplified apps that don\'t inspire confidence. Horizon needed to occupy the space between the two — genuinely accessible without feeling condescending, while maintaining the trust signals that financial products require.',
        approach: 'Through extensive research with 18-35 year old investors, we identified anxiety around investment as the primary barrier. We redesigned the entire product around progressive disclosure — showing users only what they need at each stage, with richer information always one tap away. The onboarding flow reduced time-to-first-investment from 12 minutes to under 3.',
        result: 'Horizon launched with a 50,000-person waitlist, testament to the pre-launch community built around the product design. The app was named a finalist at the 2023 Design Awards in the Digital Product category. Average session time is 4.2 minutes — 3× the category average.',
        skills: ['UX Research', 'Product Design', 'Prototyping', 'Design Systems', 'Figma', 'User Testing'],
        liveUrl: 'https://example.com/linkID-70344'
    },
    apex: {
        title: 'Apex',
        category: 'Branding / Strategy',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop',
        description: 'Brand strategy and complete identity system for a premium athletic wear brand — positioning them to compete at the very highest level of the market.',
        challenge: 'Apex was a well-made product with no brand story. In a category defined by narrative — Nike\'s "Just Do It," Lululemon\'s community ethos — a great product without a compelling brand is invisible. They were preparing for a Series A raise and needed a brand that would command the valuation they were targeting.',
        approach: 'We spent three weeks embedded with the Apex team and their customers before touching a single visual. The brand strategy emerged from a clear truth: Apex athletes are not chasing records, they are chasing the version of themselves they haven\'t met yet. The identity — all-caps wordmark, a fractional "A" icon, monochromatic palette — communicates intensity and precision without the clichés of the category.',
        result: 'Three months after the rebrand launch, Apex secured a $2.3M Series A, with investors citing brand positioning as a key factor. Wholesale enquiries increased by 180%. The identity received a merit award at the Type Directors Club annual competition.',
        skills: ['Brand Strategy', 'Naming', 'Identity Design', 'Tone of Voice', 'Retail Design', 'Digital Brand'],
        liveUrl: 'https://example.com/linkID-70445'
    }
};

const csModal = document.getElementById('project-modal');
const csModalImg = document.getElementById('cs-modal-img');
const csModalCategory = document.getElementById('cs-modal-category');
const csModalYear = document.getElementById('cs-modal-year');
const csModalTitle = document.getElementById('cs-modal-title');
const csModalDesc = document.getElementById('cs-modal-desc');
const csModalChallenge = document.getElementById('cs-modal-challenge');
const csModalApproach = document.getElementById('cs-modal-approach');
const csModalResult = document.getElementById('cs-modal-result');
const csModalSkillsList = document.getElementById('cs-modal-skills-list');
const csModalLiveLink = document.getElementById('cs-modal-live-link');
const csModalClose = document.querySelector('.cs-modal-close');

function openProjectModal(projectKey) {
    const data = projectData[projectKey];
    if (!data) return;

    csModalImg.src = data.image;
    csModalImg.alt = data.title;
    csModalCategory.textContent = data.category;
    csModalYear.textContent = data.year;
    csModalTitle.textContent = data.title;
    csModalDesc.textContent = data.description;
    csModalChallenge.textContent = data.challenge;
    csModalApproach.textContent = data.approach;
    csModalResult.textContent = data.result;
    csModalSkillsList.innerHTML = data.skills.map(s => `<span>${s}</span>`).join('');
    csModalLiveLink.href = data.liveUrl;

    csModal.setAttribute('aria-hidden', 'false');
    csModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => csModalClose.focus());
}

function closeProjectModal() {
    csModal.classList.remove('is-open');
    csModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.project[data-project]').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectModal(card.dataset.project);
        }
    });
});

csModalClose.addEventListener('click', closeProjectModal);

csModal.addEventListener('click', (e) => {
    if (e.target === csModal) closeProjectModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && csModal.classList.contains('is-open')) {
        closeProjectModal();
    }
});
