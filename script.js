// Function to filter blog posts
function filterBlog(category) {
    // 1. Get all blog cards
    const cards = document.querySelectorAll('.blog-card');
    
    // 2. Get all buttons
    const buttons = document.querySelectorAll('.filter-btn');

    // 3. Update active button style
    buttons.forEach(btn => {
        // Remove active class from all
        btn.classList.remove('active');
        // Add active class to clicked button text check (simple logic)
        if(btn.innerText.toLowerCase().includes(category === 'all' ? 'all' : category)) {
            btn.classList.add('active');
        }
    });

    // 4. Show/Hide logic
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block'; // Show
            // Add a small fade animation
            card.style.opacity = '0';
            setTimeout(() => card.style.opacity = '1', 50);
        } else {
            card.style.display = 'none'; // Hide
        }
    });
}

// Simple form handling (Visual feedback only for portfolio)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Request Sent.";
    btn.style.background = "#fff";
    btn.style.color = "#000";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "#c5a059"; // Reset to gold
        this.reset();
    }, 3000);
});
