document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-open');
    const menuContainer = document.querySelector('.menu-container');

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function () {
            menuContainer.classList.toggle('active');
        });
    }

    // Landscope Cover Image Animation
    const landscopeSection = document.querySelector('.landscope-wrapper'); // Assuming .landscope-wrapper is the parent section
    const landscopeImages = document.querySelectorAll('.landscope-cover ul li .landscope-image img');

    if (landscopeSection && landscopeImages.length > 0) {
        // Convert NodeList to array and shuffle it
        const shuffledImages = Array.from(landscopeImages).sort(() => Math.random() - 0.5);

        let imageIndex = 0;
        let animationStarted = false; // Flag to ensure animation runs only once

        const animateImage = () => {
            if (imageIndex < shuffledImages.length) {
                const img = shuffledImages[imageIndex];
                img.style.visibility = 'visible';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                imageIndex++;
                setTimeout(animateImage, 200); // Decreased delay between images for faster animation
            }
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    // Start the animation when the section enters the viewport
                    animationStarted = true;
                    setTimeout(animateImage, 500); // Decreased initial delay for faster animation
                    observer.disconnect(); // Disconnect after triggering once
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the section is visible
        });

        observer.observe(landscopeSection);
    }

    // Home-wrapper slider
    const sliderContainer = document.querySelector(".home-cover-container");
    const sliderRow = document.querySelector(".home-cover-row");
    const slides = document.querySelectorAll(".home-cover-col");

    if (sliderRow && slides.length > 0) {
        const originalSlidesCount = slides.length;
        let clones = [];

        // Clone slides for infinite loop
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderRow.appendChild(clone);
            clones.push(clone);
        });

        let position = 0;
        const speed = 2; // Adjust speed as needed

        function animateSlider() {
            position -= speed;
            const totalWidth = originalSlidesCount * slides[0].offsetWidth;
            if (position <= -totalWidth) {
                position = 0;
            }
            sliderRow.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateSlider);
        }

        animateSlider();
    }

    // Testing Slider
    const testingSliderContainer = document.querySelector('.testing-wrapper');
    const testingSliderRow = document.querySelector('.testing-slider-row');
    const testingSliderDotsContainer = document.querySelector('.testing-slider-dots');

    console.log('Testing Slider: Initializing...');
    console.log('testingSliderRow:', testingSliderRow);
    console.log('testingSliderDotsContainer:', testingSliderDotsContainer);

    if (testingSliderRow && testingSliderDotsContainer) {
        const testingOriginalCols = Array.from(testingSliderRow.querySelectorAll('.testing-slider-col'));
        console.log('testingOriginalCols (before clear):', testingOriginalCols);

        if (testingOriginalCols.length === 0) {
            console.log('Testing Slider: No original slides found. Exiting.');
            return;
        }

        testingSliderRow.innerHTML = '';
        testingSliderDotsContainer.innerHTML = '';
        console.log('Testing Slider: innerHTML cleared.');

        const originalSlideCount = testingOriginalCols.length;
        const slidesToClone = originalSlideCount;
        console.log('originalSlideCount:', originalSlideCount);
        console.log('slidesToClone:', slidesToClone);

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < slidesToClone; i++) {
            const clone = testingOriginalCols[originalSlideCount - 1 - i].cloneNode(true);
            fragment.appendChild(clone);
            console.log('Testing Slider: Prepended clone to fragment:', clone);
        }

        testingOriginalCols.forEach(slide => {
            fragment.appendChild(slide.cloneNode(true));
            console.log('Testing Slider: Appended original slide clone to fragment:', slide.cloneNode(true));
        });

        for (let i = 0; i < slidesToClone; i++) {
            const clone = testingOriginalCols[i].cloneNode(true);
            fragment.appendChild(clone);
            console.log('Testing Slider: Appended clone to fragment:', clone);
        }

        testingSliderRow.appendChild(fragment);
        console.log('Testing Slider: Fragment appended to testingSliderRow.');

        const allTestingSlides = Array.from(testingSliderRow.children);
        const totalSlidesWithClones = allTestingSlides.length;
        console.log('allTestingSlides (after cloning):', allTestingSlides);
        console.log('totalSlidesWithClones:', totalSlidesWithClones);

        let testingCurrentIndex = slidesToClone;
        console.log('testingCurrentIndex (initial):', testingCurrentIndex);

        testingSliderRow.style.width = `${totalSlidesWithClones * 100}%`;
        allTestingSlides.forEach(col => {
            col.style.width = `${100 / totalSlidesWithClones}%`;
        });
        console.log('testingSliderRow.style.width:', testingSliderRow.style.width);
        allTestingSlides.forEach((col, index) => console.log(`Slide ${index} width:`, col.style.width));


        for (let i = 0; i < originalSlideCount; i++) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.addEventListener('click', () => {
                testingCurrentIndex = slidesToClone + i;
                updateTestingSlider(true);
                updateTestingDots();
            });
            li.appendChild(button);
            testingSliderDotsContainer.appendChild(li);
            console.log('Testing Slider: Created dot for original slide:', i);
        }

        const testingDots = testingSliderDotsContainer.querySelectorAll('button');
        console.log('testingDots:', testingDots);

        function updateTestingSlider(smooth = true) {
            console.log('updateTestingSlider called. smooth:', smooth);
            testingSliderRow.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
            const translateXValue = `translateX(-${testingCurrentIndex * (100 / totalSlidesWithClones)}%)`;
            testingSliderRow.style.transform = translateXValue;
            console.log('testingCurrentIndex:', testingCurrentIndex, 'translateX:', translateXValue);
        }

        function updateTestingDots() {
            console.log('updateTestingDots called.');
            const activeDotIndex = (testingCurrentIndex - slidesToClone) % originalSlideCount;
            console.log('activeDotIndex:', activeDotIndex);
            testingDots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                    console.log('Dot', index, 'activated.');
                } else {
                    dot.classList.remove('active');
                    console.log('Dot', index, 'deactivated.');
                }
            });
        }

        function nextTestingSlide() {
            console.log('nextTestingSlide called.');
            testingCurrentIndex++;
            updateTestingSlider();
            updateTestingDots();

            if (testingCurrentIndex >= originalSlideCount + slidesToClone) {
                console.log('Testing Slider: Jumping to first original slide.');
                setTimeout(() => {
                    testingCurrentIndex = slidesToClone;
                    updateTestingSlider(false);
                }, 500);
            }
        }

        console.log('Testing Slider: Initial setup.');
        updateTestingSlider(false);
        updateTestingDots();

        setInterval(nextTestingSlide, 3000);
    }

    // // Final Wrapper Slider
    // const finalWrapperCover = document.querySelector('.final-wrapper-cover');
    // const finalWrapperRow = document.querySelector('.final-wrapper-row');
    // const finalWrapperMain = document.querySelector('.final-wrapper-main');
    // const initialFinalOriginalCols = Array.from(document.querySelectorAll('.final-wrapper-row .final-wrapper-col')); // Get initial slides before clearing

    // if (finalWrapperRow && initialFinalOriginalCols.length > 0 && finalWrapperCover && finalWrapperMain) {
    //     const originalFinalSlideCount = initialFinalOriginalCols.length; // Should be 2
    //     const slidesVisible = 2; // Number of slides visible at once (one left, one right of main)
    //     const finalSlidesToClone = slidesVisible; // Clone enough slides for seamless loop (2 from each end)

    //     // Clear existing children to avoid duplicates if script runs multiple times
    //     finalWrapperRow.innerHTML = '';

    //     const fragment = document.createDocumentFragment();

    //     // Prepend clones (last original slides)
    //     for (let i = finalSlidesToClone - 1; i >= 0; i--) { // Iterate backwards for correct prepending order
    //         const clone = initialFinalOriginalCols[originalFinalSlideCount - 1 - i].cloneNode(true);
    //         fragment.prepend(clone); // Prepend to fragment
    //     }
    //     // Append original slides
    //     initialFinalOriginalCols.forEach(slide => {
    //         fragment.appendChild(slide.cloneNode(true));
    //     });
    //     // Append clones (first original slides)
    //     for (let i = 0; i < finalSlidesToClone; i++) {
    //         const clone = initialFinalOriginalCols[i].cloneNode(true);
    //         fragment.appendChild(clone);
    //     }

    //     finalWrapperRow.appendChild(fragment); // Append fragment to the row

    //     const allFinalSlides = Array.from(finalWrapperRow.children); // Get all slides including clones
    //     const totalFinalSlidesWithClones = allFinalSlides.length; // Should be 2 (original) + 2 (prepended) + 2 (appended) = 6

    //     let finalCurrentIndex = finalSlidesToClone; // Start at the first original slide (index 2)

    //     // Set initial width for the slider row and individual slides
    //     finalWrapperRow.style.width = `${totalFinalSlidesWithClones * 25}vw`; // Each slide is 25vw
    //     allFinalSlides.forEach(col => {
    //         col.style.width = `25vw`;
    //     });

    //     function updateFinalSlider(smooth = true) {
    //         finalWrapperRow.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
    //         finalWrapperRow.style.transform = `translateX(-${finalCurrentIndex * 25}vw)`;

    //         // Update opacity
    //         allFinalSlides.forEach((slide, index) => {
    //             // The slides visible are at finalCurrentIndex (left) and finalCurrentIndex + 3 (right)
    //             // This is because final-wrapper-main is in the middle, taking up 2 slides worth of space.
    //             // So, the slides at index `finalCurrentIndex` and `finalCurrentIndex + 3` should have opacity 1.
    //             // All other slides should have opacity 0.
    //             if (index === finalCurrentIndex || index === finalCurrentIndex + 3) {
    //                 slide.classList.add('active-slide');
    //             } else {
    //                 slide.classList.remove('active-slide');
    //             }
    //         });
    //     }

    //     function nextFinalSlide() {
    //         finalCurrentIndex++;
    //         updateFinalSlider();

    //         // Seamless loop logic
    //         if (finalCurrentIndex >= originalFinalSlideCount + finalSlidesToClone) {
    //             setTimeout(() => {
    //                 finalCurrentIndex = finalSlidesToClone; // Jump to the first original slide
    //                 updateFinalSlider(false); // false for instant jump
    //             }, 500); // Match this with CSS transition duration
    //         }
    //     }

    //     // Initial setup
    //     updateFinalSlider(false); // Set initial position instantly

    //     setInterval(nextFinalSlide, 3000);
    // }
});

document.addEventListener('DOMContentLoaded', function () {
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const accordionBox = this.parentElement;
            const accordionContent = accordionBox.querySelector('.accordion-box-content');

            // Close all other accordions
            document.querySelectorAll('.accordion-box').forEach(box => {
                if (box !== accordionBox) {
                    box.querySelector('.accordion-btn').classList.remove('accordion-active-btn');
                    box.querySelector('.accordion-box-content').classList.remove('accordion-content-active');
                    box.querySelector('.accordion-box-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            this.classList.toggle('accordion-active-btn');
            accordionContent.classList.toggle('accordion-content-active');

            if (accordionContent.classList.contains('accordion-content-active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });
});


$(document).ready(function () {
    $('.project-row').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);


// 

$(document).ready(function () {
    $('.design-principal-cover ul').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 6000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('.infotainment-slider').slick({
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2000,
        cssEase: 'linear',
        infinite: true,
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'loop.html' || currentPage === 'setu.html' || currentPage === 'porsche.html') {
            menuToggle.addEventListener('click', function () {
                window.location.href = 'projects.html';
            });
        }
    }
});

$(document).ready(function () {
    $('.meet-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0, // no delay between slides
        speed: 8000,      // controls motion smoothness
        cssEase: 'linear', // smooth continuous scroll
        dots: false,
        arrows: false,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false
    });
});

$(document).ready(function () {
    $('.comfort-mode-row').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        arrows: false,
        dots: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});
$(document).ready(function () {
    $('.final-wrapper-row').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        infinite: true,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});


