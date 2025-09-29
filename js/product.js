// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId && window.SavorGrid) {
        loadProductContent(productId);
    } else {
        // Load default product if no ID specified
        loadProductContent(1);
    }
});

// Sample product data
const productsData = [
    {
        id: 1,
        name: "Apple AirPods Pro (2nd Generation)",
        category: "health",
        categoryName: "Health & Beauty",
        price: 249,
        originalPrice: 279,
        discount: "11% off",
        rating: 4.8,
        reviewCount: 12847,
        images: [
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&crop=center"
        ],
        summary: "The new AirPods Pro deliver exceptional sound quality with active noise cancellation, making them perfect for music lovers and professionals alike. With improved battery life and seamless Apple ecosystem integration.",
        description: "Apple's second-generation AirPods Pro represent a significant leap forward in wireless audio technology. These premium earbuds combine cutting-edge features with Apple's signature design philosophy.",
        pros: [
            "Excellent active noise cancellation",
            "Superior sound quality with Adaptive EQ",
            "Seamless integration with Apple devices",
            "Comfortable fit with multiple ear tip sizes",
            "Impressive battery life with MagSafe charging case",
            "Spatial Audio support"
        ],
        cons: [
            "Premium price point",
            "Limited customization options",
            "Best features require Apple ecosystem",
            "Touch controls can be accidentally triggered"
        ],
        specifications: {
            "Driver": "Custom high-excursion Apple driver",
            "Noise Cancellation": "Active Noise Cancellation with Transparency mode",
            "Battery Life": "Up to 6 hours (ANC on), 30 hours with case",
            "Connectivity": "Bluetooth 5.3, Apple H2 chip",
            "Water Resistance": "IPX4 sweat and water resistant",
            "Charging": "Lightning, MagSafe, Qi wireless charging",
            "Weight": "5.3g per earbud, 50.8g case",
            "Compatibility": "iOS 16+, iPadOS 16+, macOS Ventura+"
        },
        verdict: {
            score: 9.2,
            label: "Excellent",
            text: "The AirPods Pro (2nd Gen) set the gold standard for wireless earbuds in the Apple ecosystem. While the premium price may deter some users, the exceptional sound quality, industry-leading noise cancellation, and seamless integration make them a worthwhile investment for Apple users."
        }
    },
    {
        id: 2,
        name: "Dyson V15 Detect Absolute",
        category: "home",
        categoryName: "Home & Garden",
        price: 749,
        originalPrice: 799,
        discount: "6% off",
        rating: 4.6,
        reviewCount: 3421,
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&h=600&fit=crop&crop=center"
        ],
        summary: "The Dyson V15 Detect combines powerful suction with intelligent dust detection technology, making it one of the most advanced cordless vacuums available.",
        pros: [
            "Powerful suction with intelligent dust detection",
            "Laser reveals hidden dust particles",
            "Real-time particle count display",
            "Versatile attachments for all surfaces",
            "Long battery life with multiple power modes"
        ],
        cons: [
            "Heavy compared to other cordless models",
            "Expensive initial investment",
            "Small dustbin capacity",
            "Can be loud on maximum power"
        ],
        specifications: {
            "Suction Power": "230 Air Watts",
            "Battery Life": "Up to 60 minutes",
            "Dustbin Capacity": "0.77 liters",
            "Weight": "3.1 kg",
            "Filtration": "Advanced whole-machine filtration",
            "Attachments": "8 versatile tools included"
        },
        verdict: {
            score: 8.8,
            label: "Very Good",
            text: "The Dyson V15 Detect is a premium vacuum that delivers exceptional cleaning performance with innovative features that make dust visible and cleaning more effective."
        }
    },
    {
        id: 3,
        name: "Levi's 511 Slim Jeans",
        category: "fashion",
        categoryName: "Fashion & Accessories",
        price: 79,
        originalPrice: 98,
        discount: "19% off",
        rating: 4.4,
        reviewCount: 8765,
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop&crop=center",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=600&fit=crop&crop=center"
        ],
        summary: "The classic Levi's 511 Slim jeans offer the perfect balance of comfort and style with a modern slim fit that works for any occasion.",
        pros: [
            "Timeless design and versatile styling",
            "Comfortable slim fit",
            "Durable denim construction",
            "Available in multiple washes",
            "Great value for premium denim"
        ],
        cons: [
            "May shrink slightly after washing",
            "Limited stretch in some washes",
            "Sizing can vary between different washes"
        ],
        specifications: {
            "Fit": "Slim through hip and thigh",
            "Material": "99% Cotton, 1% Elastane",
            "Rise": "Mid-rise",
            "Leg Opening": "14.5 inches",
            "Care": "Machine wash cold, tumble dry low"
        },
        verdict: {
            score: 8.5,
            label: "Very Good",
            text: "Levi's 511 Slim jeans remain a wardrobe staple for good reason. They offer classic styling, reliable quality, and versatile appeal at a reasonable price point."
        }
    }
];

function loadProductContent(productId) {
    const product = productsData.find(p => p.id === productId);
    
    if (!product) {
        showProductNotFound();
        return;
    }
    
    // Update page title and breadcrumb
    updateProductPageInfo(product);
    
    // Display product content
    displayProductContent(product);
    
    // Initialize product features
    initializeProductFeatures(product);
    
    // Load related products
    loadRelatedProducts(product);
}

function updateProductPageInfo(product) {
    // Update page title
    document.title = `${product.name} - SavorGrid`;
    document.getElementById('productTitle').textContent = `${product.name} - SavorGrid`;
    
    // Update breadcrumb
    document.getElementById('breadcrumbCategory').textContent = product.categoryName;
    document.getElementById('breadcrumbTitle').textContent = product.name;
}

function displayProductContent(product) {
    const productContent = document.getElementById('productContent');
    
    productContent.innerHTML = `
        <div class="product-header">
            <div class="product-images">
                <img src="${product.images[0]}" alt="${product.name}" class="product-main-image" id="mainImage">
                <div class="product-thumbnail-grid">
                    ${product.images.map((img, index) => `
                        <img src="${img}" alt="${product.name}" class="product-thumbnail ${index === 0 ? 'active' : ''}" 
                             onclick="changeMainImage('${img}', this)">
                    `).join('')}
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-meta">
                    <a href="category.html?cat=${product.category}" class="product-category">${product.categoryName}</a>
                    <span class="review-date">Reviewed in ${new Date().getFullYear()}</span>
                </div>
                
                <h1 class="product-name">${product.name}</h1>
                
                <div class="product-rating-section">
                    <div class="product-stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-score">${product.rating}</span>
                    <span class="rating-count">(${product.reviewCount.toLocaleString()} reviews)</span>
                </div>
                
                <div class="product-price-section">
                    <div class="product-price">$${product.price}</div>
                    ${product.originalPrice ? `
                        <div class="price-comparison">
                            <span class="price-original">$${product.originalPrice}</span>
                            <span class="price-discount">${product.discount}</span>
                        </div>
                    ` : ''}
                    <div class="price-note">Price may vary by retailer</div>
                </div>
                
                <p class="product-summary">${product.summary}</p>
                
                <div class="product-actions">
                    <a href="#" class="btn-buy" onclick="trackPurchaseClick('${product.name}')">
                        <i class="fas fa-shopping-cart"></i>
                        Shop Now
                    </a>
                    <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tab-navigation">
                <button class="tab-button active" onclick="showTab('review')">Review</button>
                <button class="tab-button" onclick="showTab('specs')">Specifications</button>
                <button class="tab-button" onclick="showTab('pros-cons')">Pros & Cons</button>
                <button class="tab-button" onclick="showTab('verdict')">Our Verdict</button>
            </div>
            
            <div class="tab-content active" id="review-tab">
                <div class="review-content">
                    <h3>Our Comprehensive Review</h3>
                    <p>${product.description}</p>
                    ${getDetailedReview(product)}
                </div>
            </div>
            
            <div class="tab-content" id="specs-tab">
                <h3>Technical Specifications</h3>
                <table class="specs-table">
                    ${Object.entries(product.specifications).map(([key, value]) => `
                        <tr>
                            <th>${key}</th>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
            
            <div class="tab-content" id="pros-cons-tab">
                <div class="pros-cons-section">
                    <div class="pros-section">
                        <h4><i class="fas fa-check-circle"></i> Pros</h4>
                        <ul>
                            ${product.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons-section">
                        <h4><i class="fas fa-times-circle"></i> Cons</h4>
                        <ul>
                            ${product.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="verdict-tab">
                <div class="verdict-section">
                    <div class="verdict-score">${product.verdict.score}/10</div>
                    <div class="verdict-label">${product.verdict.label}</div>
                    <p class="verdict-text">${product.verdict.text}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add fade-in animation
    setTimeout(() => {
        productContent.classList.add('fade-in');
    }, 100);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star star empty"></i>';
    }
    
    return starsHTML;
}

function getDetailedReview(product) {
    // Generate detailed review content based on product category
    const reviewContent = {
        1: `
            <h4>Design and Build Quality</h4>
            <p>Apple has refined the design of the AirPods Pro with subtle but meaningful improvements. The charging case feels more premium with its precise magnetic closure, and the earbuds themselves maintain the iconic AirPods aesthetic while offering better ergonomics.</p>
            
            <h4>Sound Quality and Performance</h4>
            <p>The custom-designed drivers deliver remarkably clear audio across all frequencies. The Adaptive EQ automatically tunes the music to your ear shape, creating a personalized listening experience that rivals much more expensive audiophile headphones.</p>
            
            <h4>Active Noise Cancellation</h4>
            <p>The ANC performance is truly industry-leading. Whether you're on a noisy commute or trying to focus in a busy office, the AirPods Pro effectively eliminate ambient noise while maintaining audio clarity. The Transparency mode is equally impressive, allowing natural sound to pass through when needed.</p>
            
            <h4>Battery Life and Charging</h4>
            <p>With up to 6 hours of listening time with ANC enabled and 30 hours total with the charging case, the AirPods Pro offer excellent battery performance. The MagSafe charging case adds convenience, and the quick charge feature provides hours of use with just minutes of charging.</p>
        `,
        2: `
            <h4>Cleaning Performance</h4>
            <p>The Dyson V15 Detect's powerful digital motor V11 generates impressive suction that effectively removes dirt, dust, and debris from various surfaces. The laser dust detection feature is genuinely useful, revealing particles that would otherwise go unnoticed.</p>
            
            <h4>Innovative Features</h4>
            <p>The piezo sensor automatically detects and counts dust particles, displaying the information on the LCD screen. This real-time feedback makes cleaning more engaging and ensures thorough results. The automatic power adjustment based on debris levels optimizes battery life.</p>
            
            <h4>Versatility and Attachments</h4>
            <p>The comprehensive set of attachments makes the V15 suitable for every cleaning task. From the soft roller cleaner head for hard floors to the high torque cleaner head for carpets, each tool is engineered for specific purposes and delivers excellent results.</p>
            
            <h4>Usability</h4>
            <p>Despite its advanced features, the V15 remains user-friendly. The point-and-shoot hygienic bin emptying system is particularly appreciated, allowing you to dispose of collected debris without touching it.</p>
        `,
        3: `
            <h4>Fit and Comfort</h4>
            <p>The 511 Slim offers a modern fit that's neither too tight nor too loose. The slim cut through the hip and thigh creates a contemporary silhouette that works well for various body types. The mid-rise design provides comfortable coverage without being restrictive.</p>
            
            <h4>Quality and Construction</h4>
            <p>Levi's legendary craftsmanship is evident in every detail. The reinforced stress points, quality stitching, and durable denim ensure these jeans will withstand regular wear and maintain their shape over time. The classic five-pocket design remains both functional and stylish.</p>
            
            <h4>Versatility</h4>
            <p>These jeans transition seamlessly from casual to semi-formal settings. Pair them with sneakers and a t-shirt for a relaxed look, or dress them up with a button-down shirt and boots for a more polished appearance.</p>
            
            <h4>Value Proposition</h4>
            <p>At this price point, the 511 Slim jeans offer excellent value. You're getting authentic Levi's quality and style at a reasonable cost, making them accessible to a wide range of consumers who appreciate classic American denim.</p>
        `
    };
    
    return reviewContent[product.id] || `
        <h4>Performance</h4>
        <p>This product delivers solid performance across all key metrics, meeting and often exceeding expectations in its category.</p>
        
        <h4>Value</h4>
        <p>Considering the features, quality, and price point, this product offers good value for consumers looking for reliable performance.</p>
    `;
}

function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    
    // Update main image
    mainImage.src = imageSrc;
    
    // Update active thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function trackPurchaseClick(productName) {
    // Track purchase intent (analytics)
    console.log(`Purchase click tracked for: ${productName}`);
    
    // In a real implementation, this would redirect to retailer or affiliate link
    alert('This would redirect to the retailer website in a real implementation.');
}

function toggleWishlist(productId) {
    const btn = event.target.closest('.btn-wishlist');
    const icon = btn.querySelector('i');
    
    // Toggle wishlist state
    if (icon.classList.contains('fas')) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
        console.log(`Removed product ${productId} from wishlist`);
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
        console.log(`Added product ${productId} to wishlist`);
    }
}

function loadRelatedProducts(currentProduct) {
    const relatedContainer = document.getElementById('relatedProducts');
    
    // Find related products (same category, excluding current product)
    const relatedProducts = productsData
        .filter(product => 
            product.category === currentProduct.category && 
            product.id !== currentProduct.id
        )
        .slice(0, 3); // Limit to 3 related products
    
    if (relatedProducts.length > 0) {
        relatedContainer.innerHTML = relatedProducts.map(product => `
            <a href="product.html?id=${product.id}" class="related-product-card fade-in">
                <img src="${product.images[0]}" alt="${product.name}" class="related-product-image" loading="lazy">
                <div class="related-product-info">
                    <h4 class="related-product-name">${product.name}</h4>
                    <div class="related-product-price">$${product.price}</div>
                    <div class="related-product-rating">
                        ${generateStars(product.rating)}
                        <span>${product.rating} (${product.reviewCount.toLocaleString()})</span>
                    </div>
                </div>
            </a>
        `).join('');
        
        // Add fade-in animation
        setTimeout(() => {
            relatedContainer.querySelectorAll('.related-product-card').forEach(card => {
                card.classList.add('fade-in');
            });
        }, 100);
    } else {
        relatedContainer.innerHTML = '<p>No related products found.</p>';
    }
}

function initializeProductFeatures(product) {
    // Initialize image gallery
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            changeMainImage(product.images[index], this);
        });
    });
    
    // Initialize smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function showProductNotFound() {
    const productContent = document.getElementById('productContent');
    productContent.innerHTML = `
        <div class="product-not-found">
            <h2>Product Not Found</h2>
            <p>Sorry, the product you're looking for doesn't exist or may have been removed.</p>
            <a href="index.html" class="cta-button">Return to Home</a>
        </div>
    `;
}

// Make functions available globally
window.changeMainImage = changeMainImage;
window.showTab = showTab;
window.trackPurchaseClick = trackPurchaseClick;
window.toggleWishlist = toggleWishlist;
