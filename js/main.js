// Main JavaScript for Crkle website
(function() {
    'use strict';

    // Mobile menu functionality
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav-links');
        
        if (toggle && nav) {
            toggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    // Header background on scroll
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        function updateHeader() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Initial call
    }

    // Animate elements on scroll
    function initScrollAnimation() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        document.querySelectorAll('.feature-card, .download-card, .platform-item, .pricing-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Track button clicks for analytics
    function trackClick(category, action, label) {
        // Basic analytics tracking - can be expanded with Google Analytics, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        console.log(`Track: ${category} - ${action} - ${label}`);
    }

    // Add click tracking to download buttons
    function initDownloadTracking() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const text = this.textContent.trim();
                
                if (href && (href.includes('download') || href.includes('chrome.google.com'))) {
                    trackClick('Download', 'Click', text);
                }
            });
        });
    }

    // Feature card hover effects
    function initCardEffects() {
        document.querySelectorAll('.feature-card, .download-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Initialize everything when DOM is ready
    function init() {
        initMobileMenu();
        initSmoothScrolling();
        initHeaderScroll();
        initScrollAnimation();
        initDownloadTracking();
        initCardEffects();
    }

    // Wait for DOM content to be loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Global functions for external use
    window.CrkleWebsite = {
        trackClick: trackClick
    };

})();

// Additional CSS for animations
const additionalStyles = `
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: var(--shadow-lg);
        z-index: 999;
    }

    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .mobile-menu-toggle {
            display: flex !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);