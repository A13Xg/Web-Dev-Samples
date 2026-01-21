// Article data mapping for displaying full articles
const articleData = {
    'nasa-breakthrough': {
        title: 'NASA Announces Breakthrough in Deep Space Exploration Technology',
        category: 'Science',
        author: 'By Sarah Mitchell',
        content: 'Revolutionary propulsion system could cut Mars travel time by half, opening new possibilities for human exploration of the solar system. This breakthrough represents decades of research and collaboration between leading space agencies worldwide.'
    },
    'markets-rally': {
        title: 'Global Markets Rally as Economic Outlook Improves',
        category: 'Business',
        author: 'By James Chen',
        content: 'Stock markets worldwide showed significant gains today as investors responded positively to improved economic forecasts. Major indices reached their highest levels in months as corporate earnings continue to exceed expectations.'
    },
    'urban-architecture': {
        title: 'The Renaissance of Urban Architecture',
        category: 'Culture',
        author: 'By Maria Santos',
        content: 'Cities around the world are experiencing a revival in architectural innovation. Sustainable design and community-focused spaces are reshaping urban landscapes, creating vibrant neighborhoods that blend modern aesthetics with cultural heritage.'
    },
    'climate-bill': {
        title: 'Senate Passes Historic Climate Bill After Marathon Session',
        category: 'Politics',
        author: 'By Robert Walsh',
        content: 'After weeks of intense negotiations, the Senate voted to pass landmark climate legislation with bipartisan support. The bill allocates billions toward renewable energy infrastructure and carbon reduction initiatives, marking a significant step in addressing environmental challenges.'
    },
    'ai-breakthrough': {
        title: 'AI Researchers Achieve Major Breakthrough in Natural Language Understanding',
        category: 'Technology',
        author: 'By Emily Park',
        content: 'Leading AI labs announce new models with unprecedented comprehension capabilities, demonstrating remarkable improvements in language understanding tasks. These advances could revolutionize applications in translation, content creation, and human-computer interaction.'
    },
    'sports-upset': {
        title: 'Underdog Team Stuns Champions in Historic Playoff Upset',
        category: 'Sports',
        author: 'By David Kim',
        content: 'In a thrilling playoff match, the underdog team defeated the defending champions in a stunning upset. Against all odds, they advance to the finals for the first time in 30 years, giving their fans and city hope for championship glory.'
    },
    'mediterranean-diet': {
        title: 'New Study Reveals Surprising Benefits of Mediterranean Diet',
        category: 'Health',
        author: 'By Dr. Anna Liu',
        content: 'Recent research shows significant improvements in cognitive function and longevity among those following the Mediterranean diet. The study, spanning five years and involving thousands of participants, provides compelling evidence for the health benefits of this traditional eating pattern.'
    },
    'future-of-work': {
        title: 'The Future of Work Is Already Here',
        category: 'Opinion',
        author: 'By Michael Torres',
        content: 'Remote work has fundamentally changed how we think about productivity and collaboration. The shift has revealed that flexibility, not location, drives innovation and employee satisfaction. Organizations that embrace this new reality will lead the market.'
    },
    'urban-transportation': {
        title: 'Why We Need to Rethink Urban Transportation',
        category: 'Opinion',
        author: 'By Dr. Lisa Chen',
        content: 'Cities must embrace sustainable mobility solutions now. Electric public transit, bike infrastructure, and car-free zones aren\'t luxuries—they\'re essential for creating livable, healthy cities that can support growing populations.'
    },
    'climate-summit': {
        title: 'Climate Summit Reaches Unprecedented Agreement',
        category: 'Trending',
        author: 'The Chronicle',
        content: 'World leaders reach historic accord on climate action, committing to aggressive emissions targets and sustainable development initiatives.'
    },
    'antitrust-tech': {
        title: 'Tech Giants Face New Antitrust Scrutiny',
        category: 'Trending',
        author: 'The Chronicle',
        content: 'Regulators worldwide intensify investigations into major technology companies, raising questions about competition and market dominance.'
    },
    'art-digital': {
        title: 'The Art World\'s Digital Revolution',
        category: 'Trending',
        author: 'The Chronicle',
        content: 'NFTs and digital platforms are transforming how artists create, share, and monetize their work.'
    },
    'space-tourism': {
        title: 'Space Tourism Takes Off',
        category: 'Trending',
        author: 'The Chronicle',
        content: 'Commercial space travel becomes accessible to more travelers as companies expand their operations and reduce prices.'
    },
    'ev-sales': {
        title: 'Electric Vehicles Hit Record Sales',
        category: 'Trending',
        author: 'The Chronicle',
        content: 'Global EV sales surge as battery technology improves and charging infrastructure expands across regions.'
    },
    'chip-shortage': {
        title: 'The Chip Shortage Finally Shows Signs of Easing',
        category: 'Technology',
        author: 'By Tech Desk',
        content: 'After years of supply chain disruptions, semiconductor manufacturers report improved production levels and reduced lead times. Industry experts indicate the worst may be behind us.'
    },
    'cybersecurity-threat': {
        title: 'Cybersecurity Experts Warn of New Threat Landscape',
        category: 'Technology',
        author: 'By Security Team',
        content: 'A new generation of cyber threats targets critical infrastructure and corporate networks. Security professionals urge organizations to strengthen their defenses and implement comprehensive protection strategies.'
    },
    'bigdata-healthcare': {
        title: 'How Big Data Is Transforming Healthcare',
        category: 'Technology',
        author: 'By Health Tech',
        content: 'Big data analytics are revolutionizing patient care, drug discovery, and disease prevention. Hospitals and research institutions leverage massive datasets to deliver personalized treatment and improve outcomes.'
    }
};

// Show article modal/alert with full content
function showArticle(articleId) {
    const article = articleData[articleId];
    if (article) {
        alert(`${article.title}\n\n${article.category}\n${article.author}\n\n${article.content}`);
    }
}

// Handle article clicks
document.querySelectorAll('[data-article]').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        const articleId = this.getAttribute('data-article');
        showArticle(articleId);
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('button');

    btn.textContent = 'Subscribed!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        input.value = '';
    }, 2000);
});

// Subscribe button handling
const subscribeBtn = document.querySelector('.btn-subscribe');
subscribeBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = prompt('Enter your email to subscribe to our newsletter:');
    if (email && email.includes('@')) {
        alert(`Thank you for subscribing! A confirmation email has been sent to ${email}.`);
    } else if (email) {
        alert('Please enter a valid email address.');
    }
});

// Search button handling
const searchBtn = document.querySelector('.btn-search');
searchBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    const query = prompt('What would you like to search for?');
    if (query) {
        alert(`Searching for: "${query}"\n\nResults:\n- Article about ${query}\n- News related to ${query}\n- Opinion piece on ${query}`);
    }
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
    .featured-main,
    .article-card,
    .article-row,
    .sidebar-section
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.05}s, transform 0.5s ease ${(index % 4) * 0.05}s`;
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

// Update current date
const dateElement = document.querySelector('.header-date');
if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}

// Smooth scroll for any internal links
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

// Image lazy loading with fade effect
const images = document.querySelectorAll('.article-image img');

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';

    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});
