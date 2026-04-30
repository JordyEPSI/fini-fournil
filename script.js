document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOADER
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    }, 1200);

    // 2. STATUT OUVERTURE
    const updateStatus = () => {
        const badge = document.getElementById('status-badge');
        if (!badge) return;
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        const openTime = (day === 0 || day === 6) ? 7 : 6;
        if (hour >= openTime && hour < 20) {
            badge.innerText = "● OUVERT ACTUELLEMENT";
            badge.className = "status-badge open";
        } else {
            badge.innerText = `● FERMÉ - OUVRE À ${openTime}H`;
            badge.className = "status-badge closed";
        }
    };
    updateStatus();

    // 3. NOM DU PDF SELECTIONNÉ
    const fileInput = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', (e) => {
            const name = e.target.files[0]?.name || "Aucun fichier choisi";
            fileNameDisplay.innerText = name;
            fileNameDisplay.style.color = "#C5A059";
        });
    }

    // 4. MENU MOBILE
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
        document.querySelectorAll('#nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = "fas fa-bars";
            });
        });
    }

    // 5. CARROUSEL AVEC SWIPE & RESET
    const slides = document.querySelectorAll('.carousel-slide');
    const carouselContainer = document.getElementById('main-carousel');
    let currentIndex = 0;
    const showSlide = (n) => {
        if (slides.length === 0) return;
        slides[currentIndex].classList.remove('active');
        currentIndex = (n + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
    };
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let autoPlay = setInterval(() => showSlide(currentIndex + 1), 5000);
    
    const resetInterval = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => showSlide(currentIndex + 1), 5000);
    };
    
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { showSlide(currentIndex + 1); resetInterval(); });
        prevBtn.addEventListener('click', () => { showSlide(currentIndex - 1); resetInterval(); });
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoPlay);
        }, {passive: true});
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) showSlide(currentIndex - 1);
                else showSlide(currentIndex + 1);
            }
            autoPlay = setInterval(() => showSlide(currentIndex + 1), 5000);
        }, {passive: true});
    }

    // 6. FAQ
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });

    // 7. SCROLL PROGRESS & REVEAL
    window.addEventListener('scroll', () => {
        const progress = document.getElementById('scroll-progress-bar');
        if (progress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progress.style.width = (winScroll / height) * 100 + "%";
        }

        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });

        const backBtn = document.getElementById('backToTop');
        if (backBtn) backBtn.style.display = window.scrollY > 400 ? "block" : "none";
    });

    const backBtn = document.getElementById('backToTop');
    if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
