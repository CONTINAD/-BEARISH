document.addEventListener('DOMContentLoaded', () => {
    // Nav scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Copy CA
    const copyBtn = document.getElementById('copyBtn');
    const caAddress = document.getElementById('caAddress');

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(caAddress.textContent).then(() => {
            copyBtn.textContent = 'Copied';
            setTimeout(() => copyBtn.textContent = 'Copy', 1500);
        });
    });

    // Pump.fun & DexScreener links
    const CA = caAddress.textContent.trim();
    const isLive = CA && CA !== 'TBA';

    const pumpBaseUrl = 'https://pump.fun/coin/';
    const dexBaseUrl = 'https://dexscreener.com/solana/';

    // Set Pump.fun links
    const pumpUrl = isLive ? pumpBaseUrl + CA : '#';
    document.querySelectorAll('#buyBtn, #heroPumpBtn, #footerPump').forEach(el => {
        if (el) el.href = pumpUrl;
    });
    // Mobile nav pump button
    document.querySelectorAll('.mobile-menu .nav-btn').forEach(el => {
        el.href = pumpUrl;
    });

    // Set DexScreener links
    const dexUrl = isLive ? dexBaseUrl + CA : '#';
    const dexLink = document.getElementById('dexScreenerLink');
    const pumpLink = document.getElementById('pumpFunLink');
    const footerDex = document.getElementById('footerDex');
    if (dexLink) dexLink.href = dexUrl;
    if (pumpLink) pumpLink.href = pumpUrl;
    if (footerDex) footerDex.href = dexUrl;

    // DexScreener chart embed
    if (isLive) {
        const chartWrapper = document.getElementById('chartWrapper');
        const placeholder = document.getElementById('chartPlaceholder');
        if (chartWrapper && placeholder) {
            placeholder.remove();
            const iframe = document.createElement('iframe');
            iframe.src = `https://dexscreener.com/solana/${CA}?embed=1&theme=light&info=0`;
            iframe.title = 'DexScreener Chart';
            iframe.loading = 'lazy';
            chartWrapper.appendChild(iframe);
        }
    }

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-grid, .gallery-item, .step, .chart-wrapper, .chart-links, h2').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Gallery lightbox
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            const lb = document.createElement('div');
            lb.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);cursor:pointer;backdrop-filter:blur(8px)';
            const lbImg = document.createElement('img');
            lbImg.src = img.src;
            lbImg.style.cssText = 'max-width:90vw;max-height:88vh;object-fit:contain;border-radius:8px';
            lb.appendChild(lbImg);
            document.body.appendChild(lb);
            document.body.style.overflow = 'hidden';

            const close = () => {
                document.body.removeChild(lb);
                document.body.style.overflow = '';
            };
            lb.addEventListener('click', close);
            document.addEventListener('keydown', function esc(e) {
                if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
            });
        });
    });
});
