// Project Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Main Navigation functionality
    const hamburgerMenu = document.querySelector('.main-nav .hamburger-menu');
    const navTabs = document.querySelectorAll('.nav-tab');
    
    // Hamburger menu animation
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Navigation tab switching
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Add ripple effect
            createRipple(e, this);
        });
    });
    
    // Create ripple effect for buttons
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const projectHero = document.querySelector('.project-hero');
        const projectHeroContent = document.querySelector('.project-hero-content');
        const mainNav = document.querySelector('.main-nav');
        
        if (projectHero) {
            // Parallax background
            projectHero.style.transform = `translateY(${scrolled * 0.5}px)`;
            
            // Parallax content (slower)
            if (projectHeroContent) {
                projectHeroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
        
        // Main navbar background on scroll
        if (mainNav) {
            if (scrolled > 50) {
                mainNav.style.background = 'rgba(0, 0, 0, 0.9)';
                mainNav.style.backdropFilter = 'blur(10px)';
            } else {
                mainNav.style.background = 'transparent';
                mainNav.style.backdropFilter = 'none';
            }
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for project info items
                if (entry.target.classList.contains('project-info-grid')) {
                    const items = entry.target.querySelectorAll('.project-info-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-details-section, .nda-protected-section, .project-info-grid');
    animateElements.forEach(el => {
        observer.observe(el);
        
        // Initial state for project info items
        if (el.classList.contains('project-info-grid')) {
            const items = el.querySelectorAll('.project-info-item');
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.6s ease';
            });
        }
    });
    
    // Lowe's logo hover effect
    const lowesLogoBlue = document.querySelector('.lowes-logo-blue');
    if (lowesLogoBlue) {
        lowesLogoBlue.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-10px) scale(1.05)';
        });
        
        lowesLogoBlue.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) translateY(0) scale(1)';
        });
    }
    
    // Contact button interaction
    const contactBtn = document.querySelector('.contact-me-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
            
            // Simulate contact action
            setTimeout(() => {
                alert('Contact form would open here!');
            }, 200);
        });
        
        // Add ripple effect to contact button
        contactBtn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    }
    
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add floating animation to NDA logo
    const ndaLogoWhite = document.querySelector('.lowes-logo-white-container');
    if (ndaLogoWhite) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = ndaLogoWhite.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || 0);
            
            if (currentY >= 5) floatDirection = -1;
            if (currentY <= -5) floatDirection = 1;
            
            ndaLogoWhite.style.transform = `translateY(${currentY + (floatDirection * 0.5)}px)`;
        }, 100);
    }
    
    // Footer links hover effect
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add typing effect to project title
    const projectTitle = document.querySelector('.project-main-title');
    if (projectTitle) {
        const text = projectTitle.textContent;
        projectTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                projectTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect when element is visible
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    titleObserver.unobserve(entry.target);
                }
            });
        });
        
        titleObserver.observe(projectTitle);
    }
    
    // Add CSS for ripple effect and animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .footer-section a {
            transition: transform 0.3s ease;
        }
        
        .project-nav-tab {
            position: relative;
            overflow: hidden;
        }
        
        .lowes-logo-white-container {
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        // Scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Add entrance animations on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.project-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 300);
    
    // Initialize hero content animation
    const heroContent = document.querySelector('.project-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease-out';
    }
    
    console.log('Project Detail Page Loaded Successfully!');
});
