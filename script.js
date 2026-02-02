// --- 1. SPOTLIGHT EFFECT (Follows Mouse) ---
const body = document.querySelector('body');
body.addEventListener('mousemove', (e) => {
    body.style.setProperty('--x', e.clientX + 'px');
    body.style.setProperty('--y', e.clientY + 'px');
});

// --- 2. BLOG FILTERING ---
function filterBlog(category) {
    const posts = document.querySelectorAll('.blog-post');
    const btns = document.querySelectorAll('.filter-btn');

    // Button Active State
    btns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(category === 'all' ? 'all' : category)) {
            btn.classList.add('active');
        }
    });

    // Show/Hide Logic with Animation
    posts.forEach(post => {
        const postCat = post.getAttribute('data-category');
        if (category === 'all' || postCat === category) {
            post.style.display = 'block';
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, 50);
        } else {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.display = 'none';
            }, 300);
        }
    });
}

// --- 3. SMOOTH SCROLL FOR NAV LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
