// ===== CART STATE =====
let cart = [
    {
        id: 1,
        name: 'Oversized Wool Blazer',
        variant: 'Black / Size M',
        price: 289,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=260&fit=crop'
    },
    {
        id: 2,
        name: 'Mini Leather Bag',
        variant: 'Tan',
        price: 245,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=260&fit=crop'
    }
];

// ===== CART FUNCTIONS =====
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const cartIcon = document.querySelector('.cart-icon');
const cartClose = document.querySelector('.cart-close');
const cartContinue = document.querySelector('.cart-continue');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartHeaderCount = document.querySelector('.cart-header-count');
const cartTotalPrice = document.querySelector('.cart-total-price');

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.classList.add('cart-open');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.classList.remove('cart-open');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    if (cartHeaderCount) cartHeaderCount.textContent = totalItems;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalPrice) cartTotalPrice.textContent = `$${total}`;
}

function renderCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>
                </svg>
                <p>Your cart is empty</p>
                <button class="btn btn-dark cart-continue-shopping">Continue Shopping</button>
            </div>
        `;

        const continueBtn = cartItemsContainer.querySelector('.cart-continue-shopping');
        continueBtn?.addEventListener('click', closeCart);
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-variant">${item.variant}</span>
                    <span class="cart-item-price">$${item.price}</span>
                    <div class="cart-item-quantity">
                        <button class="qty-btn qty-minus" aria-label="Decrease quantity">−</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn qty-plus" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="cart-item-remove">Remove</button>
                </div>
            </div>
        `).join('');

        // Add event listeners for quantity buttons
        cartItemsContainer.querySelectorAll('.cart-item').forEach(itemEl => {
            const itemId = parseInt(itemEl.dataset.id);

            itemEl.querySelector('.qty-minus')?.addEventListener('click', () => {
                updateQuantity(itemId, -1);
            });

            itemEl.querySelector('.qty-plus')?.addEventListener('click', () => {
                updateQuantity(itemId, 1);
            });

            itemEl.querySelector('.cart-item-remove')?.addEventListener('click', () => {
                removeFromCart(itemId);
            });
        });
    }

    updateCartCount();
    updateCartTotal();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            ...product,
            quantity: 1
        });
    }

    renderCart();
    openCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCart();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    renderCart();
}

// Cart event listeners
cartIcon?.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

// Search icon handler
const searchIcon = document.querySelector('.search-icon');
searchIcon?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Search functionality: Type to search for products, collections, or articles');
});

// Account icon handler
const accountIcon = document.querySelector('.account-icon');
accountIcon?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Account\n\nSign In to access your profile, orders, and wishlist\n\nNew customer? Create an account to get started');
});

cartClose?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);
cartContinue?.addEventListener('click', closeCart);

// Close cart with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar?.classList.contains('active')) {
        closeCart();
    }
});

// Initialize cart display
renderCart();

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// ===== TAB NAVIGATION =====
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ===== QUICK ADD TO CART =====
const quickAddBtns = document.querySelectorAll('.quick-add');

// Product data for quick add
const productData = {
    'Oversized Wool Blazer': { price: 289, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=260&fit=crop', variant: 'Black / Size M' },
    'Silk Drape Blouse': { price: 165, image: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=200&h=260&fit=crop', variant: 'White / Size S' },
    'High-Waist Trousers': { price: 136, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=200&h=260&fit=crop', variant: 'Black / Size M' },
    'Mini Leather Bag': { price: 245, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=260&fit=crop', variant: 'Tan' },
    'Cashmere Crewneck': { price: 320, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=260&fit=crop', variant: 'Charcoal / Size M' },
    'Double-Breasted Coat': { price: 495, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&h=260&fit=crop', variant: 'Camel / Size M' },
    'Leather Low-Top Sneakers': { price: 185, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=260&fit=crop', variant: 'White / Size 10' },
    'Minimalist Watch': { price: 275, image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=200&h=260&fit=crop', variant: 'Silver' }
};

quickAddBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Get product name from the card
        const card = btn.closest('.product-card');
        const productName = card.querySelector('.product-info h3')?.textContent;

        if (productName && productData[productName]) {
            const product = {
                name: productName,
                ...productData[productName]
            };

            // Visual feedback
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            btn.style.background = '#22c55e';
            btn.style.color = 'white';

            // Add to cart
            addToCart(product);

            // Reset button after delay
            setTimeout(() => {
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                `;
                btn.style.background = 'white';
                btn.style.color = '';
            }, 1500);
        }
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('.btn');

    btn.textContent = 'Subscribed!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = 'white';
        input.value = '';
    }, 2000);
});

// ===== SCROLL REVEAL =====
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
    .category-card,
    .product-card,
    .editorial-content,
    .feature
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

// ===== IMAGE LAZY LOADING =====
const images = document.querySelectorAll('.product-image img, .category-image img');

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

// ===== SMOOTH SCROLL =====
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

// ===== CHECKOUT BUTTON =====
const checkoutBtn = document.querySelector('.cart-checkout');

checkoutBtn?.addEventListener('click', () => {
    alert('Checkout functionality would be implemented here!');
});
