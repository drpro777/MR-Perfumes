// Global variables
let currentUser = null;
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isAdmin = false;
let currentZoom = 1;

// Sample product data
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 15000,
        originalPrice: 20000,
        brand: "TechPro",
        stock: 25,
        rating: 4.5,
        images: [
            "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "High-quality wireless Bluetooth headphones with noise cancellation and 30-hour battery life.",
        colors: ["Black", "White", "Blue", "Red"],
        sizes: ["One Size"]
    },
    {
        id: 2,
        name: "Casual Cotton T-Shirt",
        category: "Itar",
        price: 2500,
        originalPrice: 3500,
        brand: "FashionMax",
        stock: 50,
        rating: 4.2,
        images: [
            "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Comfortable 100% cotton t-shirt perfect for casual wear. Available in multiple colors and sizes.",
        colors: ["White", "Black", "Navy", "Gray", "Red"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: 3,
        name: "JavaScript Programming Guide",
        category: "books",
        price: 4500,
        originalPrice: 6000,
        brand: "TechBooks",
        stock: 30,
        rating: 4.8,
        images: [
            "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Comprehensive guide to modern JavaScript programming with practical examples and projects.",
        colors: ["Multi-color"],
        sizes: ["Standard"]
    },
    {
        id: 4,
        name: "Smart LED Bulb",
        category: "home",
        price: 3000,
        originalPrice: 4000,
        brand: "SmartHome",
        stock: 100,
        rating: 4.3,
        images: [
            "https://images.pexels.com/photos/1166643/pexels-photo-1166643.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "WiFi-enabled smart LED bulb with color changing capabilities and voice control support.",
        colors: ["Multi-color"],
        sizes: ["E27", "B22"]
    },
    {
        id: 5,
        name: "Fitness Yoga Mat",
        category: "sports",
        price: 2800,
        originalPrice: 3500,
        brand: "FitLife",
        stock: 40,
        rating: 4.6,
        images: [
            "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "High-quality non-slip yoga mat perfect for yoga, pilates, and other floor exercises.",
        colors: ["Purple", "Blue", "Green", "Pink", "Black"],
        sizes: ["6mm", "8mm", "10mm"]
    },
    {
        id: 6,
        name: "Wireless Phone Charger",
        category: "electronics",
        price: 5500,
        originalPrice: 7000,
        brand: "ChargeTech",
        stock: 60,
        rating: 4.4,
        images: [
            "https://images.pexels.com/photos/4148828/pexels-photo-4148828.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/5081259/pexels-photo-5081259.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek and efficient design.",
        colors: ["Black", "White"],
        sizes: ["Standard"]
    },
    {
        id: 7,
        name: "Denim Jacket",
        category: "Itar",
        price: 7500,
        originalPrice: 10000,
        brand: "DenimPro",
        stock: 20,
        rating: 4.7,
        images: [
            "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Classic denim jacket with modern fit. Perfect for layering and casual styling.",
        colors: ["Light Blue", "Dark Blue", "Black"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 8,
        name: "Kitchen Knife Set",
        category: "home",
        price: 8500,
        originalPrice: 12000,
        brand: "ChefMaster",
        stock: 15,
        rating: 4.9,
        images: [
            "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/4226770/pexels-photo-4226770.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Professional-grade stainless steel knife set with ergonomic handles and storage block.",
        colors: ["Silver"],
        sizes: ["5-piece", "8-piece", "12-piece"]
    },
    {
        id: 9,
        name: "Running Shoes",
        category: "sports",
        price: 12000,
        originalPrice: 15000,
        brand: "RunFast",
        stock: 35,
        rating: 4.5,
        images: [
            "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
        colors: ["Black", "White", "Blue", "Red", "Gray"],
        sizes: ["6", "7", "8", "9", "10", "11", "12"]
    },
    {
        id: 10,
        name: "Cookbook Collection",
        category: "books",
        price: 6500,
        originalPrice: 9000,
        brand: "CulinaryArts",
        stock: 12,
        rating: 4.3,
        images: [
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/159581/cookbook-recipes-cooking-book-159581.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Complete collection of international recipes from renowned chefs around the world.",
        colors: ["Multi-color"],
        sizes: ["Hardcover", "Paperback"]
    },
    {
        id: 11,
        name: "Gaming Mouse",
        category: "electronics",
        price: 4500,
        originalPrice: 6500,
        brand: "GamePro",
        stock: 0,
        rating: 4.6,
        images: [
            "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
        colors: ["Black", "White", "RGB"],
        sizes: ["Standard"]
    },
    {
        id: 12,
        name: "Decorative Plant Pot",
        category: "Itar",
        price: 1800,
        originalPrice: 2500,
        brand: "HomeDecor",
        stock: 80,
        rating: 4.1,
        images: [
            "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/1148117/pexels-photo-1148117.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Beautiful ceramic plant pot perfect for indoor plants and home decoration.",
        colors: ["White", "Terracotta", "Blue", "Green"],
        sizes: ["Small", "Medium", "Large"]
    },
    {
        id: 13,
        name: "Smart Fitness Tracker",
        category: "perfumes",
        price: 8000,
        originalPrice: 10000,
        brand: "FitTrack",
        stock: 20,
        rating: 4.8,
        images: [
            "https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
            "https://images.pexels.com/photos/4050313/pexels-photo-4050313.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
        ],
        description: "Advanced fitness tracker with heart rate monitor, sleep tracking, and activity reminders.",
        colors: ["Black", "Pink", "Blue"],
        sizes: ["One Size"]
    }
    
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    updateCartCount();
    updateLanguage();
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 3000);
});

// Initialize app
function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Load language
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage = savedLanguage;
    document.getElementById('languageSelect').value = savedLanguage;
    
    // Update active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page) {
                navigateToPage(page);
            }
        });
    });
        // Profile photo upload
    document.getElementById('profileImg').addEventListener('click', handleProfilePhotoUpload);
    document.getElementById('profileAvatar').addEventListener('click', handleProfilePhotoUpload);
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Settings modal
    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.getElementById('settingsModal').classList.add('active');
    });
    
    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').classList.remove('active');
    });
    
    // Auth modal
    document.getElementById('authBtn').addEventListener('click', () => {
        document.getElementById('authModal').classList.add('active');
    });
    
    document.getElementById('closeAuth').addEventListener('click', () => {
        document.getElementById('authModal').classList.remove('active');
    });
    
    // Auth form switching
    document.getElementById('showSignup').addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthForm('signup');
    });
    
    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthForm('login');
    });
    
    // Theme switching
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            switchTheme(theme);
        });
    });
    
    // Language switching
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        switchLanguage(e.target.value);
    });
    
    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('nextStep').addEventListener('click', nextSignupStep);
    
    // Password strength
    document.getElementById('signupPassword').addEventListener('input', checkPasswordStrength);
    
    // Product search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('categoryFilter').addEventListener('change', handleCategoryFilter);
    
    // Hero buttons
    document.getElementById('shopNowBtn').addEventListener('click', () => {
        navigateToPage('products');
    });
    
    document.getElementById('learnMoreBtn').addEventListener('click', () => {
        navigateToPage('services');
    });
    
    // Product modal
    document.getElementById('closeProductModal').addEventListener('click', () => {
        document.getElementById('productModal').classList.remove('active');
    });
    
    // Zoom controls
    document.getElementById('zoomIn').addEventListener('click', () => zoomImage(1.2));
    document.getElementById('zoomOut').addEventListener('click', () => zoomImage(0.8));
    
    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (!currentUser) {
            document.getElementById('authModal').classList.add('active');
            return;
        }
        document.getElementById('checkoutModal').classList.add('active');
    });
    
    document.getElementById('closeCheckout').addEventListener('click', () => {
        document.getElementById('checkoutModal').classList.remove('active');
    });
    
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    
    // Profile
    document.getElementById('profileBtn').addEventListener('click', () => {
        navigateToPage('profile');
    });
    
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Admin
    document.getElementById('addProductBtn').addEventListener('click', () => {
        document.getElementById('productFormModal').classList.add('active');
    });
    
    document.getElementById('closeProductForm').addEventListener('click', () => {
        document.getElementById('productFormModal').classList.remove('active');
    });
    
    document.getElementById('productForm').addEventListener('submit', handleProductForm);
    
    // Profile tabs
    document.querySelectorAll('.profile-tabs .tab-btn, .admin-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab, btn.parentElement);
        });
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Admin access (for demo purposes)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            isAdmin = true;
            navigateToPage('admin');
        }
    });
}

// Navigation functions
function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    document.getElementById(page + 'Page').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    // Load page-specific content
    switch(page) {
        case 'products':
            loadProducts();
            break;
        case 'cart':
            loadCartItems();
            break;
        case 'profile':
            if (!currentUser) {
                document.getElementById('authModal').classList.add('active');
                return;
            }
            loadProfileData();
            break;
        case 'admin':
            if (!isAdmin) {
                alert('Admin access required');
                return;
            }
            loadAdminData();
            break;
    }
    
    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('mobileMenuBtn').classList.remove('active');
}

// Auth functions
function switchAuthForm(form) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const modalTitle = document.getElementById('authModalTitle');
    
    if (form === 'signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        modalTitle.textContent = 'Sign Up';
    } else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        modalTitle.textContent = 'Login';
    }
}

function nextSignupStep() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    
    // Validate step 1
    const requiredFields = step1.querySelectorAll('input[required]');
    let valid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = 'var(--error-color)';
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!valid) {
        alert('Please fill in all required fields');
        return;
    }
    
    step1.classList.remove('active');
    step2.classList.add('active');
}

function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    let strength = 'weak';
    
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'strong';
    } else if (password.length >= 6 && (/[A-Z]/.test(password) || /[0-9]/.test(password))) {
        strength = 'normal';
    }
    
    strengthFill.className = `strength-fill ${strength}`;
    strengthText.textContent = translate(strength);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation for demo
    if (email && password) {
        currentUser = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            profileImage: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
            joinDate: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInterface();
        document.getElementById('authModal').classList.remove('active');
        
        showNotification('Login successful!', 'success');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
     // Get profile photo (if uploaded during signup)
    const profilePhotoInput = document.getElementById('profilePhotoInput');
    let profileImage = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop';
    
    if (profilePhotoInput && profilePhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage = e.target.result;
            completeSignup(profileImage);
        };
        reader.readAsDataURL(profilePhotoInput.files[0]);
    } else {
        completeSignup(profileImage);
    }
}

function completeSignup(profileImage) {
    const userData = {
        id: Date.now(),
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        phone: document.getElementById('signupPhone').value,
        city: document.getElementById('signupCity').value,
        profileImage: profileImage,
        joinDate: new Date().toISOString()
    };
    
    currentUser = userData;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserInterface();
    document.getElementById('authModal').classList.remove('active');
    
    showNotification('Account created successfully!', 'success');
}


function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    navigateToPage('home');
    showNotification('Logged out successfully!', 'success');
}

function updateUserInterface() {
    const authBtn = document.getElementById('authBtn');
    const profileBtn = document.getElementById('profileBtn');
    const bottomProfileLink = document.getElementById('bottomProfileLink');
    
    if (currentUser) {
        authBtn.style.display = 'none';
        profileBtn.style.display = 'block';
        bottomProfileLink.style.display = 'flex';
        
        // Update profile image
        const profileImg = document.getElementById('profileImg');
        if (profileImg && currentUser.profileImage) {
            profileImg.src = currentUser.profileImage;
        }
    } else {
        authBtn.style.display = 'block';
        profileBtn.style.display = 'none';
        bottomProfileLink.style.display = 'none';
    }
}

// Theme and language functions
function switchTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        }
    });
}

function switchLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    updateLanguage();
}

// Product functions
function loadProducts() {
    products = sampleProducts;
    displayProducts(products);
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card ${product.stock === 0 ? 'out-of-stock' : ''}" onclick="showProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                ${product.stock === 0 ? 
                    '<div class="product-badge out-of-stock">Out of Stock</div>' :
                    product.originalPrice > product.price ? 
                        `<div class="product-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</div>` : 
                        ''
                }
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                    <span>${product.rating}</span>
                </div>
                <div class="product-price">
                    <span class="current-price">PKR ${product.price.toLocaleString()}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">PKR ${product.originalPrice.toLocaleString()}</span>
                         <span class="discount">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>` : 
                        ''
                    }
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        <span>Add to Cart</span>
                    </button>
                    <button class="buy-now-btn" onclick="event.stopPropagation(); buyNow(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

     function showProductDetail(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
    
    // Update product detail modal
    document.getElementById('productDetailImage').src = product.images[0];
    document.getElementById('productDetailName').textContent = product.name;
    document.getElementById('productDetailPrice').textContent = `PKR ${product.price.toLocaleString()}`;
    
    if (product.originalPrice > product.price) {
        document.getElementById('productOriginalPrice').textContent = `PKR ${product.originalPrice.toLocaleString()}`;
        document.getElementById('productOriginalPrice').style.display = 'inline';
        document.getElementById('productDiscount').textContent = `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`;
        document.getElementById('productDiscount').style.display = 'inline';
    } else {
        document.getElementById('productOriginalPrice').style.display = 'none';
        document.getElementById('productDiscount').style.display = 'none';
    }
    
    document.getElementById('productRating').textContent = product.rating;
    document.getElementById('productStars').innerHTML = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    document.getElementById('productBrand').textContent = product.brand;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productStock').textContent = product.stock > 0 ? `${product.stock} available` : 'Out of stock';
    document.getElementById('productDescription').textContent = product.description;
    
    // Color options
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = product.colors.map(color => 
        `<div class="color-option" style="background-color: ${getColorCode(color)}" title="${color}"></div>`
    ).join('');
    
    // Size options
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = product.sizes.map(size => 
        `<option value="${size}">${size}</option>`
    ).join('');
    
    // Action buttons
    document.getElementById('addToCartDetail').onclick = () => addToCart(productId);
    document.getElementById('buyNowDetail').onclick = () => buyNow(productId);
    
    // Show modal
    document.getElementById('productModal').classList.add('active');
       currentZoom = 1;
            const productImage = document.getElementById('productDetailImage');
            productImage.style.transform = 'scale(1)';
}

function getColorCode(colorName) {
    const colorMap = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Blue': '#0066CC',
        'Red': '#FF0000',
        'Navy': '#000080',
        'Gray': '#808080',
        'Purple': '#800080',
        'Green': '#008000',
        'Pink': '#FFC0CB',
        'Light Blue': '#87CEEB',
        'Dark Blue': '#00008B',
        'Silver': '#C0C0C0',
        'Multi-color': 'linear-gradient(45deg, red, blue, green, yellow)'
    };
    return colorMap[colorName] || '#CCCCCC';
}

function zoomImage(factor) {
    currentZoom *= factor;
    if (currentZoom < 0.5) currentZoom = 0.5;
    if (currentZoom > 3) currentZoom = 3;
    
    const image = document.getElementById('productDetailImage');
    image.style.transform = `scale(${currentZoom})`;
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.brand.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayProducts(filteredProducts);
}

function handleCategoryFilter() {
    handleSearch(); // Reuse search logic
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    // Get selected options from the product modal if it's open
    let selectedColor = 'Not selected';
    let selectedSize = 'Not selected';
    
    if (document.getElementById('productModal').classList.contains('active')) {
        // Get selected color (first visible color option if none selected)
        const colorOptions = document.querySelectorAll('.color-option');
        for (let option of colorOptions) {
            if (option.classList.contains('selected')) {
                selectedColor = option.title;
                break;
            }
        }
        
        // Get selected size from dropdown
        const sizeSelect = document.getElementById('sizeOptions');
        if (sizeSelect && sizeSelect.value) {
            selectedSize = sizeSelect.value;
        }
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.selectedColor = selectedColor;
        existingItem.selectedSize = selectedSize;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedColor,
            selectedSize
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!', 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    // This should be added to your existing setupEventListeners function
    document.getElementById('colorOptions')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('color-option')) {
            // Remove selected class from all color options
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });
            
            // Add selected class to clicked color option
            e.target.classList.add('selected');
        }
    });
});

function buyNow(productId) {
    if (!currentUser) {
        document.getElementById('authModal').classList.add('active');
        return;
    }
    
    addToCart(productId);
    navigateToPage('cart');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
    document.getElementById('bottomCartCount').textContent = totalItems;
    
    // Show/hide cart badges
    const badges = document.querySelectorAll('.cart-count, .cart-badge');
    badges.forEach(badge => {
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartSummary();
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">PKR ${item.price.toLocaleString()}</p>
                <p class="cart-item-options">
                    ${item.selectedColor ? `Color: ${item.selectedColor}<br>` : ''}
                    ${item.selectedSize ? `Size: ${item.selectedSize}` : ''}
                </p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    showNotification('Item removed from cart', 'success');
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 200 : 0;
    const total = subtotal + shipping;
    
    document.getElementById('cartSubtotal').textContent = `PKR ${subtotal.toLocaleString()}`;
    document.getElementById('cartShipping').textContent = `PKR ${shipping.toLocaleString()}`;
    document.getElementById('cartTotal').textContent = `PKR ${total.toLocaleString()}`;
}

// Checkout function
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        customer: {
            name: document.getElementById('checkoutName').value,
            email: document.getElementById('checkoutEmail').value,
            phone: document.getElementById('checkoutPhone').value,
            city: document.getElementById('checkoutCity').value,
            address: document.getElementById('checkoutAddress').value
        },
        items: cart.map(item => ({
            ...item,
            selectedColor: item.selectedColor || 'Not selected', // Add selected color if available
            selectedSize: item.selectedSize || 'Not selected'   // Add selected size if available
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 200,
        paymentMethod: document.getElementById('paymentMethod').value,
        orderDate: new Date().toISOString()
    };
    
    // Format items for email display
    const formattedItems = orderData.items.map(item => `
        ${item.name} (${item.brand})
        - Quantity: ${item.quantity}
        - Price: PKR ${item.price.toLocaleString()} each
        - Color: ${item.selectedColor}
        - Size: ${item.selectedSize}
        - Subtotal: PKR ${(item.price * item.quantity).toLocaleString()}
    `).join('\n\n');
    
    // Send email using EmailJS
      emailjs.send('service_qfbyrve', 'template_hbxooll', {
        to_email: 'dr.professorr.pro.254@gmail.com',
        customer_name: orderData.customer.name,
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        customer_city: orderData.customer.city,
        customer_address: orderData.customer.address,
        order_items: formattedItems,
        order_total: orderData.total.toLocaleString(),
        payment_method: orderData.paymentMethod,
        order_date: new Date().toLocaleDateString()
    }).then(() => {
        showNotification('Order placed successfully! You will receive a confirmation email.', 'success');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        document.getElementById('checkoutModal').classList.remove('active');
        navigateToPage('home');
    }).catch(() => {
        showNotification('Order placed successfully!', 'success');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        document.getElementById('checkoutModal').classList.remove('active');
        navigateToPage('home');
    });
}

// Profile functions
function loadProfileData() {
    if (!currentUser) return;
    
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('joinDate').textContent = new Date(currentUser.joinDate).toLocaleDateString();
    
    if (currentUser.profileImage) {
        document.getElementById('profileAvatar').src = currentUser.profileImage;
    }
}

// Admin functions
function loadAdminData() {
    loadAdminProducts();
}

function loadAdminProducts() {
    const adminProductsGrid = document.getElementById('adminProductsGrid');
    
    adminProductsGrid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.images[0]}" alt="${product.name}">
            <div class="admin-product-info">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: PKR ${product.price.toLocaleString()}</p>
                <p>Stock: ${product.stock}</p>
                <div class="admin-product-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Populate form with product data
    document.getElementById('productFormName').value = product.name;
    document.getElementById('productFormCategory').value = product.category;
    document.getElementById('productFormPrice').value = product.price;
    document.getElementById('productFormOriginalPrice').value = product.originalPrice;
    document.getElementById('productFormBrand').value = product.brand;
    document.getElementById('productFormStock').value = product.stock;
    document.getElementById('productFormImage1').value = product.images[0];
    document.getElementById('productFormImage2').value = product.images[1] || '';
    document.getElementById('productFormDescription').value = product.description;
    document.getElementById('productFormColors').value = product.colors.join(', ');
    document.getElementById('productFormSizes').value = product.sizes.join(', ');
    
    document.getElementById('productFormTitle').textContent = 'Edit Product';
    document.getElementById('productFormSubmit').textContent = 'Update Product';
    document.getElementById('productForm').dataset.editId = productId;
    
    document.getElementById('productFormModal').classList.add('active');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        loadAdminProducts();
        showNotification('Product deleted successfully!', 'success');
    }
}

function handleProductForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('productFormName').value,
        category: document.getElementById('productFormCategory').value,
        price: parseInt(document.getElementById('productFormPrice').value),
        originalPrice: parseInt(document.getElementById('productFormOriginalPrice').value),
        brand: document.getElementById('productFormBrand').value,
        stock: parseInt(document.getElementById('productFormStock').value),
        images: [
            document.getElementById('productFormImage1').value,
            document.getElementById('productFormImage2').value
        ].filter(img => img),
        description: document.getElementById('productFormDescription').value,
        colors: document.getElementById('productFormColors').value.split(',').map(c => c.trim()),
        sizes: document.getElementById('productFormSizes').value.split(',').map(s => s.trim()),
        rating: 4.5
    };
    
    const editId = document.getElementById('productForm').dataset.editId;
    
    if (editId) {
        // Update existing product
        const productIndex = products.findIndex(p => p.id === parseInt(editId));
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...formData };
            showNotification('Product updated successfully!', 'success');
        }
    } else {
        // Add new product
        const newProduct = {
            id: Date.now(),
            ...formData
        };
        products.push(newProduct);
        showNotification('Product added successfully!', 'success');
    }
    
    loadAdminProducts();
    document.getElementById('productFormModal').classList.remove('active');
    
    // Reset form
    document.getElementById('productForm').reset();
    document.getElementById('productFormTitle').textContent = 'Add New Product';
    document.getElementById('productFormSubmit').textContent = 'Add Product';
    delete document.getElementById('productForm').dataset.editId;
}

// Contact form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Send email using EmailJS
    emailjs.send('your_service_id', 'your_contact_template_id', {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'your-email@example.com'
    }).then(() => {
        showNotification('Message sent successfully!', 'success');
        e.target.reset();
    }).catch(() => {
        showNotification('Message sent successfully!', 'success');
        e.target.reset();
    });
}

// Tab switching
function switchTab(tabId, tabsContainer) {
    // Remove active class from all tabs and contents
    tabsContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabId + 'Tab').classList.add('active');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'primary'}-color);
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .empty-cart {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);


// Password protection
const passwordModal = document.getElementById('passwordModal');
const secretPageBtn = document.getElementById('secretPageBtn');
const closePasswordModal = document.getElementById('closePasswordModal');
const submitPassword = document.getElementById('submitPassword');
const secretPassword = document.getElementById('secretPassword');
const passwordError = document.getElementById('passwordError');
const secretPage = document.getElementById('secretPage');

// Set your secret password here
const CORRECT_PASSWORD = "global123"; // Change this to your desired password

// Open password modal when secret page button is clicked
secretPageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    passwordModal.style.display = 'block';
});

// Close password modal
closePasswordModal.addEventListener('click', () => {
    passwordModal.style.display = 'none';
    passwordError.style.display = 'none';
    secretPassword.value = '';
});

// Submit password
submitPassword.addEventListener('click', () => {
    if (secretPassword.value === CORRECT_PASSWORD) {
        // Hide all pages first
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show secret page
        secretPage.classList.add('active');
        
        // Hide password modal
        passwordModal.style.display = 'none';
        secretPassword.value = '';
        passwordError.style.display = 'none';
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        secretPageBtn.classList.add('active');
    } else {
        passwordError.style.display = 'block';
    }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === passwordModal) {
        passwordModal.style.display = 'none';
        passwordError.style.display = 'none';
        secretPassword.value = '';
    }
});

// Back to home arrow functionality
document.getElementById('backToHome').addEventListener('click', function() {
    // Navigate to home page
    document.querySelector('[data-page="home"]').click();
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide back to home arrow based on current page
function updateBackToHomeButton() {
    const backToHome = document.getElementById('backToHome');
    const currentPage = document.querySelector('.page.active');
    
    if (currentPage && currentPage.id !== 'homePage') {
        backToHome.style.display = 'flex';
        document.body.classList.remove('home-page');
    } else {
        backToHome.style.display = 'none';
        document.body.classList.add('home-page');
    }
}

// Add discount badges to products
function addDiscountBadges() {
    document.querySelectorAll('.product-card').forEach(card => {
        const price = parseFloat(card.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
        const originalPrice = parseFloat(card.querySelector('.original-price')?.textContent.replace(/[^0-9.]/g, '') || price);
        
        if (originalPrice > price) {
            const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
            const badge = document.createElement('div');
            badge.className = 'discount-badge';
            badge.textContent = `${discount}% OFF`;
            card.appendChild(badge);
        }
    });
}

// Call these functions when needed
document.addEventListener('DOMContentLoaded', function() {
    updateBackToHomeButton();
    // Call addDiscountBadges after products are loaded
});

// Also call updateBackToHomeButton whenever page changes
// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    // Here you would typically send the email to your server
    alert('Thank you for subscribing! We will keep you updated.');
    this.reset();
});


document.addEventListener('DOMContentLoaded', function() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  // Add particles on hover
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      // Create particles
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('span');
        particle.classList.add('feature-particle');
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const posX = e.offsetX;
        const posY = e.offsetY;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        // Random animation
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 30;
        const duration = Math.random() * 0.8 + 0.5;
        
        particle.style.animation = `particle-move ${duration}s forwards`;
        particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
        
        this.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
          particle.remove();
        }, duration * 1000);
      }
    });
  });
});
// water
  // Add subtle animation to category filter
        document.getElementById('categoryFilter').addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(0, 136, 255, 0.2)';
        });
        
        document.getElementById('categoryFilter').addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add animation to search box on focus
        const searchInput = document.getElementById('searchInput');
        const searchIcon = document.querySelector('.search-box i');
        
        searchInput.addEventListener('focus', function() {
            searchIcon.style.transform = 'translateY(-50%) scale(1.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchIcon.style.transform = 'translateY(-50%)';
        });
        
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.ripple');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.offsetLeft;
                const y = e.clientY - e.target.offsetTop;
                
                const ripples = document.createElement('span');
                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';
                this.appendChild(ripples);
                
                setTimeout(() => {
                    ripples.remove();
                }, 600);
            });
        });
        //  slider
        function handleProfilePhotoUpload() {
    const profileImg = document.getElementById('profileImg');
    const profileAvatar = document.getElementById('profileAvatar');
    
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    // Add event listener for when a file is selected
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const imageDataUrl = event.target.result;
                
                // Update profile images
                if (profileImg) profileImg.src = imageDataUrl;
                if (profileAvatar) profileAvatar.src = imageDataUrl;
                
                // Update currentUser object and localStorage
                if (currentUser) {
                    currentUser.profileImage = imageDataUrl;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    showNotification('Profile photo updated!', 'success');
                }
            };
            
            reader.readAsDataURL(file);
        }
    });}
     document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);