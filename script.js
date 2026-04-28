document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOADER PREMIUM ---
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1200);

    // --- 2. STATUT OUVERTURE DYNAMIQUE ---
    const updateStatus = () => {
        const badge = document.getElementById('status-badge');
        if (!badge) return;
        const now = new Date();
        const day = now.getDay(); 
        const hour = now.getHours();
        const openingHour = (day === 0 || day === 6) ? 7 : 6;
        if (hour >= openingHour && hour < 20) {
            badge.innerText = "● OUVERT ACTUELLEMENT";
            badge.className = "status-badge open";
        } else {
            badge.innerText = `● FERMÉ - OUVRE À ${openingHour}H00`;
            badge.className = "status-badge closed";
        }
    };
    updateStatus();

    // --- 3. MENU BURGER MOBILE ---
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
                menuToggle.querySelector('i').className = "fas fa-bars";
            });
        });
    }

    // --- 4. CARROUSEL AVEC SWIPE & RESET CHRONO ---
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
        nextBtn.addEventListener('click', () => { 
            showSlide(currentIndex + 1);
            resetInterval();
        });
        prevBtn.addEventListener('click', () => { 
            showSlide(currentIndex - 1);
            resetInterval();
        });
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

    // --- 5. FAQ ---
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });

    // --- 6. SCROLL REVEAL & PROGRESS BAR ---
    const handleScroll = () => {
        const progressBar = document.getElementById('scroll-progress-bar');
        if (progressBar) {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}%`;
            progressBar.style.width = scroll;
        }
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
        const backBtn = document.getElementById('backToTop');
        if (backBtn) backBtn.style.display = (window.scrollY > 400) ? "block" : "none";
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    const backBtn = document.getElementById('backToTop');
    if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
