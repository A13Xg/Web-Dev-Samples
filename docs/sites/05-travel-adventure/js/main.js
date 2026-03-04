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

// ===== DESTINATION & STORY MODALS =====

const destinationData = {
    bali: {
        name: 'Bali, Indonesia',
        region: 'Southeast Asia',
        img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&h=600&fit=crop',
        season: 'May – Sep',
        language: 'Indonesian',
        currency: 'IDR',
        timezone: 'UTC+8',
        description: 'Bali is a living postcard, an Indonesian paradise that feels like a dream. With its volcanic mountains and verdant rice terraces, ancient Hindu temples and pristine beaches, the island offers a captivating blend of the spiritual and the spectacular. Whether you\'re seeking world-class surf, meditative stillness, or vibrant nightlife, Bali has something for every traveller.',
        highlights: ['Tanah Lot Temple', 'Ubud Rice Terraces', 'Seminyak Beach', 'Mount Batur'],
        storyCount: 12,
    },
    kyoto: {
        name: 'Kyoto, Japan',
        region: 'East Asia',
        img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop',
        season: 'Mar–May / Sep–Nov',
        language: 'Japanese',
        currency: 'JPY',
        timezone: 'UTC+9',
        description: 'Once the imperial capital of Japan, Kyoto is a city where geishas still glide through lantern-lit streets and Buddhist monks chant in mist-shrouded temples. Thousands of wooden shrines, perfectly manicured Zen gardens, and tea-ceremony pavilions make Kyoto the cultural heart of Japan. Visit in cherry-blossom season or autumn foliage for an unforgettable visual spectacle.',
        highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Temple', 'Gion District'],
        storyCount: 8,
    },
    amalfi: {
        name: 'Amalfi Coast, Italy',
        region: 'Europe',
        img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&h=600&fit=crop',
        season: 'May – Oct',
        language: 'Italian',
        currency: 'EUR',
        timezone: 'UTC+2',
        description: 'The Amalfi Coast is a shimmering stretch of southern Italian coastline draped with colourful fishing villages, dramatic limestone cliffs, and turquoise Mediterranean waters. This UNESCO World Heritage Site enchants visitors with its fragrant lemon groves, winding cliff roads, and centuries-old seafaring culture. Each village—from Positano to Ravello—offers its own unique character and breathtaking views.',
        highlights: ['Positano Village', 'Ravello Gardens', 'Amalfi Cathedral', 'Blue Grotto Cave'],
        storyCount: 15,
    },
    maldives: {
        name: 'Maldives',
        region: 'Indian Ocean',
        img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200&h=600&fit=crop',
        season: 'Nov – Apr',
        language: 'Dhivehi',
        currency: 'MVR',
        timezone: 'UTC+5',
        description: 'The Maldives is the world\'s lowest-lying nation—a scattered necklace of coral atolls draped across the Indian Ocean. With some of the clearest water on Earth, teeming reef ecosystems, and overwater bungalows that place you directly above the lagoon, this is where luxury and nature coexist in perfect harmony. An ideal destination for honeymooners, divers, and those seeking absolute tranquility.',
        highlights: ['North Malé Atoll', 'Baa Atoll Biosphere Reserve', 'Ithaa Undersea Restaurant', 'Whale Shark Snorkeling'],
        storyCount: 6,
    },
    iceland: {
        name: 'Iceland',
        region: 'Nordic',
        img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&h=600&fit=crop',
        season: 'Jun–Aug / Dec–Feb',
        language: 'Icelandic',
        currency: 'ISK',
        timezone: 'UTC+0',
        description: 'Iceland is a raw, elemental landscape where fire and ice wage an eternal contest for the land. Glaciers spill into black-sand beaches, geysers explode from geothermal plains, and the Northern Lights ripple across winter skies. Whether you\'re hiking on lava fields, soaking in hot springs, or chasing the midnight sun, Iceland delivers experiences that simply cannot be found anywhere else on the planet.',
        highlights: ['Jökulsárlón Glacier Lagoon', 'Geysir Hot Springs', 'Skógafoss Waterfall', 'Blue Lagoon'],
        storyCount: 10,
    },
};

const storyData = {
    'swiss-alps': {
        title: 'The Swiss Alps: Peaks, Valleys & Alpine Wonder',
        category: 'Adventure',
        img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop',
        author: 'Wanderlust Editorial',
        authorImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
        date: 'April 1, 2024',
        readTime: '6 min read',
        content: [
            'The Swiss Alps have long occupied a mythical place in the traveller\'s imagination—a realm of glacier-carved valleys, crystalline lakes, and peaks that pierce the clouds. Standing at the summit of the Jungfraujoch, the "Top of Europe" at 3,454 metres, you feel both utterly insignificant and inexplicably alive. The silence up there is total, broken only by the hiss of wind across permanent snowfields.',
            'Summer brings a different kind of magic. Alpine meadows erupt in wildflowers—gentian blue, edelweiss white, and buttercup yellow—while cable cars ferry hikers to trails that cross between Switzerland, France, and Italy. The Tour du Mont Blanc, a 170-kilometre circuit around the massif, passes through three countries and treats walkers to the full Alpine experience over eleven days. Even a single day\'s hike above Grindelwald or Zermatt rewards you with views that photographers spend entire careers trying to capture.',
            'In winter, the Alps transform into Europe\'s premier ski playground. Resorts like Verbier, St. Moritz, and Zermatt—where the iconic Matterhorn looms over the piste—cater to everyone from first-time skiers to freeriding experts. But après-ski culture is every bit as important: fondue in a candlelit chalet, a glass of Valais wine, stories shared by a crackling fire. The Swiss Alps are, in the end, a place that rewards every season and every type of traveller.',
        ],
    },
    'northern-lights': {
        title: 'Chasing the Northern Lights: A Complete Guide to Aurora Hunting',
        category: 'Adventure',
        img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=500&fit=crop',
        author: 'Sarah Mitchell',
        authorImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
        date: 'March 15, 2024',
        readTime: '8 min read',
        content: [
            'Few natural spectacles rival the Aurora Borealis. I\'ve stood beneath these shimmering curtains of green, violet, and crimson light on four separate expeditions—in Iceland, northern Norway, Finnish Lapland, and Canada\'s Yukon—and each time the emotion is identical: pure, wordless awe. Seeing the sky dance is one of those bucket-list experiences that genuinely lives up to the hype, but chasing it successfully takes planning.',
            'The ideal aurora-hunting window falls between late September and late March, when nights are long enough at high latitudes. Aim for destinations above the 65th parallel: Tromsø in Norway, Abisko in Sweden, Rovaniemi in Finland, and Iceland\'s Reykjavik region are perennial favourites. Crucially, you need darkness, so avoid full moons and city light pollution. Book a remote cabin or hire a guide who will drive you away from towns. App-based KP-index forecasters let you track geomagnetic storm activity in real time—download one before you go.',
            'The most important lesson I\'ve learned: patience is everything. My most spectacular display came on the third night of a four-night stay in Tromsø, after two nights of cloud cover. We were almost back at our cabin when the sky detonated in green. We stood outside for two hours in −18°C, necks craned upward, nobody saying a word. Dress in serious layered winter clothing, bring hand warmers, and keep your camera battery warm inside your jacket until you need it. Then be prepared to forget you\'re even cold.',
        ],
    },
    medinas: {
        title: 'Lost in the Medinas: Exploring Morocco\'s Ancient Cities',
        category: 'Culture',
        img: 'https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=1200&h=500&fit=crop',
        author: 'James Porter',
        authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
        date: 'March 10, 2024',
        readTime: '6 min read',
        content: [
            'There is no map useful enough for Fès el-Bali—the world\'s largest car-free urban area and arguably the most labyrinthine medina in existence. The UNESCO-listed old city contains over 9,000 narrow alleys, and at any given moment you are probably heading in entirely the wrong direction. I surrendered to this within the first hour and discovered that getting lost here is the entire point. Every wrong turn reveals another hidden courtyard, another tiled fountain, another family workshop where artisans practise crafts unchanged for eight centuries.',
            'Marrakech\'s Djemaa el-Fna square is the theatrical heart of Morocco\'s medina culture. By night, it transforms into a sprawling outdoor spectacle—acrobats and gnawa musicians, snake charmers and storytellers, dozens of smoke-wreathed food stalls selling harira soup, lamb skewers, and freshly squeezed orange juice. The medieval tanneries near the Chouara quarter in Fès operate much as they did in the 11th century: workers standing waist-deep in vats of natural dyes—saffron, poppy, indigo—softening and colouring leather by hand.',
            'Morocco rewards those who venture beyond the obvious. The blue-washed streets of Chefchaouen in the Rif Mountains offer a cooler, quieter medina experience. The desert town of Merzouga sits at the edge of the Sahara; from there, a camel trek into the Erg Chebbi dunes leads you to a Berber camp where you sleep under more stars than seem possible. Morocco is a place of profound sensory overload, and all of it—the colour, the noise, the food, the history—is entirely, utterly worth it.',
        ],
    },
    'beach-guide': {
        title: 'The Ultimate Beach Guide: 10 Hidden Gems',
        category: 'Relaxation',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=500&fit=crop',
        author: 'Emma Chen',
        authorImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
        date: 'March 5, 2024',
        readTime: '5 min read',
        content: [
            'The world\'s most famous beaches—Copacabana, Bondi, Waikiki—are undeniably magnificent, but they come with crowds, queues, and curated Instagram moments at every turn. For travellers willing to do a little extra research and accept the occasional bumpy road, the rewards are extraordinary: beaches so quiet that the only footprints in the sand are your own, water so clear you can count the fish from the surface.',
            'Navagio Beach on the Greek island of Zakynthos is accessible only by boat, which keeps it blissfully quiet outside peak hour. The wreck of the MV Panagiotis—run aground in 1983—rusts picturesquely in one corner of the enclosed cove, surrounded by white pebbles and impossibly blue water. On the other side of the planet, Nacpan Beach on Palawan in the Philippines offers four kilometres of uninterrupted golden sand and virtually none of the tourist infrastructure that has colonised nearby El Nido. Anse Source d\'Argent in the Seychelles, with its pink-tinged granite boulders emerging from shallow turquoise water, is regularly cited as the most photographed beach on Earth—and it still feels secret.',
            'The golden rule of hidden-beach hunting: go off-season whenever possible. Even the most crowd-prone destinations become genuinely tranquil outside July and August. The shoulder months of May, June, September, and October typically offer warm water, lower prices, and the luxury of having an idyllic stretch of sand largely to yourself. Pack light, bring reef-safe sunscreen, and resist the urge to share the coordinates on social media—let the secret keep a little longer.',
        ],
    },
    fjords: {
        title: 'Kayaking Through Norway\'s Fjords',
        category: 'Adventure',
        img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=500&fit=crop',
        author: 'Lars Eriksen',
        authorImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
        date: 'February 28, 2024',
        readTime: '7 min read',
        content: [
            'Seen from a kayak at water level, Norway\'s Nærøyfjord—a UNESCO World Heritage Site and the narrowest fjord in Europe—is genuinely overwhelming. On either side, granite walls rise almost 1,700 metres from the dark, mirror-still water, their sheer faces streaked white with dozens of cascading waterfalls. The scale is so immense that clouds form and dissolve against the cliff faces while you watch. Paddling here, in near-total silence broken only by dripping water and the occasional cry of a white-tailed eagle, is one of the most meditative experiences available to an adventure traveller.',
            'The Sognefjord, Norway\'s longest and deepest fjord at 204 kilometres, offers everything from multi-day paddle touring expeditions to afternoon rentals from villages like Flåm and Balestrand. A typical day might involve paddling ten kilometres through glassy water in the morning, landing on a tiny gravel beach for a thermos-and-packed-lunch stop, and returning via a different channel past floating ice calved from a nearby glacier. In midsummer, the sun barely sets, meaning you can paddle at 11pm under a sky the colour of rose gold.',
            'For beginners, guided half-day tours from Gudvangen or Undredal are the ideal introduction—no prior kayaking experience required, all equipment provided. Those with more experience can hire sea kayaks for multi-day self-guided tours, camping on forested shores or in trailhead huts. The physical demands are real—fjord winds can push against you with surprising force—but the reward is total immersion in one of Europe\'s last great wilderness landscapes. Bring waterproof layers, a hat, and a healthy respect for cold water, and Norway\'s fjords will give you stories you\'ll tell for the rest of your life.',
        ],
    },
};

function openDestinationModal(key) {
    const data = destinationData[key];
    if (!data) return;
    const modal = document.getElementById('destination-modal');
    document.getElementById('dest-modal-img').src = data.img;
    document.getElementById('dest-modal-img').alt = data.name;
    document.getElementById('dest-modal-region').textContent = data.region;
    document.getElementById('dest-modal-name').textContent = data.name;
    document.getElementById('dest-fact-season').textContent = data.season;
    document.getElementById('dest-fact-lang').textContent = data.language;
    document.getElementById('dest-fact-currency').textContent = data.currency;
    document.getElementById('dest-fact-tz').textContent = data.timezone;
    document.getElementById('dest-modal-desc').textContent = data.description;
    document.getElementById('dest-btn-stories').textContent = `Browse ${data.storyCount} Stories`;
    const highlightsEl = document.getElementById('dest-modal-highlights');
    highlightsEl.innerHTML = data.highlights.map(h => `<div class="dest-highlight-item">${h}</div>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDestinationModal() {
    document.getElementById('destination-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function openStoryModal(key) {
    const data = storyData[key];
    if (!data) return;
    const modal = document.getElementById('story-modal');
    document.getElementById('story-modal-img').src = data.img;
    document.getElementById('story-modal-img').alt = data.title;
    document.getElementById('story-modal-category').textContent = data.category;
    document.getElementById('story-modal-title').textContent = data.title;
    document.getElementById('story-modal-author-img').src = data.authorImg;
    document.getElementById('story-modal-author-img').alt = data.author;
    document.getElementById('story-modal-author').textContent = data.author;
    document.getElementById('story-modal-date-read').textContent = `${data.date} · ${data.readTime}`;
    document.getElementById('story-modal-content').innerHTML = data.content.map(p => `<p>${p}</p>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeStoryModal() {
    document.getElementById('story-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close modals on backdrop click or Escape key
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('destination-modal')
        ?.querySelector('.modal-backdrop')
        .addEventListener('click', closeDestinationModal);
    document.getElementById('story-modal')
        ?.querySelector('.modal-backdrop')
        .addEventListener('click', closeStoryModal);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDestinationModal();
        closeStoryModal();
    }
});
