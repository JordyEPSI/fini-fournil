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

    // 4. SCROLL PROGRESS & REVEAL
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

    // 5. MENU MOBILE
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => navList.classList.toggle('active'));
    }
});
