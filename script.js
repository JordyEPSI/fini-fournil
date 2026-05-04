document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LOADER (Disparaît après 1 seconde)
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 600);
        }
    }, 1000);

    // 2. STATUT OUVERTURE (Pastille Verte/Rouge)
    const updateStatus = () => {
        const badge = document.getElementById('status-badge');
        if (!badge) return;
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        // Ouvre à 7h le weekend (0 = Dimanche, 6 = Samedi), sinon 6h en semaine
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

    // 3. NOM DU FICHIER PDF (Formulaire Contact)
    const fileInput = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', (e) => {
            const name = e.target.files[0]?.name || "Aucun fichier choisi";
            fileNameDisplay.innerText = name;
            fileNameDisplay.style.color = "#C5A059";
        });
    }

    // 4. SCROLL PROGRESS BAR ET ANIMATIONS "REVEAL"
    window.addEventListener('scroll', () => {
        // Barre de progression en haut
        const progress = document.getElementById('scroll-progress-bar');
        if (progress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progress.style.width = (winScroll / height) * 100 + "%";
        }

        // Fait apparaître les éléments au défilement
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });

        // Affiche/Cache le bouton retour en haut
        const backBtn = document.getElementById('backToTop');
        if (backBtn) {
            backBtn.style.display = window.scrollY > 500 ? "block" : "none";
        }
    });

    // Action du bouton retour en haut
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // 5. MENU BURGER MOBILE
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Ferme le menu quand on clique sur un lien
        document.querySelectorAll('#nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // 6. ACCORDÉON FAQ
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('i');
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
