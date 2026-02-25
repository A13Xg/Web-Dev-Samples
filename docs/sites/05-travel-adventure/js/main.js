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
        const section = parallaxBg.closest('section');
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            const rate = (scrolled - sectionTop + window.innerHeight) * 0.2;
            parallaxBg.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Counter animation for stats
const stats = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = el.textContent;
    const hasPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

    let current = 0;
    const increment = Math.ceil(numericValue / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        el.textContent = current + (hasPlus ? '+' : '');
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
    .destination-card,
    .story-card,
    .guide-item,
    .section-header
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${(index % 4) * 0.1}s, transform 0.6s ease ${(index % 4) * 0.1}s`;
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

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('.btn');
    const email = input.value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.style.borderColor = '#e53e3e';
        input.focus();
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
        return;
    }

    const parent = newsletterForm.closest('.newsletter-content') || newsletterForm.parentElement;
    let successEl = parent.querySelector('.newsletter-success');
    if (!successEl) {
        successEl = document.createElement('p');
        successEl.className = 'newsletter-success';
        successEl.style.cssText = 'color:#22c55e;font-weight:600;margin-top:12px;font-size:15px;';
        newsletterForm.insertAdjacentElement('afterend', successEl);
    }
    successEl.textContent = '✓ You\'re in! Check your inbox for a welcome email from Wanderlust.';
    btn.textContent = 'Subscribed!';
    btn.style.background = '#22c55e';
    input.value = '';

    setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        successEl.textContent = '';
    }, 5000);
});

// Search overlay
const searchBtn = document.getElementById('travel-search-btn');
if (searchBtn) {
    // Inject search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.id = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-backdrop"></div>
        <div class="search-box">
            <form class="search-form" role="search">
                <svg class="search-icon-inner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="search" id="search-input" placeholder="Search destinations, stories, guides…" autocomplete="off" aria-label="Search">
                <button type="button" class="search-close-btn" aria-label="Close search">&times;</button>
            </form>
            <div id="search-results"></div>
        </div>
    `;
    document.body.appendChild(searchOverlay);

    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        #search-overlay{position:fixed;inset:0;z-index:9999;display:none;align-items:flex-start;justify-content:center;padding-top:80px;}
        #search-overlay.open{display:flex;}
        .search-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);}
        .search-box{position:relative;width:min(600px,92vw);background:#fff;border-radius:16px;padding:8px;box-shadow:0 24px 60px rgba(0,0,0,0.3);}
        .search-form{display:flex;align-items:center;gap:8px;padding:8px 12px;}
        .search-icon-inner{width:20px;height:20px;flex-shrink:0;color:#999;}
        #search-input{flex:1;border:none;outline:none;font-size:16px;font-family:inherit;color:#222;}
        .search-close-btn{background:none;border:none;font-size:22px;cursor:pointer;color:#999;padding:2px 6px;line-height:1;}
        #search-results{max-height:360px;overflow-y:auto;}
        .search-result-item{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;border-top:1px solid #f0f0f0;transition:background .15s;}
        .search-result-item:hover{background:#f8f8f8;}
        .search-result-tag{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#22c55e;margin-bottom:2px;}
        .search-result-title{font-size:14px;font-weight:600;color:#222;}
        .search-no-results{padding:20px 16px;text-align:center;color:#999;font-size:14px;}
    `;
    document.head.appendChild(searchStyle);

    const searchData = [
        { tag:'Destination', title:'Bali, Indonesia', el:'#destinations' },
        { tag:'Destination', title:'Kyoto, Japan', el:'#destinations' },
        { tag:'Destination', title:'Amalfi Coast, Italy', el:'#destinations' },
        { tag:'Destination', title:'Maldives', el:'#destinations' },
        { tag:'Destination', title:'Iceland', el:'#destinations' },
        { tag:'Story', title:'Chasing the Northern Lights', el:'#stories' },
        { tag:'Story', title:'Lost in the Medinas: Morocco', el:'#stories' },
        { tag:'Story', title:'The Ultimate Beach Guide', el:'#stories' },
        { tag:'Story', title:'Kayaking Through Norway\'s Fjords', el:'#stories' },
        { tag:'Guide', title:'Destination Guides', el:'#guides' },
        { tag:'Guide', title:'Packing Guides', el:'#guides' },
        { tag:'Guide', title:'Budget Travel Tips', el:'#guides' },
    ];

    const openSearch = () => {
        searchOverlay.classList.add('open');
        document.getElementById('search-input').focus();
        renderResults('');
    };
    const closeSearch = () => {
        searchOverlay.classList.remove('open');
        document.getElementById('search-input').value = '';
    };

    const renderResults = (query) => {
        const container = document.getElementById('search-results');
        const q = query.toLowerCase().trim();
        const filtered = q ? searchData.filter(d =>
            d.title.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q)
        ) : searchData;

        if (filtered.length === 0) {
            container.innerHTML = `<p class="search-no-results">No results found for "${query}"</p>`;
        } else {
            container.innerHTML = filtered.map(d => `
                <div class="search-result-item" data-target="${d.el}">
                    <div>
                        <div class="search-result-tag">${d.tag}</div>
                        <div class="search-result-title">${d.title}</div>
                    </div>
                </div>
            `).join('');
            container.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const target = document.querySelector(item.dataset.target);
                    closeSearch();
                    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                });
            });
        }
    };

    searchBtn.addEventListener('click', (e) => { e.preventDefault(); openSearch(); });
    document.getElementById('search-input').addEventListener('input', (e) => renderResults(e.target.value));
    searchOverlay.querySelector('.search-close-btn').addEventListener('click', closeSearch);
    searchOverlay.querySelector('.search-backdrop').addEventListener('click', closeSearch);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });
}


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

// Image lazy loading with fade effect
const images = document.querySelectorAll('.destination-image img, .story-image img, .instagram-item img');

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

// Hero content animation
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});
