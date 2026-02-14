/* ========================================
   $BEARISH — Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ===== Copy Contract Address =====
    const copyBtn = document.getElementById('copyBtn');
    const caAddress = document.getElementById('caAddress');

    copyBtn.addEventListener('click', () => {
        const text = caAddress.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = '✅';
            setTimeout(() => {
                copyBtn.textContent = '📋';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            copyBtn.textContent = '✅';
            setTimeout(() => {
                copyBtn.textContent = '📋';
            }, 2000);
        });
    });

    // ===== Scroll Reveal Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to sections and cards
    const animateElements = document.querySelectorAll(
        '.about-grid, .trait-card, .gallery-item, .step-card, .section-title, .section-sub'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // ===== Parallax effect on hero image =====
    const heroImg = document.getElementById('heroImg');
    
    if (heroImg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.15;
            heroImg.style.transform = `translateY(${rate}px)`;
        });
    }

    // ===== Gallery image click - lightbox effect =====
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-backdrop"></div>
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            `;

            // Styles
            Object.assign(lightbox.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '9999',
                animation: 'fadeIn 0.3s ease'
            });

            const backdrop = lightbox.querySelector('.lightbox-backdrop');
            Object.assign(backdrop.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)'
            });

            const lbImg = lightbox.querySelector('img');
            Object.assign(lbImg.style, {
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '12px',
                position: 'relative',
                zIndex: '1',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            });

            const closeBtn = lightbox.querySelector('.lightbox-close');
            Object.assign(closeBtn.style, {
                position: 'absolute',
                top: '24px',
                right: '32px',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '3rem',
                cursor: 'pointer',
                zIndex: '2',
                lineHeight: '1',
                fontWeight: '300'
            });

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 280);
            };

            closeBtn.addEventListener('click', closeLightbox);
            backdrop.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // Add lightbox animations to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ===== Cursor trail effect (desktop only) =====
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            Object.assign(trail.style, {
                position: 'fixed',
                left: e.clientX + 'px',
                top: e.clientY + 'px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'rgba(0, 230, 118, 0.6)',
                pointerEvents: 'none',
                zIndex: '9998',
                transition: 'all 0.5s ease',
                transform: 'translate(-50%, -50%)'
            });
            document.body.appendChild(trail);
            
            requestAnimationFrame(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'translate(-50%, -50%) scale(3)';
            });

            setTimeout(() => {
                if (trail.parentNode) trail.parentNode.removeChild(trail);
            }, 500);
        });
    }
});
