// Navigation scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth reveal on scroll
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

document.querySelectorAll('.project-card, .section-header, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add revealed class styles
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Cursor follower (optional enhancement)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.innerHTML = '<div class="cursor-dot"></div>';
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(0,0,0,0.2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, opacity 0.15s ease;
        display: none;
    }

    .cursor-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: #1a1a1a;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    @media (pointer: fine) {
        .custom-cursor {
            display: block;
        }
    }

    .custom-cursor.hover {
        transform: scale(1.5);
        border-color: #0066ff;
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 20 + 'px';
    cursor.style.top = e.clientY - 20 + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Validate name
        const nameField = contactForm.querySelector('#cf-name');
        const nameGroup = nameField.closest('.form-group');
        if (!nameField.value.trim()) {
            nameGroup.classList.add('has-error');
            valid = false;
        } else {
            nameGroup.classList.remove('has-error');
        }

        // Validate email
        const emailField = contactForm.querySelector('#cf-email');
        const emailGroup = emailField.closest('.form-group');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            emailGroup.classList.add('has-error');
            valid = false;
        } else {
            emailGroup.classList.remove('has-error');
        }

        // Validate subject
        const subjectField = contactForm.querySelector('#cf-subject');
        const subjectGroup = subjectField.closest('.form-group');
        if (!subjectField.value) {
            subjectGroup.classList.add('has-error');
            valid = false;
        } else {
            subjectGroup.classList.remove('has-error');
        }

        // Validate message
        const messageField = contactForm.querySelector('#cf-message');
        const messageGroup = messageField.closest('.form-group');
        if (!messageField.value.trim()) {
            messageGroup.classList.add('has-error');
            valid = false;
        } else {
            messageGroup.classList.remove('has-error');
        }

        if (valid) {
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
        }
    });

    // Clear error on input
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
        category: 'Brand Identity',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
        description: 'Complete visual identity for a sustainable lighting company that needed to balance modern innovation with natural warmth.',
        challenge: 'Lumina came to us needing a brand that felt simultaneously cutting-edge and rooted in nature. Their products use sustainable materials and energy-efficient technology, but their existing identity leaned too clinical. The challenge was to create something that felt both premium and approachable, modern yet earthy.',
        approach: 'We developed the "warm glow" concept as the strategic foundation, pairing organic hand-drawn forms with precision geometric type. The colour palette draws from golden-hour light and warm timber tones. Every touchpoint — from business cards to packaging — was designed to feel like holding a piece of considered craft.',
        result: 'The rebrand launched to immediate acclaim, with Lumina reporting a 40% increase in brand recognition within six months. The identity won Gold at the regional design awards and a commendation at D&AD. Most importantly, the new brand directly supported a successful Series A funding round.',
        skills: ['Brand Strategy', 'Logo Design', 'Typography', 'Colour Systems', 'Packaging', 'Brand Guidelines'],
        liveUrl: 'https://dribbble.com'
    },
    horizon: {
        title: 'Horizon',
        category: 'UI/UX Design',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
        description: 'Mobile banking reimagined for Gen Z — making financial management feel intuitive, human, and even enjoyable.',
        challenge: 'Traditional banking apps are built around institutional logic, not user behaviour. Horizon\'s target audience — 18-28 year olds — reported feeling anxious and alienated by existing fintech products. We needed to make banking feel approachable without sacrificing the trust signals a financial product requires.',
        approach: 'We radically simplified the information architecture to three core actions: spend, save, send. Biometric-first entry replaced password friction entirely. The visual language draws from editorial design rather than fintech conventions — large type, bold colour blocks, and micro-animations that respond to real-time spending patterns.',
        result: 'Horizon launched to a 4.8 star App Store rating, the highest debut score in the client\'s portfolio. The app hit 200,000 downloads in its first three months, significantly exceeding projections. User retention at 30 days was 78%, compared to an industry average of 45%.',
        skills: ['UX Research', 'Information Architecture', 'UI Design', 'Prototyping', 'Figma', 'Motion Design'],
        liveUrl: 'https://behance.net'
    },
    mono: {
        title: 'Mono Studio',
        category: 'Web Design',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=800&fit=crop',
        description: 'Architecture portfolio website that lets the work breathe — a digital space as considered as the buildings it showcases.',
        challenge: 'The studio\'s principal wanted a portfolio that showcased over a decade of work without distraction or visual noise. Every previous attempt had failed because the design competed with the photography. We needed to create something invisible enough to be a frame, yet distinctive enough to be memorable.',
        approach: 'We designed an ultra-minimal grid layout built entirely around full-bleed photography. Navigation is reduced to a single persistent index. Type is set in a single weight of a single typeface. The only colour allowed is in the photographs themselves. Loading transitions were choreographed to feel like turning the pages of a monograph.',
        result: 'In the six months following launch, Mono Studio reported a 60% increase in client enquiry submissions. The site was featured on Awwwards\' Site of the Day and included in three year-end design roundups. The principal credited it directly with enabling several high-value residential commissions.',
        skills: ['Web Design', 'Art Direction', 'CSS Animation', 'Webflow', 'Photography Direction', 'Grid Systems'],
        liveUrl: 'https://dribbble.com'
    },
    verve: {
        title: 'Verve',
        category: 'Art Direction',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200&h=600&fit=crop',
        description: 'Global campaign for a premium audio brand — making people feel sound before they hear it.',
        challenge: 'The premium headphone market is saturated with campaigns showing people experiencing joy while listening to music. Verve needed to differentiate by communicating the physical, tactile quality of their audio technology — conveying something fundamentally invisible in a purely visual medium.',
        approach: 'We developed the "sound as texture" visual direction, treating audio frequencies as physical material. Working with a 3D studio, we created bespoke typography that appeared to vibrate with kinetic energy, paired with slow-motion footage of objects resonating at specific frequencies. The tagline, "Feel Every Frequency," anchored the campaign globally.',
        result: 'The campaign reached 50 million impressions across digital and out-of-home placements worldwide. Internal brand tracking showed the highest campaign recall score in Verve\'s history. The campaign was shortlisted at Cannes Lions and won Best in Show at the One Show for Art Direction.',
        skills: ['Art Direction', 'Campaign Strategy', 'Motion Direction', '3D Typography', 'OOH Design', 'Social Content'],
        liveUrl: 'https://behance.net'
    },
    fragments: {
        title: 'Fragments',
        category: 'Digital Art',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
        description: 'Abstract generative art collection — 200 unique pieces born from the intersection of code and artistic intuition.',
        challenge: 'Generative art often falls into one of two traps: it feels purely technical and cold, or it tries too hard to appear expressive and comes across as arbitrary. The challenge was to create a system with genuine artistic coherence — where the code itself had taste, and every output felt intentional.',
        approach: 'A custom algorithm was built in p5.js working with controlled randomness across five parameters: form, density, colour temperature, line weight, and compositional bias. Rather than pure randomness, each parameter followed curated probability distributions informed by compositional principles from abstract expressionism, producing 200 pieces that share a visual DNA.',
        result: 'The Fragments collection sold out within 48 hours of its OpenSea launch. Three pieces were acquired by collectors who donated them to permanent gallery collections in Berlin and Amsterdam. The project was featured in Creative Review\'s annual digital art survey.',
        skills: ['Generative Art', 'p5.js', 'Creative Coding', 'NFT Development', 'Art Direction', 'Edition Design'],
        liveUrl: 'https://dribbble.com'
    },
    nova: {
        title: 'Nova',
        category: 'Packaging',
        year: '2022',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop',
        description: 'Eco-friendly cosmetics packaging that proves sustainable design doesn\'t have to sacrifice luxury.',
        challenge: 'Nova\'s founder had a clear mandate: every element must be recyclable or compostable, yet the product must still feel premium enough to sit on a Selfridges shelf. Previous attempts had produced packaging that felt worthy but cheap — sustainable credentials were undermining the brand\'s premium positioning.',
        approach: 'We redesigned the entire packaging line using 100% recycled cardboard with soy-based inks and seed-paper inserts customers could plant after use. Structural design used fold-lock mechanisms instead of glue, eliminating non-recyclable adhesives. A foil-free deboss treatment gave each piece a tactile luxury finish without metallic waste.',
        result: 'Nova\'s packaging line was certified 100% recyclable and won the Sustainable Packaging Award at Packaging Digest. The range was subsequently stocked by three major retailers. Customer research showed 73% of buyers cited the packaging as a significant factor in their purchase decision.',
        skills: ['Packaging Design', 'Structural Design', 'Sustainable Materials', 'Print Production', 'Brand Identity', 'Retail Display'],
        liveUrl: 'https://behance.net'
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

    // Focus the close button for accessibility
    requestAnimationFrame(() => csModalClose.focus());
}

function closeProjectModal() {
    csModal.classList.remove('is-open');
    csModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Open on card click or Enter/Space keypress
document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProjectModal(card.dataset.project);
        }
    });
});

// Close handlers
csModalClose.addEventListener('click', closeProjectModal);

csModal.addEventListener('click', (e) => {
    if (e.target === csModal) closeProjectModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && csModal.classList.contains('is-open')) {
        closeProjectModal();
    }
});
