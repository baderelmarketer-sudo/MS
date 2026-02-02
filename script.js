// --- 1. MOUSE FOLLOWER (The Spotlight) ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Slight delay for the follower to create "weight"
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Add hover effect for links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.borderColor = '#fff';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
});

// --- 2. GOLDEN DUST PARTICLE ENGINE ---
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.alpha = Math.random() * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // Gold color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create 100 particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// --- 3. SCROLL REVEAL (The Rise) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Add hidden class to all main sections
const hiddenElements = document.querySelectorAll('.op-card, .history-item, .vault-file, .hero-text');
hiddenElements.forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
});

// --- 4. VAULT FILTERING ---
function filter(category) {
    const items = document.querySelectorAll('.vault-file');
    const buttons = document.querySelectorAll('.filter');
    
    // Button styling
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category === 'all' ? 'all' : category)) {
            btn.classList.add('active');
        }
    });

    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-cat') === category) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 50);
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
}
