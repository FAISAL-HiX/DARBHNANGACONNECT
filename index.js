// Enhanced DarbhangaConnect Index Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Check login status
    checkLoginStatus();
    
    // Initialize all functionality
    initializeSearch();
    initializeServiceCards();
    initializeMobileMenu();
    initializeScrollEffects();
    
});

function initializeSearch() {
    // Main search functionality
    const searchInput = document.getElementById('searchInput');
    const heroSearchInput = document.getElementById('heroSearchInput');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Search function
    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        
        serviceCards.forEach(card => {
            const serviceName = card.querySelector('h3')?.textContent.toLowerCase() || 
                              card.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (serviceName.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                card.classList.add('border-blue-500', 'shadow-lg');
                
                // Highlight matching service
                if (searchTerm !== '') {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                card.style.display = searchTerm === '' ? 'block' : 'none';
                card.classList.remove('border-blue-500', 'shadow-lg');
            }
        });
    }
    
    // Search input listeners
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
    }
    
    if (heroSearchInput) {
        heroSearchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
        
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }
}

function initializeServiceCards() {
    // Service card click handlers
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            const serviceName = this.querySelector('h3')?.textContent || 
                              this.querySelector('p')?.textContent || 'Service';
            
            // Visual feedback
            this.classList.add('scale-95');
            setTimeout(() => {
                this.classList.remove('scale-95');
            }, 150);
            
            // Store selected service for next page
            localStorage.setItem('selectedService', service);
            localStorage.setItem('selectedServiceName', serviceName);
            
            // Show selection feedback
            showNotification(`✅ ${serviceName} selected! Redirecting to booking...`, 'success');
            
            // Navigate to booking page
            setTimeout(() => {
                window.location.href = 'page_2.html';
            }, 1000);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-2xl');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-2xl');
        });
    });
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn?.classList.remove('hidden');
        } else {
            backToTopBtn?.classList.add('hidden');
        }
    });
    
    // Smooth scroll for navigation links
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

// Hero search function
function performHeroSearch() {
    const searchTerm = document.getElementById('heroSearchInput').value;
    if (searchTerm.trim()) {
        // Scroll to services section
        scrollToServices();
        
        // Perform search
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = searchTerm;
                searchInput.dispatchEvent(new Event('input'));
            }
        }, 500);
    }
}

// Utility functions
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAllServices() {
    window.location.href = 'page_2.html';
}

// Login/Logout functionality
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        showLoggedInState(user);
    } else {
        showLoggedOutState();
    }
}

function showLoggedInState(user) {
    const welcomeEl = document.getElementById('userWelcome');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (welcomeEl) welcomeEl.textContent = `Welcome, ${user.name}!`;
    if (welcomeEl) welcomeEl.classList.remove('hidden');
    if (loginBtn) loginBtn.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
}

function showLoggedOutState() {
    const welcomeEl = document.getElementById('userWelcome');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (welcomeEl) welcomeEl.classList.add('hidden');
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
}

function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    showLoggedOutState();
    showNotification('✅ Logged out successfully!', 'success');
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
});