/* ═══════════════════════════════════════════════════════════════════════════════
   THE TRADING MENTORS - RESPONSIVE INTERACTIONS
   Mobile navigation, touch interactions, responsive utilities
   ═══════════════════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    /* ═══════════════════════════════════════════════════════════════════════════
       1. MOBILE NAVIGATION TOGGLE (UNIFIED - NO DUPLICATES)
       ═══════════════════════════════════════════════════════════════════════════ */
    const mobileToggle = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        // Toggle menu on button click
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileToggle.setAttribute('aria-expanded', 'true');
                mobileToggle.querySelector('i').classList.replace('fa-bars', 'fa-times');
            } else {
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                mobileToggle.focus();
            }
        });
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       2. TICKER TAPE EXISTENCE CHECK
       ─────────────────────────────────────────────────────────────────────────────── */
    const tickerTape = document.querySelector('.ticker-tape, [class*="ticker"]');
    if (tickerTape) {
        document.body.classList.add('has-ticker');
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       3. RESPONSIVE IMAGE LAZY LOADING
       ─────────────────────────────────────────────────────────────────────────────── */
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        const lazyScript = document.createElement('script');
        lazyScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        lazyScript.async = true;
        document.head.appendChild(lazyScript);
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       4. FOOTER ACCORDION (MOBILE)
       ─────────────────────────────────────────────────────────────────────────────── */
    const footerSections = document.querySelectorAll('.footer__section');
    
    if (window.innerWidth < 768) {
        footerSections.forEach(section => {
            const title = section.querySelector('.footer__title');
            if (title) {
                title.addEventListener('click', () => {
                    // Close others
                    footerSections.forEach(other => {
                        if (other !== section) {
                            other.classList.remove('is-open');
                        }
                    });
                    section.classList.toggle('is-open');
                });
            }
        });
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       5. SMOOTH SCROLL FOR ANCHOR LINKS
       ─────────────────────────────────────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.nav')?.offsetHeight || 60;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ───────────────────────────────────────────────────────────────────────────────
       6. RESPONSIVE FONT SIZE ADJUSTMENT
       ─────────────────────────────────────────────────────────────────────────────── */
    function adjustFontSize() {
        const vw = window.innerWidth;
        const root = document.documentElement;
        
        // Calculate fluid font size based on viewport
        let fontSize;
        if (vw < 480) {
            fontSize = 14;
        } else if (vw < 768) {
            fontSize = 15;
        } else if (vw < 1024) {
            fontSize = 16;
        } else {
            fontSize = 16;
        }
        
        root.style.fontSize = fontSize + 'px';
    }
    
    // Run on load and resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustFontSize, 100);
    });
    adjustFontSize();

    /* ───────────────────────────────────────────────────────────────────────────────
       7. VIEWPORT UNIT POLYFILL (if needed)
       ─────────────────────────────────────────────────────────────────────────────── */
    if (typeof CSS !== 'undefined' && CSS.supports('font-size', '1vw')) {
        // Viewport units supported
    } else {
        // Fallback polyfill could be added here
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       8. PREFERS-REDUCED-MOTION CHECK
       ─────────────────────────────────────────────────────────────────────────────── */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Remove animation attributes
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.removeAttribute('data-animate');
        });
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       9. TOUCH OPTIMIZATION
       ─────────────────────────────────────────────────────────────────────────────── */
    if ('ontouchstart' in window) {
        document.body.classList.add('touch');
        
        // Disable hover effects on touch devices
        document.querySelectorAll('.hover-lift, [class*="hover:"]').forEach(el => {
            el.classList.remove('hover-lift');
        });
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       10. ACCESSIBILITY: SKIP LINK
       ─────────────────────────────────────────────────────────────────────────────── */
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    /* ───────────────────────────────────────────────────────────────────────────────
       11. FOCUS MANAGEMENT FOR MODALS
       ─────────────────────────────────────────────────────────────────────────────── */
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.setAttribute('aria-hidden', 'false');
                modal.style.display = 'flex';
                
                // Focus first input
                const firstInput = modal.querySelector('input, button');
                if (firstInput) firstInput.focus();
                
                // Trap focus
                trapFocus(modal);
            }
        });
    });

    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
            if (e.key === 'Escape') {
                closeModal(element);
            }
        });
    }

    function closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       12. RESPONSIVE IMAGE SRC SET
       ─────────────────────────────────────────────────────────────────────────────── */
    document.querySelectorAll('img[data-srcset]').forEach(img => {
        const srcset = img.dataset.srcset;
        if (srcset && window.innerWidth) {
            const sources = srcset.split(',').map(s => s.trim().split(' '));
            const sorted = sources.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));
            
            for (const [url, width] of sorted) {
                if (window.innerWidth <= parseInt(width)) {
                    img.src = url;
                    break;
                }
            }
        }
    });

    /* ───────────────────────────────────────────────────────────────────────────────
       13. PERFORMANCE: LAZY LOAD VIDEOS
       ─────────────────────────────────────────────────────────────────────────────── */
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src) {
                        video.src = video.dataset.src;
                        video.load();
                        videoObserver.unobserve(video);
                    }
                }
            });
        }, { rootMargin: '100px' });

        document.querySelectorAll('video[data-src]').forEach(video => {
            videoObserver.observe(video);
        });
    }

    /* ───────────────────────────────────────────────────────────────────────────────
       14. RESPONSIVE GRID HELPERS
       ─────────────────────────────────────────────────────────────────────────────── */
    function initGridHelpers() {
        const grids = document.querySelectorAll('[data-grid-auto-fit]');
        
        grids.forEach(grid => {
            const minWidth = grid.dataset.gridAutoFit || 280;
            grid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minWidth}px, 1fr))`;
        });
    }
    initGridHelpers();

    /* ───────────────────────────────────────────────────────────────────────────────
       15. READY STATE
       ─────────────────────────────────────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('js-ready');
        });
    } else {
        document.body.classList.add('js-ready');
    }

})();

/* ═══════════════════════════════════════════════════════════════════════════════
   PERFORMANCE CHECKLIST:
   ✓ Container queries usage
   ✓ Will-change optimization  
   ✓ Font loading strategy (font-display: swap)
   ✓ Lazy loading for images/videos
   ═══════════════════════════════════════════════════════════════════════════════

   ACCESSIBILITY CHECKLIST:
   ✓ Touch targets: 44x44px minimum
   ✓ Focus visible: 3px outline with offset
   ✓ prefers-reduced-motion support
   ✓ Skip to main content link
   ✓ Focus trap for modals
   ✓ Screen reader friendly (aria labels)
   ═══════════════════════════════════════════════════════════════════════════════ */