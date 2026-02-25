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

// Show full lineup handler
function showFullLineup() {
    const lineupSection = document.getElementById('lineup');
    alert('Full Lineup:\n\nFriday (4 additional artists)\nSaturday (4 additional artists)\nSunday (4 additional artists)\n\nPlus 50+ more artists performing across Main Stage, Horizon Stage, Electric Tent, and Acoustic Grove.\n\nScroll to the lineup section for main headliners!');
    if (lineupSection) {
        lineupSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show FAQ handler
function showFAQ() {
    const faqContent = `
Frequently Asked Questions:

Q: What should I bring?
A: Tickets, ID, sunscreen, comfortable shoes, and a water bottle.

Q: Are there camping options?
A: Yes! On-site camping, car camping, tent camping, and glamping packages are available.

Q: Can I bring outside food/drinks?
A: No outside beverages. Food vendors are available throughout the festival.

Q: What's the parking situation?
A: Free parking is available in designated lots. Arrive early for best spots.

Q: Are there refunds?
A: No refunds, but tickets are transferable.

Q: What if it rains?
A: The festival continues in light rain. Bring a poncho!

Q: Are dogs allowed?
A: Service animals only at this festival.

Q: Can I re-enter after leaving?
A: Yes, hand stamps allow re-entry same day.
    `;
    alert(faqContent);
}

// Show contact handler
function showContact() {
    alert('Contact Information:\n\nEmail: info@horizonfest.com\nPhone: 1-800-HORIZON-1\nWebsite: www.horizonfest.com\n\nFollow us on social media for updates!');
}
