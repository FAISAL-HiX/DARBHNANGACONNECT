// Enhanced DarbhangaConnect Page 2 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if user came from page 1 with a selected service
    const preSelectedService = localStorage.getItem('selectedService');
    const preSelectedServiceName = localStorage.getItem('selectedServiceName');
    
    if (preSelectedService && preSelectedServiceName) {
        // Auto-select the service from page 1
        const serviceMap = {
            'electrician': { name: 'Electrician', price: 150 },
            'plumber': { name: 'Plumber', price: 120 },
            'cleaning': { name: 'Cleaning', price: 120 },
            'bike-repair': { name: 'Bike Mechanic', price: 120 },
            'car-mechanic': { name: 'Car Mechanic', price: 200 },
            'ac-technician': { name: 'AC Technician', price: 180 },
            'labour-mistri': { name: 'Labour Mistri', price: 100 },
            'mobile-repair': { name: 'Mobile Repair', price: 120 },
            'carpenter': { name: 'Carpenter', price: 150 },
            'painter': { name: 'Painter', price: 130 },
            'gardener': { name: 'Gardener', price: 110 },
            'pest-control': { name: 'Pest Control', price: 200 },
            'water-tank-cleaning': { name: 'Water Tank Cleaning', price: 300 },
            'appliance-repair': { name: 'Appliance Repair', price: 180 },
            'solar-technician': { name: 'Solar Technician', price: 250 },
            'beauty-salon': { name: 'Beauty Services', price: 200 }
        };
        
        const service = serviceMap[preSelectedService];
        if (service) {
            selectService(service.name, service.price, null);
            // Clear localStorage
            localStorage.removeItem('selectedService');
            localStorage.removeItem('selectedServiceName');
        }
    }
    
    // Form validation
    setupFormValidation();
    
    // Add loading states
    setupLoadingStates();
    
    // Add animations
    addAnimations();
});

let selectedService = "";
let totalPrice = 0;

// Enhanced service selection with visual feedback
function selectService(name, price, triggerEl) {
    selectedService = name;
    totalPrice = price;
    
    // Remove previous selections
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('border-blue-500', 'bg-blue-50', 'selected');
    });
    
    // Highlight selected service — use passed element or fall back to event.target
    const sourceEl = triggerEl || (typeof event !== 'undefined' && event && event.target) || null;
    const card = sourceEl ? sourceEl.closest('.service-card') : null;
    if (card) card.classList.add('border-blue-500', 'bg-blue-50', 'selected');
    
    // Update total display with animation
    const totalDisplay = document.getElementById('total-display');
    totalDisplay.style.transform = 'scale(1.1)';
    totalDisplay.innerText = `Total: ₹${price}`;
    
    setTimeout(() => {
        totalDisplay.style.transform = 'scale(1)';
    }, 200);
    
    // Show success message
    showNotification(`✅ ${name} selected! Fill your details below.`, 'success');
    
    // Scroll to form
    document.getElementById('booking-form').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Enhanced booking with payment integration
function sendToWhatsApp() {
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const area = document.getElementById('user-area').value;
    const address = document.getElementById('user-address').value.trim();
    
    // Validation
    if (selectedService === "") {
        showNotification("❌ Please select a service first!", 'error');
        return;
    }
    
    if (!fullName) {
        showNotification("❌ Please enter your full name", 'error');
        document.getElementById('full-name').focus();
        return;
    }
    
    if (!phone || !isValidPhone(phone)) {
        showNotification("❌ Please enter a valid 10-digit mobile number", 'error');
        document.getElementById('phone').focus();
        return;
    }
    
    if (area === "") {
        showNotification("❌ Please select your area", 'error');
        document.getElementById('user-area').focus();
        return;
    }
    
    if (!address) {
        showNotification("❌ Please enter your full address", 'error');
        document.getElementById('user-address').focus();
        return;
    }
    
    // Show loading state
    const button = (typeof event !== 'undefined' && event && event.target) || document.querySelector('button[onclick*="sendToWhatsApp"]');
    const originalText = button ? button.innerHTML : '';
    button.innerHTML = '<span class="animate-spin">⏳</span> Processing...';
    if (button) button.disabled = true;
    
    // Store booking data for payment page
    const bookingData = {
        name: fullName,
        phone: phone,
        service: selectedService,
        area: area,
        address: address,
        price: totalPrice,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    // Show success message and redirect to payment
    setTimeout(() => {
        showNotification("✅ Booking details saved! Redirecting to payment...", 'success');
        
        setTimeout(() => {
            window.location.href = `payment.html?service=${encodeURIComponent(selectedService)}&price=${totalPrice}&name=${encodeURIComponent(fullName)}&phone=${phone}&area=${encodeURIComponent(area)}&address=${encodeURIComponent(address)}`;
        }, 1000);
        
    }, 1000);
}

// Utility functions
function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
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
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function setupFormValidation() {
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('full-name');
    
    // Real-time phone validation
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
        
        if (this.value.length === 10 && isValidPhone(this.value)) {
            this.classList.remove('border-red-300');
            this.classList.add('border-green-300');
        } else {
            this.classList.remove('border-green-300');
            this.classList.add('border-red-300');
        }
    });
    
    // Name validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            this.classList.remove('border-red-300');
            this.classList.add('border-green-300');
        } else {
            this.classList.remove('border-green-300');
            this.classList.add('border-red-300');
        }
    });
}

function setupLoadingStates() {
    // Add loading animation to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function addAnimations() {
    // Fade in animation for form
    const form = document.getElementById('booking-form');
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        form.style.transition = 'all 0.5s ease';
        form.style.opacity = '1';
        form.style.transform = 'translateY(0)';
    }, 300);
}

function storeBookingData(booking) {
    // Store in localStorage for potential future features
    try {
        const bookings = JSON.parse(localStorage.getItem('darbhangaBookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('darbhangaBookings', JSON.stringify(bookings));
    } catch (e) {
        console.warn('localStorage unavailable:', e);
    }
}

// Add back button functionality
function goBack() {
    window.history.back();
}