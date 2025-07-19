// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.nav');

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active');
});

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuToggle.classList.toggle('bx-x');

  // Update aria-expanded attribute
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
  menuToggle.setAttribute('aria-expanded', !expanded);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navbar.classList.contains('active') && 
      !navbar.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    navbar.classList.remove('active');
    menuToggle.classList.remove('bx-x');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Section reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
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
      menuToggle.classList.remove('bx-x');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Card hover effects - desktop only
const cards = document.querySelectorAll('.skill-card, .project-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      card.style.transform = card.classList.contains('skill-card') 
        ? 'translateY(-5px) rotateX(5deg)' 
        : 'translateY(-8px) scale(1.02)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      card.style.transform = '';
    }
  });
});

// Typewriter effect initialization
const typewriter = document.querySelector('.typewriter');
if (typewriter && window.innerWidth > 768) {
  typewriter.style.width = '0';
  setTimeout(() => {
    if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      typewriter.style.animation = 'typing 3s steps(40, end) forwards, blink 0.75s step-end infinite';
    } else {
      typewriter.style.width = '100%';
      typewriter.style.borderRight = 'none';
    }
  }, 500);
}

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

// Add ripple effect to buttons
document.querySelectorAll('.glow-btn, .project-links a, .skill-card').forEach(button => {
  button.addEventListener('click', function(e) {
    // Remove any existing ripple
    const ripple = this.querySelector('.ripple');
    if (ripple) ripple.remove();
    
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
    setTimeout(() => {
      circle.remove();
    }, 700);
  });
});
 window.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');
    setTimeout(() => {
      typewriter.style.borderRight = 'none';
    }, 1800); // match the duration of your typing animation
  });
  // Section reveal animation (update)
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  observer.observe(section);
  // Fallback in case IntersectionObserver doesn't fire
  setTimeout(() => section.classList.add('visible'), 2000);
});
