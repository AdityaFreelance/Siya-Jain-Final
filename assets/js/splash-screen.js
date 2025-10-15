// Splash Screen Handler
document.addEventListener('DOMContentLoaded', function() {
    // Add splash-active class to body to prevent scrolling
    document.body.classList.add('splash-active');
    
    // Get the splash screen element
    const splashScreen = document.getElementById('splash-screen');
    const splashLogo = splashScreen.querySelector('.splash-logo');
    
    // Split text into individual characters wrapped in spans with extra space between words
    const text = 'SIYA JAIN';
    splashLogo.innerHTML = text.split('').map((char, index) => {
        // Add extra space between SIYA and JAIN (position 4 is the space)
        if (char === ' ') {
            return `<span style="display: inline-block; width: 30px;">&nbsp;</span>`;
        }
        return `<span>${char}</span>`;
    }).join('');
    
    // Get all character spans
    const chars = splashLogo.querySelectorAll('span');
    
    // Animate each character turning white
    let currentIndex = 0;
    const animationInterval = setInterval(function() {
        if (currentIndex < chars.length) {
            chars[currentIndex].classList.add('active');
            currentIndex++;
        } else {
            clearInterval(animationInterval);
            // Wait a bit after animation completes, then hide splash screen
            setTimeout(hideSplashScreen, 500);
        }
    }, 150); // 150ms delay between each character
    
    // Function to hide splash screen
    function hideSplashScreen() {
        splashScreen.classList.add('fade-out');
        document.body.classList.remove('splash-active');
        
        // Remove splash screen from DOM after fade out animation
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 500); // Match transition duration in CSS
    }
});
