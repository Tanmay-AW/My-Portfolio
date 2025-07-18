// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuToggle.classList.toggle('bx-x');
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
  });
});

// Card hover effects
const cards = document.querySelectorAll('.skill-card, .project-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = card.classList.contains('skill-card') 
      ? 'translateY(-5px)' 
      : 'scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Typewriter effect initialization
const typewriter = document.querySelector('.typewriter');
if (typewriter) {
  typewriter.style.width = '0';
  setTimeout(() => {
    typewriter.style.animation = 'typing 3s steps(40, end) forwards, blink 0.75s step-end infinite';
  }, 500);
}