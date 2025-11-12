// Main JavaScript for Portfolio Website

// Create stars
const starsContainer = document.getElementById('starsContainer');
for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Typing animation
const text = "👋 Hi! I'm Kathan Shah!";
const typingElement = document.getElementById('typingText');
let charIndex = 0;

function typeText() {
    if (charIndex < text.length) {
        typingElement.innerHTML = text.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        typingElement.innerHTML = text + '<span class="typing-cursor"></span>';
    }
}

setTimeout(typeText, 500);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Contact form - Updated to work directly with FormSubmit
document.getElementById('contactForm').addEventListener('submit', (e) => {
    // Let the form submit naturally to FormSubmit
    // Show success message after a short delay
    setTimeout(() => {
        const form = document.getElementById('contactForm');
        const successMsg = document.getElementById('successMessage');
        
        if (successMsg && form) {
            successMsg.classList.add('show');
            form.reset();
            
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }
    }, 100);
});

// Generate QR Code for AR experience
document.addEventListener('DOMContentLoaded', () => {
    // For testing locally, use a placeholder URL
    // Replace this with your actual deployed website URL
    let arUrl = 'https://kathan-shah-portfolio.netlify.app/ar.html'; // CHANGE THIS to your actual URL
    
    // If running on a live server, use the current URL
    if (window.location.protocol === 'https:' || window.location.hostname !== 'localhost') {
        arUrl = `${window.location.origin}${window.location.pathname.replace('index.html', '')}ar.html`;
    }
    
    // Generate QR code
    new QRCode(document.getElementById('qrcode'), {
        text: arUrl,
        width: 200,
        height: 200,
        colorDark: '#0a0e27',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
});

// Parallax effect for mountains
window.addEventListener('scroll', () => {
    const mountains = document.querySelector('.mountains-container');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    mountains.style.transform = `translateY(${rate}px)`;
});