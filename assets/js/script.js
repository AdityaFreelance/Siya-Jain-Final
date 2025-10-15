// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Projects section sticky scroll handler
    const projectsSection = document.querySelector('.projects');
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projectElements = document.querySelectorAll('.project');

    if (projectsSection && projectsWrapper && projectElements.length > 0) {
        const totalProjects = projectElements.length;

        window.addEventListener('scroll', function () {
            const sectionRect = projectsSection.getBoundingClientRect();
            const sectionHeight = projectsSection.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Check if we're within the projects section
            if (sectionRect.top <= 0 && sectionRect.bottom > viewportHeight) {
                // Calculate how far we've scrolled through the section (0 to 1)
                const scrolledInSection = Math.abs(sectionRect.top);
                const scrollableHeight = sectionHeight - viewportHeight;
                const scrollProgress = Math.min(scrolledInSection / scrollableHeight, 1);

                // Show/hide projects based on scroll progress
                projectElements.forEach((project, index) => {
                    const projectThreshold = index / totalProjects;

                    if (scrollProgress >= projectThreshold) {
                        project.style.opacity = '1';
                        project.style.pointerEvents = 'all';
                    } else {
                        project.style.opacity = '0';
                        project.style.pointerEvents = 'none';
                    }
                });
            }
        });
    }

    // Hero section cursor-following project preview with instant show and delayed hide
    const heroSection = document.querySelector('.hero');
    const projectPreviewsContainer = document.querySelector('.project-previews');
    const originalPreviews = document.querySelectorAll('.project-preview');

    if (heroSection && projectPreviewsContainer && originalPreviews.length > 0) {
        const allImages = [];
        let currentImageIndex = 0;
        let lastImageChangeTime = 0;
        const imageChangeInterval = 100; // Change image every 100ms
        const hideDelay = 200; // Hide after 600ms

        // Shuffle function to randomize array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Create multiple copies of images to fill the section
        const copiesPerImage = 10; // Create 10 copies of each image

        originalPreviews.forEach((preview, index) => {
            for (let i = 0; i < copiesPerImage; i++) {
                const clone = preview.cloneNode(true);
                clone.classList.add('preview-clone');
                projectPreviewsContainer.appendChild(clone);
                allImages.push(clone);
            }
            // Also include original
            allImages.push(preview);
        });

        // Shuffle the images array to randomize order
        shuffleArray(allImages);

        let currentImage = null;
        let hideTimeout = null;
        let inactivityTimeout = null;

        // Track mouse movement on hero section
        heroSection.addEventListener('mousemove', function (e) {
            const currentTime = Date.now();

            // Get mouse position relative to the hero section
            const heroRect = heroSection.getBoundingClientRect();
            const mouseX = e.clientX - heroRect.left;
            const mouseY = e.clientY - heroRect.top;

            // Clear inactivity timeout (cursor is moving)
            if (inactivityTimeout) {
                clearTimeout(inactivityTimeout);
            }

            // Set new inactivity timeout - hide all images if cursor stops moving
            inactivityTimeout = setTimeout(() => {
                allImages.forEach(img => img.classList.remove('show'));
                currentImage = null;
            }, 500); // Hide all images after 500ms of no movement

            // Change image based on time interval
            if (currentTime - lastImageChangeTime > imageChangeInterval) {
                // Hide previous image after delay
                if (currentImage && hideTimeout) {
                    clearTimeout(hideTimeout);
                }

                if (currentImage) {
                    const imageToHide = currentImage;
                    hideTimeout = setTimeout(() => {
                        imageToHide.classList.remove('show');
                    }, hideDelay);
                }

                // Get next image in sequence
                currentImage = allImages[currentImageIndex];
                currentImageIndex = (currentImageIndex + 1) % allImages.length;
                lastImageChangeTime = currentTime;

                // Show new image instantly at cursor position
                currentImage.style.left = mouseX + 'px';
                currentImage.style.top = mouseY + 'px';
                currentImage.classList.add('show');
            } else if (currentImage) {
                // Update current image position while moving
                currentImage.style.left = mouseX + 'px';
                currentImage.style.top = mouseY + 'px';
            }
        });

        // Hide all previews when mouse leaves hero section
        heroSection.addEventListener('mouseleave', function () {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            allImages.forEach(img => img.classList.remove('show'));
            currentImage = null;
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project sections for animations
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(50px)';
        project.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(project);
    });

    // Observe about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(30px)';
        aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutSection);
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('class');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');

            if (current === 'hero' && link.getAttribute('href') === '#home') {
                link.classList.add('active');
            } else if (current === 'about' && link.getAttribute('href') === '#about') {
                link.classList.add('active');
            } else if (current.includes('project') && link.getAttribute('href') === '#projects') {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Sticky header animation on scroll - immediate trigger with smooth animation
    const header = document.querySelector('header');
    let lastScrollY = 0;

    if (header) {
        window.addEventListener('scroll', function () {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 200) {
                // Immediately add sticky class when scrolled
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }

            lastScrollY = currentScrollY;
        });
    }

    // Project Preview Box Parallax Effect
    const projectPreviewBoxes = document.querySelectorAll('.project-preview-box');

    if (projectPreviewBoxes.length > 0) {
        window.addEventListener('scroll', function () {
            // Get the next project (Porsche) to check when it's coming into view
            const porscheProject = document.querySelector('.porsche-project');
            const setuBox = document.querySelector('.setu-project .project-preview-box');

            if (porscheProject && setuBox) {
                const porscheRect = porscheProject.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Check if Porsche project is starting to enter viewport from bottom
                // When top of Porsche starts entering viewport, begin transition
                const porscheProgress = (windowHeight - porscheRect.top) / windowHeight;

                // When Porsche starts entering viewport (any amount visible)
                if (porscheProgress > 0 && porscheProgress < 1) {
                    const currentPreview = setuBox.querySelector('.current-preview');
                    const nextPreview = setuBox.querySelector('.next-preview');

                    if (nextPreview && currentPreview) {
                        // Fade out current, fade in next
                        currentPreview.classList.add('fade-out');
                        nextPreview.classList.add('fade-in');

                        // Add parallax transform effect - smooth throughout entire scroll
                        const parallaxAmount = Math.min(porscheProgress, 1); // 0 to 1
                        setuBox.style.transform = `translate(-50%, -50%) scale(${1 + parallaxAmount * 0.1})`;
                    }
                } else if (porscheProgress <= 0) {
                    const currentPreview = setuBox.querySelector('.current-preview');
                    const nextPreview = setuBox.querySelector('.next-preview');

                    if (nextPreview && currentPreview) {
                        // Reset to current image
                        currentPreview.classList.remove('fade-out');
                        nextPreview.classList.remove('fade-in');
                        setuBox.style.transform = 'translate(-50%, -50%) scale(1)';
                    }
                }
            }
        });
    }

    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');

        // Check if elements exist before proceeding
        if (!navContainer || !navMenu) {
            return; // Exit if elements don't exist on this page
        }

        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.color = '#ffffff';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.cursor = 'pointer';

        navContainer.appendChild(mobileMenuBtn);

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });

        // Show/hide mobile menu button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navMenu.classList.add('mobile-menu');
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.classList.remove('mobile-menu', 'mobile-active');
            }
        };

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };

    createMobileMenu();

    // Preload images for better performance
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const imageUrl = img.src;
            const preloadImg = new Image();
            preloadImg.src = imageUrl;
        });
    };

    preloadImages();

    // Resume accordion functionality
    const initResumeAccordions = () => {
        const expandButtons = document.querySelectorAll('.resume-expand-btn');

        expandButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');

                if (targetId) {
                    const content = document.getElementById(targetId);

                    if (content) {
                        // Toggle expanded class on content
                        content.classList.toggle('expanded');

                        // Toggle expanded class on button for rotation
                        this.classList.toggle('expanded');

                        // Close other accordions in the same section
                        const currentSection = this.closest('.resume-section');
                        const otherButtons = currentSection.querySelectorAll('.resume-expand-btn');
                        const otherContents = currentSection.querySelectorAll('.resume-item-content');

                        otherButtons.forEach(otherButton => {
                            if (otherButton !== this) {
                                otherButton.classList.remove('expanded');
                            }
                        });

                        otherContents.forEach(otherContent => {
                            if (otherContent !== content) {
                                otherContent.classList.remove('expanded');
                            }
                        });
                    }
                }
            });
        });
    };

    // Initialize accordion functionality if on resume page
    if (document.querySelector('.resume-main')) {
        initResumeAccordions();
    }
});

// Add CSS for active nav link and mobile menu
const additionalStyles = `
    .nav-link.active {
        color: #ff6b35 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    @media (max-width: 768px) {
        .mobile-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 250px;
            height: calc(100vh - 70px);
            background-color: rgba(26, 26, 26, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .mobile-menu.mobile-active {
            right: 0;
        }
        
        .mobile-menu .nav-link {
            padding: 1rem 0;
            font-size: 1.1rem;
        }
    }
`;





document.addEventListener('DOMContentLoaded', function () {
    const menuCollapseBtn = document.getElementById('menu-collapse-btn-id');
    const menuCollapseBox = document.getElementById('menu-collapse-box-id');

    if (menuCollapseBtn && menuCollapseBox) {
        menuCollapseBtn.addEventListener('click', function () {
            menuCollapseBox.classList.toggle('open');
        });
    }
});