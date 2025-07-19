const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    // Toggle between 'bx-menu' and 'bx-x' classes for the icon
    if (navbar.classList.contains('active')) {
        menuToggle.querySelector('i').classList.remove('bx-menu');
        menuToggle.querySelector('i').classList.add('bx-x');
    } else {
        menuToggle.querySelector('i').classList.remove('bx-x');
        menuToggle.querySelector('i').classList.add('bx-menu');
    }

    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') &&
        !navbar.contains(e.target) &&
        !menuToggle.contains(e.target)) {
        navbar.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('bx-x'); // Ensure icon reverts
        menuToggle.querySelector('i').classList.add('bx-menu'); // Ensure icon reverts
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Section reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Optional: remove 'visible' class if you want sections to hide when scrolled out of view
            // entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    // Fallback in case IntersectionObserver doesn't fire (good for very fast scrolls or old browsers)
    // You might want to adjust or remove this setTimeout depending on desired behavior
    setTimeout(() => section.classList.add('visible'), 2000); 
});

// Smooth scrolling for navigation links and close mobile menu
document.querySelectorAll('nav ul li button').forEach(button => { // Target buttons inside nav
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('onclick').split("'")[1]; // Extract href from onclick
        const target = document.querySelector(targetId);
        
        if (!target) return;
        
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
        });
        
        // Close mobile menu after navigation
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('bx-x');
            menuToggle.querySelector('i').classList.add('bx-menu');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});


// Card hover effects - desktop only
const cards = document.querySelectorAll('.skill-card, .project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Apply hover only on screens wider than 768px (common desktop breakpoint)
        if (window.innerWidth > 768) {
            card.style.transform = card.classList.contains('skill-card') 
                ? 'translateY(-5px) rotateX(5deg)' 
                : 'translateY(-8px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset transform only on screens wider than 768px
        if (window.innerWidth > 768) {
            card.style.transform = '';
        }
    });
});
// --- REMOVED ALL JAVASCRIPT LOGIC FOR TYPEWRITER EFFECT ---
// The typewriter effect is now controlled purely by CSS via media queries.
// All the 'typewriter' specific JS code from your previous version is gone.


// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add ripple effect to buttons and cards
// Keep this as it was in your working code, targeting .glow-btn, .project-links a, .skill-card, .project-card
document.querySelectorAll('.glow-btn, .project-links a, .skill-card, .project-card').forEach(item => { 
    item.addEventListener('click', function(e) {
        // Remove any existing ripple
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) existingRipple.remove();
        
        // Create new ripple
        const circle = document.createElement('span');
        circle.classList.add('ripple');
        
        // Get dimensions
        const d = Math.max(this.offsetWidth, this.offsetHeight);
        const rect = this.getBoundingClientRect();
        
        // Position ripple
        circle.style.width = circle.style.height = d + 'px';
        circle.style.left = e.clientX - rect.left - d/2 + 'px';
        circle.style.top = e.clientY - rect.top - d/2 + 'px';
        
        this.appendChild(circle);
        
        // Remove ripple after animation
        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    });
});