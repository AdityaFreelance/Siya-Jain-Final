window.onload = function() {
    const slider = document.querySelector('.main-insight-slider ul');
    const originalSlides = document.querySelectorAll('.main-insight-slider ul li');
    if (originalSlides.length === 0) return;

    const slideHeight = originalSlides[0].clientHeight;
    let currentPosition = 0; // Tracks the current translateY value
    const scrollSpeed = 0.5; // Pixels per frame, adjust for desired speed

    // Set container height for two slides
    const sliderContainer = document.querySelector('.main-insight-slider');
    sliderContainer.style.height = `${slideHeight * 2}px`;

    // Adjust individual slide li height to be sure
    originalSlides.forEach(s => s.style.height = `${slideHeight}px`);

    // Clone all original slides and prepend them
    originalSlides.forEach(slide => {
        slider.prepend(slide.cloneNode(true));
    });
    // Clone all original slides and append them
    originalSlides.forEach(slide => {
        slider.appendChild(slide.cloneNode(true));
    });

    // Initial position: start at the beginning of the *original_slides* section.
    // The total height of prepended clones is `originalSlides.length * slideHeight`.
    currentPosition = originalSlides.length * slideHeight;
    slider.style.transform = `translateY(-${currentPosition}px)`;
    slider.style.transition = 'none'; // Ensure no transition on initial setup

    function animateScroll() {
        currentPosition += scrollSpeed; // Move down by scrollSpeed pixels

        // If we've scrolled past the original slides section into the appended clones
        // The total scrollable height before looping is `originalSlides.length * slideHeight` (original)
        // plus `originalSlides.length * slideHeight` (prepended)
        // So, when currentPosition exceeds `originalSlides.length * slideHeight` (the end of the original set),
        // we need to reset it back to the start of the original set.
        if (currentPosition >= (originalSlides.length * 2) * slideHeight) {
            currentPosition = originalSlides.length * slideHeight; // Jump back to the start of the original slides
            slider.style.transition = 'none'; // Remove transition for instant jump
            slider.style.transform = `translateY(-${currentPosition}px)`;
            // Force a reflow to apply the 'none' transition before re-enabling it
            slider.offsetHeight;
        }

        slider.style.transition = 'transform 0s linear'; // Ensure continuous movement without CSS transition
        slider.style.transform = `translateY(-${currentPosition}px)`;

        requestAnimationFrame(animateScroll);
    }

    // Start the animation
    requestAnimationFrame(animateScroll);
};