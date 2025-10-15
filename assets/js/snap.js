// Get elements
const scrollContainer = document.querySelector('.scroll-container');
const previewBox = document.querySelector('.preview-box');
const previewLinks = document.querySelectorAll('.preview-link');
const banners = document.querySelectorAll('.banner');

// Check if mobile device
function isMobile() {
    return window.innerWidth <= 768;
}

// Prevent default anchor behavior for preview links (only on desktop)
previewLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!isMobile()) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetBanner = document.getElementById(targetId);
            if (targetBanner) {
                const bannerIndex = Array.from(banners).indexOf(targetBanner);
                const windowHeight = window.innerHeight;
                scrollContainer.scrollTo({
                    top: bannerIndex * windowHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Function to update preview images with sticky sliding effect
function updatePreview() {
    const scrollTop = scrollContainer.scrollTop;
    const windowHeight = window.innerHeight;
    
    previewLinks.forEach((previewLink, index) => {
        if (index === 0) {
            // First preview link is always visible
            previewLink.style.opacity = 1;
            previewLink.style.transform = `translateY(0)`;
        } else {
            // Calculate when this preview should start appearing
            const prevBannerTop = (index - 1) * windowHeight;
            
            // Preview starts appearing as soon as we start scrolling from previous banner
            const progress = Math.max(0, Math.min((scrollTop - prevBannerTop) / windowHeight, 1));
            
            // Smooth reveal from bottom - exactly like main banners
            const translateY = (1 - progress) * 100;
            previewLink.style.transform = `translateY(${translateY}%)`;
            previewLink.style.opacity = 1; // No opacity change, just sliding
        }
    });
}

// Function to make banners sticky with smooth transitions
function handleStickyBanners() {
    const scrollTop = scrollContainer.scrollTop;
    const windowHeight = window.innerHeight;
    
    banners.forEach((banner, index) => {
        banner.classList.add('sticky');
        
        if (index === 0) {
            // First banner is always visible
            banner.style.opacity = 1;
            banner.style.transform = `translateY(0)`;
        } else {
            // Calculate when this banner should start appearing
            const prevBannerTop = (index - 1) * windowHeight;
            
            // Banner starts appearing as soon as we start scrolling from previous banner
            const progress = Math.max(0, Math.min((scrollTop - prevBannerTop) / windowHeight, 1));
            
            // Smooth reveal from bottom - starts at 100% and goes to 0%
            const translateY = (1 - progress) * 100;
            banner.style.transform = `translateY(${translateY}%)`;
            banner.style.opacity = progress;
        }
    });
}

// Smooth scroll behavior without snapping (only on desktop)
scrollContainer.addEventListener('scroll', () => {
    if (!isMobile()) {
        updatePreview();
        handleStickyBanners();
    }
});

// Keyboard navigation with smooth scrolling (only on desktop)
document.addEventListener('keydown', (e) => {
    if (!isMobile()) {
        const windowHeight = window.innerHeight;
        const currentScroll = scrollContainer.scrollTop;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            const nextScroll = Math.min(
                currentScroll + windowHeight,
                (banners.length - 1) * windowHeight
            );
            scrollContainer.scrollTo({
                top: nextScroll,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            const prevScroll = Math.max(currentScroll - windowHeight, 0);
            scrollContainer.scrollTo({
                top: prevScroll,
                behavior: 'smooth'
            });
        }
    }
});

// Initialize on load
window.addEventListener('load', () => {
    // Initialize first banner and preview as visible
    banners[0].classList.add('sticky');
    
    // Set initial states
    previewLinks[0].style.opacity = 1;
    previewLinks[0].style.transform = 'translateY(0)';
    
    if (previewLinks[1]) {
        previewLinks[1].style.transform = 'translateY(100%)';
        previewLinks[1].style.opacity = 1;
    }
});

// Handle resize (only on desktop)
window.addEventListener('resize', () => {
    if (!isMobile()) {
        const windowHeight = window.innerHeight;
        const currentIndex = Math.round(scrollContainer.scrollTop / windowHeight);
        scrollContainer.scrollTop = currentIndex * windowHeight;
    }
});
