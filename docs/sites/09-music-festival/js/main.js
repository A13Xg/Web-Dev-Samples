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

// Countdown timer
const festivalDate = new Date('2024-08-16T14:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = festivalDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.querySelector('[data-days]');
    const hoursEl = document.querySelector('[data-hours]');
    const minutesEl = document.querySelector('[data-minutes]');
    const secondsEl = document.querySelector('[data-seconds]');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('.btn');

    btn.textContent = 'Subscribed!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        input.value = '';
    }, 2000);
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
    .lineup-day,
    .experience-card,
    .ticket-card,
    .info-card,
    .section-header
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.1}s, transform 0.5s ease ${(index % 4) * 0.1}s`;
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

// Hero content animation on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Ticket modal helpers
let _ticketPrice = 0;

function purchaseTicket(ticketType, price) {
    const modal = document.getElementById('ticket-modal');
    document.getElementById('modal-ticket-type').textContent = ticketType;
    document.getElementById('modal-ticket-price').textContent = price;
    document.getElementById('modal-qty').value = '1';
    document.getElementById('modal-name').value = '';
    document.getElementById('modal-email').value = '';
    document.getElementById('ticket-modal-error').style.display = 'none';
    document.getElementById('ticket-modal-form').style.display = '';
    document.getElementById('ticket-modal-confirmation').style.display = 'none';
    _ticketPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
    document.getElementById('modal-total').textContent = price;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function updateModalTotal() {
    const qty = parseInt(document.getElementById('modal-qty').value, 10) || 1;
    const total = _ticketPrice * qty;
    document.getElementById('modal-total').textContent = '$' + total;
}

function closeTicketModal(event) {
    if (event && event.target !== document.getElementById('ticket-modal')) return;
    document.getElementById('ticket-modal').style.display = 'none';
    document.body.style.overflow = '';
}

function submitTicketPurchase() {
    const name = document.getElementById('modal-name').value.trim();
    const email = document.getElementById('modal-email').value.trim();
    const errorEl = document.getElementById('ticket-modal-error');

    if (!name) {
        errorEl.textContent = 'Please enter your full name.';
        errorEl.style.display = '';
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.style.display = '';
        return;
    }
    errorEl.style.display = 'none';

    const qty = parseInt(document.getElementById('modal-qty').value, 10) || 1;
    const ticketType = document.getElementById('modal-ticket-type').textContent;
    const total = '$' + (_ticketPrice * qty);
    const orderNum = String(Math.floor(100000 + Math.random() * 900000));

    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-order').textContent = orderNum;
    document.getElementById('confirm-tickets').textContent = qty + 'x ' + ticketType;
    document.getElementById('confirm-total').textContent = total;

    document.getElementById('ticket-modal-form').style.display = 'none';
    document.getElementById('ticket-modal-confirmation').style.display = '';
}

// ─── Artist data ─────────────────────────────────────────────────────────────
const ARTIST_DATA = {
    'The Echoes': {
        genre: 'Indie Rock / Alternative',
        bio: 'The Echoes are a Los Angeles-based quartet known for their electrifying live performances and anthemic sound that blends shoegaze textures with arena-rock energy. Since their breakthrough album "Reverb Coast" in 2021, they\'ve headlined venues across the globe and earned a devoted multi-generational following.',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
        time: 'Fri 10:00 PM · Main Stage',
        instagram: '@theechoesband',
        spotify: 'The Echoes',
    },
    'Neon Dreams': {
        genre: 'Synth-Pop / Electronic',
        bio: 'Neon Dreams craft shimmering electronic landscapes with cinematic vocals and pulsing basslines. Their 2023 album "Ultraviolet" debuted at #3 on the Billboard Dance chart, earning them three Grammy nominations and a devoted global following.',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&h=400&fit=crop',
        time: 'Sat 10:00 PM · Main Stage',
        instagram: '@neon_dreams_official',
        spotify: 'Neon Dreams',
    },
    'Midnight Sun': {
        genre: 'Psychedelic Pop / Dream Pop',
        bio: 'From Oslo to the world — Midnight Sun create hypnotic soundscapes steeped in Scandinavian mysticism and modern electronics. Their immersive live show, featuring custom light rigs and synchronized visuals, is considered one of the most breathtaking spectacles in festival culture.',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop',
        time: 'Sun 9:00 PM · Main Stage',
        instagram: '@midnightsunofficial',
        spotify: 'Midnight Sun',
    },
    'Luna Nova': {
        genre: 'Electronic / Future Bass',
        bio: 'Luna Nova is the project of Brooklyn-based producer and vocalist Maya Chen. Blending jazz harmonics with contemporary electronic production, her live sets are a deeply personal, immersive journey through sound and memory.',
        time: 'Fri 8:00 PM · Horizon Stage',
        instagram: '@lunanova_music',
        spotify: 'Luna Nova',
    },
    'DJ Prism': {
        genre: 'Techno / Club',
        bio: 'DJ Prism is a Berlin-trained selector whose marathon sets are legendary in underground club circles. Playing across 4 decks with a raw, percussive style, he keeps dancefloors moving until sunrise with a masterful blend of classic techno and forward-thinking electronica.',
        time: 'Fri 6:30 PM · Electric Tent',
        instagram: '@djprism',
        spotify: 'DJ Prism',
    },
    'Solar Winds': {
        genre: 'Progressive Rock',
        bio: 'Solar Winds bring guitar-driven progressive rock back to festival stages with their signature blend of heavy riffs, ethereal melodies, and 10-minute odysseys. Their double-album "Stellar Drift" is widely considered a modern progressive rock classic.',
        time: 'Fri 5:00 PM · Main Stage',
        instagram: '@solarwindsband',
        spotify: 'Solar Winds',
    },
    'Velocity': {
        genre: 'Drum & Bass / Electronic',
        bio: 'Velocity are a high-octane D&B duo from Bristol whose breakneck tempos and intricate sound design have earned them a fanatical following across Europe and North America. Expect sub-bass frequencies you\'ll feel in your chest.',
        time: 'Sat 8:00 PM · Horizon Stage',
        instagram: '@velocityofficial',
        spotify: 'Velocity',
    },
    'Crystal Lake': {
        genre: 'Folk / Indie Folk',
        bio: "Crystal Lake's tender songwriting and lush string arrangements offer a moment of stillness amid the festival's energy. Their 2022 album \"Reflections\" topped folk charts in 12 countries and is widely regarded as one of the finest folk records of the decade.",
        time: 'Sat 6:30 PM · Acoustic Grove',
        instagram: '@crystallakemusic',
        spotify: 'Crystal Lake',
    },
    'Binary Code': {
        genre: 'Industrial Techno',
        bio: 'Binary Code make confrontational, brutalist electronic music that challenges and overwhelms in equal measure. Their sets are a relentless assault of machine rhythms and distorted frequencies — essential listening for serious dance-music devotees.',
        time: 'Sat 5:00 PM · Electric Tent',
        instagram: '@binarycode_music',
        spotify: 'Binary Code',
    },
    'Aurora': {
        genre: 'Ambient Pop / Art Pop',
        bio: "Aurora creates celestial pop music that floats between waking and dreaming. Her voice — described as 'otherworldly' by Rolling Stone — paired with lush orchestral arrangements has established her as one of the most distinctive artists of her generation.",
        time: 'Sun 7:30 PM · Horizon Stage',
        instagram: '@aurora_official',
        spotify: 'Aurora',
    },
    'The Satellites': {
        genre: 'Post-Punk / Alternative',
        bio: 'The Satellites are a kinetic post-punk outfit from Chicago whose serrated guitars and razor-sharp lyrics have made them a critical darling since their 2020 debut. Expect mosh pits, crowd surfers, and a set that leaves everyone hoarse.',
        time: 'Sun 6:00 PM · Main Stage',
        instagram: '@thesatellitesband',
        spotify: 'The Satellites',
    },
    'Cosmic Rays': {
        genre: 'Afrobeats / Electronic',
        bio: 'Cosmic Rays fuse Nigerian Afrobeats with electronic production and jazz improvisation, creating infectious grooves that transcend genre. Their Glastonbury 2023 debut was named one of the best festival sets of the decade by NME.',
        time: 'Sun 4:30 PM · Electric Tent',
        instagram: '@cosmicraysmusic',
        spotify: 'Cosmic Rays',
    },
};

// ─── Full lineup data ─────────────────────────────────────────────────────────
const FULL_LINEUP = {
    friday: [
        { stage: 'Main Stage', artists: [
            { name: 'The Echoes',   time: '10:00 PM', headliner: true },
            { name: 'Solar Winds', time: '5:00 PM' },
            { name: 'Parallax',    time: '3:30 PM' },
            { name: 'The Drift',   time: '2:00 PM' },
            { name: 'Sunsetter',   time: '12:30 PM' },
        ]},
        { stage: 'Horizon Stage', artists: [
            { name: 'Luna Nova',      time: '8:00 PM' },
            { name: 'Seraphine',      time: '6:30 PM' },
            { name: 'Goldwing',       time: '5:00 PM' },
            { name: 'Echo Chamber',   time: '3:30 PM' },
            { name: 'Harbour Lights', time: '2:00 PM' },
        ]},
        { stage: 'Electric Tent', artists: [
            { name: 'DJ Prism',     time: '6:30 PM' },
            { name: 'Subsurface',   time: '5:00 PM' },
            { name: 'Kilohertz',    time: '3:30 PM' },
            { name: 'Static Atlas', time: '2:30 PM' },
        ]},
        { stage: 'Acoustic Grove', artists: [
            { name: 'Meadow Song',    time: '7:00 PM' },
            { name: 'The Pine Notes', time: '5:30 PM' },
            { name: 'River Hollow',   time: '4:00 PM' },
            { name: 'Fern & Oak',     time: '2:30 PM' },
        ]},
    ],
    saturday: [
        { stage: 'Main Stage', artists: [
            { name: 'Neon Dreams',  time: '10:00 PM', headliner: true },
            { name: 'Violet Pulse', time: '7:00 PM' },
            { name: 'Grand Orbit',  time: '5:30 PM' },
            { name: 'Tidal Wave',   time: '3:00 PM' },
            { name: 'Circuit Blue', time: '1:30 PM' },
        ]},
        { stage: 'Horizon Stage', artists: [
            { name: 'Velocity',   time: '8:00 PM' },
            { name: 'Flux State', time: '6:30 PM' },
            { name: 'Deep Pulse', time: '5:00 PM' },
            { name: 'Moontrack',  time: '3:30 PM' },
        ]},
        { stage: 'Electric Tent', artists: [
            { name: 'Waveform',       time: '9:00 PM' },
            { name: 'Nocturne',       time: '7:00 PM' },
            { name: 'Binary Code',    time: '5:00 PM' },
            { name: 'Iron Frequency', time: '3:30 PM' },
        ]},
        { stage: 'Acoustic Grove', artists: [
            { name: 'Crystal Lake', time: '6:30 PM' },
            { name: 'Willow Tree',  time: '5:00 PM' },
            { name: 'Sunset Keys',  time: '3:30 PM' },
            { name: 'Morning Dew',  time: '2:00 PM' },
        ]},
    ],
    sunday: [
        { stage: 'Main Stage', artists: [
            { name: 'Midnight Sun',    time: '9:00 PM', headliner: true },
            { name: 'The Satellites',  time: '6:00 PM' },
            { name: 'Gravity Well',    time: '4:30 PM' },
            { name: 'Stardust Parade', time: '3:00 PM' },
            { name: 'Afterglow',       time: '1:30 PM' },
        ]},
        { stage: 'Horizon Stage', artists: [
            { name: 'Aurora',      time: '7:30 PM' },
            { name: 'Prism Light', time: '6:00 PM' },
            { name: 'Veil',        time: '4:30 PM' },
            { name: 'New Depth',   time: '3:00 PM' },
        ]},
        { stage: 'Electric Tent', artists: [
            { name: 'Solar Storm', time: '8:00 PM' },
            { name: 'Deep Echo',   time: '6:30 PM' },
            { name: 'Cosmic Rays', time: '4:30 PM' },
            { name: 'Overload',    time: '3:00 PM' },
        ]},
        { stage: 'Acoustic Grove', artists: [
            { name: 'Ember Road',      time: '6:30 PM' },
            { name: 'Paper Moon',      time: '5:00 PM' },
            { name: 'The Quiet Hours', time: '3:30 PM' },
            { name: 'Last Light',      time: '2:00 PM' },
        ]},
    ],
};

// ─── Generic modal helpers ────────────────────────────────────────────────────
function closeModal(id, event) {
    if (event && event.target !== document.getElementById(id)) return;
    document.getElementById(id).style.display = 'none';
    document.body.style.overflow = '';
}

// Escape key closes any open modal
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['ticket-modal', 'faq-modal', 'contact-modal', 'artist-modal', 'lineup-modal'].forEach((id) => {
        const m = document.getElementById(id);
        if (m && m.style.display !== 'none') {
            m.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// ─── Full lineup modal ────────────────────────────────────────────────────────
function showFullLineup() {
    const modal = document.getElementById('lineup-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    switchLineupDay('friday', document.querySelector('.lineup-modal-day-btn'));
}

function switchLineupDay(day, btn) {
    document.querySelectorAll('.lineup-modal-day-btn').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const content = document.getElementById('lineup-modal-content');
    const stages = FULL_LINEUP[day] || [];
    content.innerHTML = stages.map(({ stage, artists }) => {
        const rows = artists.map((a) => {
            const known = !!ARTIST_DATA[a.name];
            const cls = known ? 'lineup-modal-artist lineup-modal-artist--known' : 'lineup-modal-artist';
            const handler = known
                ? `onclick="closeModal('lineup-modal'); showArtist('${a.name}')"`
                : '';
            return `<div class="${cls}" ${handler}>
                <span class="lm-artist-name">${a.name}${a.headliner ? ' &#9733;' : ''}</span>
                <span class="lm-artist-meta">${a.time}</span>
            </div>`;
        }).join('');
        return `<div class="lineup-modal-stage">
            <div class="lineup-modal-stage-name">${stage}</div>
            ${rows}
        </div>`;
    }).join('');
}

// ─── FAQ modal ────────────────────────────────────────────────────────────────
function showFAQ() {
    document.getElementById('faq-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function toggleFAQ(btn) {
    btn.closest('.faq-item').classList.toggle('open');
}

// ─── Contact modal ────────────────────────────────────────────────────────────
function showContact() {
    document.getElementById('contact-form-wrap').style.display = '';
    document.getElementById('contact-success-wrap').style.display = 'none';
    ['contact-name', 'contact-email', 'contact-message'].forEach((id) => {
        document.getElementById(id).value = '';
    });
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-error').style.display = 'none';
    document.getElementById('contact-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function submitContactForm() {
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const errorEl = document.getElementById('contact-error');

    if (!name) {
        errorEl.textContent = 'Please enter your name.';
        errorEl.style.display = '';
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.style.display = '';
        return;
    }
    if (!message) {
        errorEl.textContent = 'Please enter a message.';
        errorEl.style.display = '';
        return;
    }
    errorEl.style.display = 'none';
    document.getElementById('contact-confirm-email').textContent = email;
    document.getElementById('contact-form-wrap').style.display = 'none';
    document.getElementById('contact-success-wrap').style.display = '';
}

// ─── Artist detail modal ──────────────────────────────────────────────────────
function showArtist(name) {
    const data = ARTIST_DATA[name];
    if (!data) return;

    const instagramHandle = data.instagram.replace('@', '');
    const spotifyQuery    = encodeURIComponent(data.spotify);
    const hasImage        = !!data.image;

    const heroHTML = hasImage
        ? `<div class="artist-modal-hero">
               <img src="${data.image}" alt="${name}">
               <div class="artist-modal-hero-overlay"></div>
               <div class="artist-modal-name">${name}</div>
           </div>`
        : `<div class="artist-modal-no-hero">
               <div class="artist-modal-name-top">${name}</div>
           </div>`;

    document.getElementById('artist-modal-inner').innerHTML = `
        <button class="modal-close" onclick="closeModal('artist-modal')" aria-label="Close">&times;</button>
        ${heroHTML}
        <div class="artist-modal-meta">
            <span class="artist-modal-tag">${data.genre}</span>
            <span class="artist-modal-time">&#128340; ${data.time}</span>
        </div>
        <p class="artist-modal-bio">${data.bio}</p>
        <div class="artist-modal-socials">
            <a href="https://instagram.com/${instagramHandle}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                ${data.instagram}
            </a>
            <a href="https://open.spotify.com/search/${spotifyQuery}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Listen on Spotify
            </a>
        </div>
    `;

    document.getElementById('artist-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
