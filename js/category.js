// Category page functionality
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    const currentPage = parseInt(urlParams.get('page')) || 1;
    const sortBy = urlParams.get('sort') || 'date';
    
    if (category && window.SavorGrid) {
        loadCategoryContent(category, currentPage, sortBy);
        initializeCategoryFilters(category);
    }
});

function loadCategoryContent(category, page = 1, sort = 'date') {
    const { articlesData, categoryConfig } = window.SavorGrid;
    const config = categoryConfig[category];
    
    if (!config) {
        showErrorMessage('Category not found');
        return;
    }
    
    // Update page title and meta information
    updateCategoryHeader(config);
    
    // Filter articles by category
    let categoryArticles = articlesData.filter(article => article.category === category);
    
    // Sort articles
    categoryArticles = sortArticles(categoryArticles, sort);
    
    // Pagination
    const articlesPerPage = 6;
    const totalPages = Math.ceil(categoryArticles.length / articlesPerPage);
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const pageArticles = categoryArticles.slice(startIndex, endIndex);
    
    // Display articles
    displayCategoryArticles(pageArticles);
    
    // Update articles count
    updateArticlesCount(categoryArticles.length);
    
    // Display pagination
    if (totalPages > 1) {
        displayCategoryPagination(page, totalPages, category, sort);
    }
    
    // Update active dropdown link
    updateActiveDropdownLink(category);
}

function updateCategoryHeader(config) {
    // Update page title
    document.title = `${config.name} - SavorGrid`;
    document.getElementById('categoryTitle').textContent = `${config.name} - SavorGrid`;
    
    // Update breadcrumb
    document.getElementById('currentCategory').textContent = config.name;
    
    // Update category header
    document.getElementById('categoryName').textContent = config.name;
    document.getElementById('categoryDescription').textContent = config.description;
    
    // Update category icon
    const iconElement = document.querySelector('#categoryIcon i');
    if (iconElement) {
        iconElement.className = config.icon;
    }
}

function sortArticles(articles, sortBy) {
    switch (sortBy) {
        case 'title':
            return articles.sort((a, b) => a.title.localeCompare(b.title));
        case 'popular':
            // For demo purposes, sort by featured status then by date
            return articles.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return new Date(b.date) - new Date(a.date);
            });
        case 'date':
        default:
            return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

function displayCategoryArticles(articles) {
    const articlesGrid = document.getElementById('categoryArticles');
    
    if (articles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-articles">
                <h3>No articles found</h3>
                <p>Check back soon for new content in this category.</p>
            </div>
        `;
    } else {
        articlesGrid.innerHTML = articles.map(article => 
            window.SavorGrid.createArticleCard(article)
        ).join('');
        
        // Add fade-in animation
        setTimeout(() => {
            document.querySelectorAll('.article-card').forEach(card => {
                card.classList.add('fade-in');
            });
        }, 100);
    }
}

function updateArticlesCount(count) {
    const countElement = document.getElementById('articlesCount');
    if (countElement) {
        countElement.textContent = `${count} article${count !== 1 ? 's' : ''} found`;
    }
}

function displayCategoryPagination(currentPage, totalPages, category, sort) {
    const pagination = document.getElementById('pagination');
    if (pagination) {
        let baseUrl = `category.html?cat=${category}`;
        if (sort !== 'date') {
            baseUrl += `&sort=${sort}`;
        }
        
        pagination.innerHTML = window.SavorGrid.createPagination(currentPage, totalPages, baseUrl);
    }
}

function updateActiveDropdownLink(category) {
    // Remove active class from all dropdown links
    document.querySelectorAll('.dropdown-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current category link
    const activeLink = document.querySelector(`.dropdown-link[href*="cat=${category}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function initializeCategoryFilters(category) {
    const sortSelect = document.getElementById('sortBy');
    
    if (sortSelect) {
        // Set current sort value
        const urlParams = new URLSearchParams(window.location.search);
        const currentSort = urlParams.get('sort') || 'date';
        sortSelect.value = currentSort;
        
        // Handle sort change
        sortSelect.addEventListener('change', function() {
            const newSort = this.value;
            const currentPage = 1; // Reset to first page when sorting
            
            let newUrl = `category.html?cat=${category}&page=${currentPage}`;
            if (newSort !== 'date') {
                newUrl += `&sort=${newSort}`;
            }
            
            window.location.href = newUrl;
        });
    }
}

function showErrorMessage(message) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Oops! Something went wrong</h2>
                <p>${message}</p>
                <a href="index.html" class="cta-button">Return Home</a>
            </div>
        `;
    }
}
