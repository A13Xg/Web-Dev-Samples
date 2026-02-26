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
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Build checkout modal
    const existing = document.getElementById('checkout-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'checkout-modal';
    modal.innerHTML = `
        <div class="checkout-overlay"></div>
        <div class="checkout-dialog">
            <button class="checkout-close" aria-label="Close">&times;</button>
            <div id="checkout-form-view">
                <h3 class="checkout-title">Checkout</h3>
                <div class="checkout-order-summary">
                    <p>${itemCount} item${itemCount !== 1 ? 's' : ''} — <strong>$${total}</strong></p>
                </div>
                <form id="checkout-form" novalidate>
                    <div class="co-section-label">Contact Information</div>
                    <div class="co-row">
                        <div class="co-field">
                            <label>First Name</label>
                            <input type="text" id="co-fname" placeholder="Jane" required>
                        </div>
                        <div class="co-field">
                            <label>Last Name</label>
                            <input type="text" id="co-lname" placeholder="Smith" required>
                        </div>
                    </div>
                    <div class="co-field">
                        <label>Email</label>
                        <input type="email" id="co-email" placeholder="jane@example.com" required>
                    </div>
                    <div class="co-section-label">Shipping Address</div>
                    <div class="co-field">
                        <label>Address</label>
                        <input type="text" id="co-address" placeholder="123 Main St" required>
                    </div>
                    <div class="co-row">
                        <div class="co-field">
                            <label>City</label>
                            <input type="text" id="co-city" placeholder="New York" required>
                        </div>
                        <div class="co-field">
                            <label>ZIP Code</label>
                            <input type="text" id="co-zip" placeholder="10001" required>
                        </div>
                    </div>
                    <div class="co-section-label">Payment</div>
                    <div class="co-field">
                        <label>Card Number</label>
                        <input type="text" id="co-card" placeholder="4242 4242 4242 4242" maxlength="19" required>
                    </div>
                    <div class="co-row">
                        <div class="co-field">
                            <label>Expiry</label>
                            <input type="text" id="co-expiry" placeholder="MM / YY" maxlength="7" required>
                        </div>
                        <div class="co-field">
                            <label>CVV</label>
                            <input type="text" id="co-cvv" placeholder="123" maxlength="3" required>
                        </div>
                    </div>
                    <p class="co-error" id="co-error" style="display:none;"></p>
                    <button type="submit" class="co-submit-btn">Place Order — $${total}</button>
                </form>
            </div>
            <div id="checkout-confirm-view" style="display:none;" class="checkout-confirm">
                <div class="checkout-confirm-icon">✓</div>
                <h3>Order Placed!</h3>
                <p>Thank you for your order. A confirmation has been sent to your email.</p>
                <p class="co-order-num">Order #<span id="co-order-number"></span></p>
                <a href="https://example.com/linkID-04001" target="_blank" rel="noopener noreferrer" class="co-track-btn">Track Order</a>
                <button class="co-close-btn">Continue Shopping</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Inject styles once
    if (!document.getElementById('checkout-modal-styles')) {
        const s = document.createElement('style');
        s.id = 'checkout-modal-styles';
        s.textContent = `
            #checkout-modal { position:fixed; inset:0; z-index:10000; display:flex; align-items:center; justify-content:center; }
            .checkout-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.6); }
            .checkout-dialog { position:relative; background:#fff; width:min(460px,96vw); max-height:90vh; overflow-y:auto; border-radius:16px; padding:32px; box-shadow:0 24px 60px rgba(0,0,0,0.3); }
            .checkout-close { position:absolute; top:16px; right:16px; background:none; border:none; font-size:22px; cursor:pointer; color:#666; padding:4px; }
            .checkout-title { font-size:20px; font-weight:700; margin-bottom:12px; letter-spacing:0.5px; }
            .checkout-order-summary { background:#f8f8f8; border-radius:8px; padding:10px 14px; margin-bottom:20px; font-size:14px; color:#444; }
            .co-section-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:#999; margin:18px 0 8px; }
            .co-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
            .co-field { display:flex; flex-direction:column; gap:4px; margin-bottom:12px; }
            .co-field label { font-size:12px; font-weight:600; color:#333; }
            .co-field input { padding:10px 12px; border:1px solid #ddd; border-radius:8px; font-size:14px; font-family:inherit; outline:none; transition:border-color .2s; }
            .co-field input:focus { border-color:#1a1a1a; }
            .co-error { color:#e53e3e; font-size:13px; margin-bottom:10px; }
            .co-submit-btn { width:100%; background:#1a1a1a; color:#fff; border:none; border-radius:10px; padding:14px; font-size:15px; font-weight:700; cursor:pointer; letter-spacing:0.5px; transition:background .2s; margin-top:4px; }
            .co-submit-btn:hover { background:#333; }
            .checkout-confirm { text-align:center; padding:20px 0 10px; }
            .checkout-confirm-icon { width:60px; height:60px; background:#1a1a1a; color:#fff; border-radius:50%; font-size:26px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
            .checkout-confirm h3 { font-size:22px; margin-bottom:8px; }
            .checkout-confirm p { color:#666; font-size:14px; margin-bottom:8px; }
            .co-order-num { font-weight:700; color:#1a1a1a !important; font-size:16px !important; }
            .co-track-btn { display:inline-block; margin:12px auto 8px; background:#1a1a1a; color:#fff; text-decoration:none; padding:11px 24px; border-radius:8px; font-size:14px; font-weight:600; }
            .co-close-btn { display:block; width:100%; background:none; border:1px solid #ddd; border-radius:8px; padding:10px; font-size:14px; cursor:pointer; margin-top:10px; }
        `;
        document.head.appendChild(s);
    }

    // Card number formatting
    document.getElementById('co-card')?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    });
    document.getElementById('co-expiry')?.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2, 4);
        e.target.value = v;
    });

    // Close
    const closeModal = () => modal.remove();
    modal.querySelector('.checkout-close')?.addEventListener('click', closeModal);
    modal.querySelector('.checkout-overlay')?.addEventListener('click', closeModal);
    modal.querySelector('.co-close-btn')?.addEventListener('click', () => {
        closeModal();
        closeCart();
    });

    // Form submit
    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const errEl = document.getElementById('co-error');
        const fname = document.getElementById('co-fname').value.trim();
        const lname = document.getElementById('co-lname').value.trim();
        const email = document.getElementById('co-email').value.trim();
        const address = document.getElementById('co-address').value.trim();
        const city = document.getElementById('co-city').value.trim();
        const zip = document.getElementById('co-zip').value.trim();
        const card = document.getElementById('co-card').value.replace(/\s/g, '');
        const expiry = document.getElementById('co-expiry').value.trim();
        const cvv = document.getElementById('co-cvv').value.trim();

        if (!fname || !lname) { errEl.textContent = 'Please enter your full name.'; errEl.style.display = 'block'; return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errEl.textContent = 'Please enter a valid email address.'; errEl.style.display = 'block'; return; }
        if (!address || !city || !zip) { errEl.textContent = 'Please fill in your shipping address.'; errEl.style.display = 'block'; return; }
        if (card.length < 16) { errEl.textContent = 'Please enter a valid card number.'; errEl.style.display = 'block'; return; }
        if (!expiry || cvv.length < 3) { errEl.textContent = 'Please enter valid expiry and CVV.'; errEl.style.display = 'block'; return; }

        // Show confirmation
        const orderNum = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('co-order-number').textContent = orderNum;
        document.getElementById('checkout-form-view').style.display = 'none';
        document.getElementById('checkout-confirm-view').style.display = 'block';

        // Clear cart
        cart = [];
        renderCart();
    });
});

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('toast-visible');
    clearTimeout(toast.hideTimeoutId);
    toast.hideTimeoutId = setTimeout(() => toast.classList.remove('toast-visible'), 2800);
}

// ===== PRODUCT DETAIL MODAL =====
function openProductModal(data) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;

    document.getElementById('product-modal-img').src = data.image;
    document.getElementById('product-modal-img').alt = data.name;
    document.getElementById('product-modal-category').textContent = data.category || '';
    document.getElementById('product-modal-name').textContent = data.name;

    const priceEl = document.getElementById('product-modal-price');
    priceEl.innerHTML = data.originalPrice
        ? `<span class="pm-price-original">$${data.originalPrice}</span> <span class="pm-price-current">$${data.price}</span> <span class="pm-price-badge">SALE</span>`
        : `<span class="pm-price-current">$${data.price}</span>`;

    const colorsContainer = document.getElementById('product-modal-colors');
    const colorNameEl = document.getElementById('product-modal-color-name');
    colorNameEl.textContent = data.colors[0].name;
    colorsContainer.innerHTML = data.colors.map((c, i) =>
        `<button class="pm-color-swatch${i === 0 ? ' active' : ''}" data-color="${c.name}" style="background:${c.hex}" title="${c.name}" aria-label="${c.name}"></button>`
    ).join('');

    colorsContainer.querySelectorAll('.pm-color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
            colorsContainer.querySelectorAll('.pm-color-swatch').forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            colorNameEl.textContent = sw.dataset.color;
        });
    });

    const sizesContainer = document.getElementById('product-modal-sizes');
    sizesContainer.innerHTML = data.sizes.map((s, i) =>
        `<button class="pm-size-btn${i === 0 ? ' active' : ''}" data-size="${s}">${s}</button>`
    ).join('');

    sizesContainer.querySelectorAll('.pm-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizesContainer.querySelectorAll('.pm-size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    document.getElementById('product-modal-description').textContent = data.description;

    document.getElementById('product-modal-add-to-cart').onclick = () => {
        const selectedColor = colorsContainer.querySelector('.pm-color-swatch.active')?.dataset.color || data.colors[0].name;
        const selectedSize = sizesContainer.querySelector('.pm-size-btn.active')?.dataset.size || data.sizes[0];
        const isOneSize = data.sizes[0] === 'One Size';
        const variant = isOneSize ? selectedColor : `${selectedColor} / Size ${selectedSize}`;
        addToCart({
            name: data.name,
            price: data.price,
            variant,
            image: formatCartImage(data.image)
        });
        closeProductModal();
    };

    document.getElementById('product-modal-wishlist').onclick = () => showToast('Added to wishlist!');

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

document.getElementById('product-modal')?.querySelector('.product-modal-close')?.addEventListener('click', closeProductModal);
document.getElementById('product-modal')?.querySelector('.product-modal-overlay')?.addEventListener('click', closeProductModal);

// ===== STORY MODAL =====
function formatCartImage(url) {
    return url.replace(/\?.*$/, '') + '?w=200&h=260&fit=crop';
}
function openStoryModal() {
    const modal = document.getElementById('story-modal');
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeStoryModal() {
    const modal = document.getElementById('story-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

document.getElementById('story-modal')?.querySelector('.story-modal-close')?.addEventListener('click', closeStoryModal);
document.getElementById('story-modal')?.querySelector('.story-modal-overlay')?.addEventListener('click', closeStoryModal);

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeStoryModal();
    }
});
