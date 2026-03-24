// SavorGrid Main JavaScript

// Sample articles data
const articlesData = [
    {
        id: 7,
        title: "Why I Switched to Regenerative Coffee and Never Looked Back",
        excerpt: "A personal journey into the world of regenerative organic coffee — how one small change in my morning routine reshaped the way I think about what I drink.",
        category: "food",
        categoryName: "Food & Beverage",
        date: "2026-03-24",
        image: "images/heirloom-banner.png",
        author: "Claire Whitfield",
        readTime: "9 min read",
        featured: true
    },
    {
        id: 1,
        title: "The Ultimate Guide to Minimalist Fashion in 2025",
        excerpt: "Discover how to build a timeless wardrobe with fewer, better pieces that reflect your personal style and values.",
        category: "fashion",
        categoryName: "Fashion & Accessories",
        date: "2025-01-15",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop&crop=center",
        author: "Emma Rodriguez",
        readTime: "8 min read",
        featured: true
    },
    {
        id: 2,
        title: "10 Superfoods That Will Transform Your Health",
        excerpt: "Explore nutrient-dense foods that can boost your energy, improve your immune system, and enhance your overall well-being.",
        category: "health",
        categoryName: "Health & Beauty",
        date: "2025-02-22",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop&crop=center",
        author: "Dr. Sarah Johnson",
        readTime: "6 min read",
        featured: true
    },
    {
        id: 3,
        title: "Creating Your Perfect Home Office Space",
        excerpt: "Transform any corner of your home into a productive workspace with these design tips and ergonomic solutions.",
        category: "home",
        categoryName: "Home & Garden",
        date: "2025-03-10",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
        author: "Michael Chen",
        readTime: "10 min read",
        featured: true
    },
    {
        id: 4,
        title: "Hidden Gems: 5 Underrated European Destinations",
        excerpt: "Escape the crowds and discover breathtaking locations that offer authentic cultural experiences and stunning natural beauty.",
        category: "travel",
        categoryName: "Travel & Accommodation",
        date: "2025-04-18",
        image: "images/欧洲.png",
        author: "Emma Rodriguez",
        readTime: "12 min read",
        featured: true
    },
    {
        id: 5,
        title: "Smart Investment Strategies for Young Professionals",
        excerpt: "Learn how to start building wealth early with practical investment tips tailored for career-focused millennials and Gen Z.",
        category: "finance",
        categoryName: "Finance & Insurance",
        date: "2025-05-25",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop&crop=center",
        author: "Michael Chen",
        readTime: "9 min read",
        featured: false
    },
    {
        id: 6,
        title: "The Art of Coffee: From Bean to Perfect Cup",
        excerpt: "Master the craft of brewing exceptional coffee at home with expert techniques and equipment recommendations.",
        category: "food",
        categoryName: "Food & Beverage",
        date: "2025-06-12",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&crop=center",
        author: "Dr. Sarah Johnson",
        readTime: "7 min read",
        featured: false
    }
];

// Category configurations
const categoryConfig = {
    fashion: {
        name: "Fashion & Accessories",
        icon: "fas fa-tshirt",
        description: "Latest trends, timeless pieces, and style guides for every occasion and budget."
    },
    health: {
        name: "Health & Beauty",
        icon: "fas fa-heart",
        description: "Wellness tips, beauty product reviews, and healthy lifestyle recommendations."
    },
    home: {
        name: "Home & Garden",
        icon: "fas fa-home",
        description: "Interior design inspiration, home improvement guides, and gardening tips."
    },
    travel: {
        name: "Travel & Accommodation",
        icon: "fas fa-plane",
        description: "Destination guides, hotel reviews, and travel tips for unforgettable experiences."
    },
    finance: {
        name: "Finance & Insurance",
        icon: "fas fa-chart-line",
        description: "Smart money management, investment advice, and insurance guidance."
    },
    food: {
        name: "Food & Beverage",
        icon: "fas fa-utensils",
        description: "Restaurant reviews, recipe recommendations, and culinary adventures."
    }
};

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function createArticleCard(article) {
    return `
        <a href="article.html?id=${article.id}" class="article-card fade-in">
            <img src="${article.image}" alt="${article.title}" class="article-image" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&crop=center'">
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category">${article.categoryName}</span>
                    <span class="article-date">${formatDate(article.date)}</span>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
            </div>
        </a>
    `;
}

function createPagination(currentPage, totalPages, baseUrl = '') {
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<a href="${baseUrl}?page=${currentPage - 1}" class="pagination-btn">← Previous</a>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<span class="pagination-btn active">${i}</span>`;
        } else {
            paginationHTML += `<a href="${baseUrl}?page=${i}" class="pagination-btn">${i}</a>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<a href="${baseUrl}?page=${currentPage + 1}" class="pagination-btn">Next →</a>`;
    }
    
    return paginationHTML;
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        // Filter articles based on search query
        const filteredArticles = articlesData.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.categoryName.toLowerCase().includes(query)
        );
        
        displaySearchResults(filteredArticles, query);
    }
}

function displaySearchResults(articles, query) {
    const articlesGrid = document.getElementById('articlesGrid');
    const sectionTitle = document.querySelector('.section-title');
    
    if (articlesGrid && sectionTitle) {
        sectionTitle.textContent = `Search Results for "${query}"`;
        
        if (articles.length === 0) {
            articlesGrid.innerHTML = `
                <div class="no-results">
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or browse our categories.</p>
                </div>
            `;
        } else {
            articlesGrid.innerHTML = articles.map(createArticleCard).join('');
        }
        
        // Hide pagination for search results
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.style.display = 'none';
        }
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
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

// Fade in animation on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.article-card, .category-card, .section').forEach(el => {
        observer.observe(el);
    });
}

// Load articles for homepage
function loadHomepageArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    const pagination = document.getElementById('pagination');
    
    if (articlesGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(urlParams.get('page')) || 1;
        const articlesPerPage = 6;
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        
        // Get articles for current page
        const pageArticles = articlesData.slice(startIndex, endIndex);
        const totalPages = Math.ceil(articlesData.length / articlesPerPage);
        
        // Display articles
        articlesGrid.innerHTML = pageArticles.map(createArticleCard).join('');
        
        // Display pagination
        if (pagination && totalPages > 1) {
            pagination.innerHTML = createPagination(currentPage, totalPages, 'index.html');
        }
        
        // Initialize scroll animations after content loads
        setTimeout(initializeScrollAnimations, 100);
    }
}

// Logo link functionality
function initializeLogoLinks() {
    const logoLinks = document.querySelectorAll('.logo a');
    logoLinks.forEach(link => {
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeLogoLinks();
    
    // Load content based on current page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadHomepageArticles();
    }
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Export functions for use in other files
window.SavorGrid = {
    articlesData,
    categoryConfig,
    formatDate,
    createArticleCard,
    createPagination
};
