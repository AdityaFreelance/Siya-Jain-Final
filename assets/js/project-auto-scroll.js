// Project cards horizontal auto-scroll
window.addEventListener('load', function() {
    const projectRow = document.querySelector('.project-cover .project-row');
    const originalProjects = document.querySelectorAll('.project-cover .project-col');
    
    if (!projectRow || originalProjects.length === 0) return;

    const projectWidth = originalProjects[0].offsetWidth;
    const gap = 20; // Gap between items
    const totalWidth = (projectWidth + gap) * originalProjects.length;
    
    let currentPosition = 0;
    const scrollSpeed = 1; // Pixels per frame
    
    // Clone all projects and append them for seamless loop
    originalProjects.forEach(project => {
        projectRow.appendChild(project.cloneNode(true));
    });
    
    // Clone again for extra smoothness
    originalProjects.forEach(project => {
        projectRow.appendChild(project.cloneNode(true));
    });
    
    function animateScroll() {
        currentPosition += scrollSpeed;
        
        // Reset when we've scrolled past the original set
        if (currentPosition >= totalWidth) {
            currentPosition = 0;
        }
        
        projectRow.style.transform = `translateX(-${currentPosition}px)`;
        
        requestAnimationFrame(animateScroll);
    }
    
    // Start the animation
    requestAnimationFrame(animateScroll);
    
    // Pause on hover
    const projectCover = document.querySelector('.project-slider-cover');
    if (projectCover) {
        let isPaused = false;
        
        projectCover.addEventListener('mouseenter', function() {
            isPaused = true;
        });
        
        projectCover.addEventListener('mouseleave', function() {
            isPaused = false;
            requestAnimationFrame(animateScroll);
        });
        
        // Modified animate function to respect pause
        function animateScroll() {
            if (!isPaused) {
                currentPosition += scrollSpeed;
                
                if (currentPosition >= totalWidth) {
                    currentPosition = 0;
                }
                
                projectRow.style.transform = `translateX(-${currentPosition}px)`;
            }
            
            requestAnimationFrame(animateScroll);
        }
    }
});
