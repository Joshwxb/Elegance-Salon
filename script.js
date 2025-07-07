document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump to anchor

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // scrollIntoView will automatically respect the 'scroll-margin-top' CSS property
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link (important for UX)
                if (mobileMenu && mobileMenu.classList.contains('flex')) {
                    mobileMenu.classList.remove('flex');
                    mobileMenu.classList.add('hidden');
                    mobileMenuIcon.classList.remove('fa-times');
                    mobileMenuIcon.classList.add('fa-bars');
                }
            } else {
                console.warn(`Target element with ID "${targetId}" not found.`);
            }
        });
    });

    // --- Mobile Menu Toggle Functionality ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');

    // Add a check to ensure elements exist before adding event listeners
    if (mobileMenuButton && mobileMenu && mobileMenuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Toggles display: none
            mobileMenu.classList.toggle('flex');    // Toggles display: flex

            // Toggle the Font Awesome icon for the menu button
            if (mobileMenu.classList.contains('flex')) {
                mobileMenuIcon.classList.remove('fa-bars'); // Show 'X'
                mobileMenuIcon.classList.add('fa-times');
            } else {
                mobileMenuIcon.classList.remove('fa-times'); // Show hamburger
                mobileMenuIcon.classList.add('fa-bars');
            }
        });
    } else {
        // This console error will appear in your browser's developer console
        // if any of these critical elements are missing from the HTML.
        console.error("Mobile menu elements not found! Check IDs: 'mobile-menu-button', 'mobile-menu', 'mobile-menu-icon'.");
    }

    // --- Image Carousel Functionality ---
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    // Ensure these elements exist before proceeding with carousel logic
    if (carousel && prevBtn && nextBtn) {
        const carouselItems = Array.from(carousel.children); // Get all direct children as items
        let currentIndex = 0;

        function showCarouselItem(index) {
            // Apply transform to the carousel container to slide the items horizontally
            // Each item is 100% width, so we move by multiples of 100%
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
            showCarouselItem(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === carouselItems.length - 1) ? 0 : currentIndex + 1;
            showCarouselItem(currentIndex);
        });

        // Initialize carousel to show the first item on load
        showCarouselItem(currentIndex);
    } else {
        console.warn("Carousel elements not found. Carousel functionality may not work.");
    }

    // --- Scroll Reveal Animations using Intersection Observer ---
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observerOptions = {
        root: null, // The viewport is the root
        rootMargin: '0px',
        threshold: 0.1 // Callback fires when 10% of the target is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear'); // Add the 'appear' class to trigger animation
                observer.unobserve(entry.target); // Stop observing once it's visible to avoid re-triggering
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element); // Start observing each animated element
    });

    // --- Booking Modal Functionality ---
    const bookNowButtons = document.querySelectorAll('#book-now-btn, #book-now-mobile-btn, #hero-book-btn');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (bookingModal && closeModalBtn) { // Check if modal elements exist
        bookNowButtons.forEach(button => {
            button.addEventListener('click', () => {
                bookingModal.classList.remove('hidden'); // Show the modal
            });
        });

        closeModalBtn.addEventListener('click', () => {
            bookingModal.classList.add('hidden'); // Hide the modal
        });

        // Close modal if clicked anywhere on the overlay (outside the inner box)
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.add('hidden');
            }
        });
    } else {
        console.warn("Booking modal elements not found. Modal functionality may not work.");
    }

    // --- Basic Contact Form Validation (Client-Side) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { // Check if form exists
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission to handle with JS

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.'); // Simple alert for missing fields
                return; // Stop form submission
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.'); // Simple alert for invalid email
                return; // Stop form submission
            }

            // If all validations pass, you would typically send data to a server here.
            // For this example, we just log and alert a success message.
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset(); // Clear the form fields after successful (simulated) submission
        });
    } else {
        console.warn("Contact form not found. Form validation will not work.");
    }

    // Helper function for email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});