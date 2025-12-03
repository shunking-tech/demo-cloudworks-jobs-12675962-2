document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger to ensure correct positions after images load
    ScrollTrigger.refresh();

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));

        // Handle wrapping
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    // Auto Play
    let timer = setInterval(nextSlide, slideInterval);

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(nextSlide, slideInterval);
    }

    // Concept Section Fade In
    gsap.from('.concept-content', {
        scrollTrigger: {
            trigger: '.concept',
            start: 'top 85%',
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Parallax Effect for Concept Image
    gsap.to('.concept-image', {
        scrollTrigger: {
            trigger: '.concept',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 50,
        scale: 1.1
    });

    // Concept Image Circle Mask Reveal
    gsap.fromTo('.concept-image-wrapper',
        {
            clipPath: 'circle(0% at 50% 50%)',
        },
        {
            scrollTrigger: {
                trigger: '.concept-image-wrapper',
                start: 'top 50%',
                toggleActions: "play none none reverse"
            },
            clipPath: 'circle(100% at 50% 50%)',
            duration: 10,
            ease: 'power4.out'
        }
    );

    // Category Items Stagger - FIXED
    // Ensure elements are visible if JS fails by not setting initial opacity in CSS, 
    // but handling it here.
    // Category Items Stagger - FIXED
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems.length > 0) {
        // Set initial state
        gsap.set(categoryItems, { y: 50, opacity: 0 });

        // Animate to final state
        gsap.to(categoryItems, {
            scrollTrigger: {
                trigger: '.collection',
                start: 'top 20%',
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // CTA Parallax
    gsap.to('.cta-bg', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 100
    });

    // Section Title Animation
    const sectionTitles = document.querySelectorAll('.section-title');

    sectionTitles.forEach(title => {
        const nodes = Array.from(title.childNodes);
        let newContent = document.createDocumentFragment();

        nodes.forEach(node => {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                text.split('').forEach(char => {
                    if (char.trim() === '') {
                        newContent.appendChild(document.createTextNode(char));
                    } else {
                        const span = document.createElement('span');
                        span.textContent = char;
                        span.style.display = 'inline-block';
                        newContent.appendChild(span);
                    }
                });
            } else {
                newContent.appendChild(node.cloneNode(true));
            }
        });

        title.innerHTML = '';
        title.appendChild(newContent);

        gsap.from(title.querySelectorAll('span'), {
            scrollTrigger: {
                trigger: title,
                start: 'top 70%',
                toggleActions: "play none none reverse"
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    });

});
