document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOADER PREMIUM ---
    // Cache l'écran de chargement après 1.2 seconde pour une UX fluide
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
        
        // Récupère l'heure locale de Montpellier
        const now = new Date();
        const day = now.getDay(); 
        const hour = now.getHours();
        
        // Définit l'heure d'ouverture selon le jour (plus tard le WE)
        const openingHour = (day === 0 || day === 6) ? 7 : 6;
        
        // Vérifie si la boulangerie est actuellement ouverte (jusqu'à 20h)
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
        // Ouvre/Ferme le menu au clic
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Change l'icône burger en X
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
        
        // Ferme le menu automatiquement au clic sur un lien
        document.querySelectorAll('#nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.querySelector('i').className = "fas fa-bars";
            });
        });
    }

    // --- 4. CARROUSEL AVEC GESTION TACTILE (SWIPE) & CHRONO ---
    const slides = document.querySelectorAll('.carousel-slide');
    const carouselContainer = document.getElementById('main-carousel');
    let currentIndex = 0;
    
    // Fonction d'affichage d'une slide spécifique
    const showSlide = (n) => {
        if (slides.length === 0) return;
        // Cache la slide actuelle
        slides[currentIndex].classList.remove('active');
        // Calcule l'index suivant (avec boucle infinie)
        currentIndex = (n + slides.length) % slides.length;
        // Affiche la nouvelle slide
        slides[currentIndex].classList.add('active');
    };
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Défilement automatique toutes les 5 secondes
    let autoPlay = setInterval(() => showSlide(currentIndex + 1), 5000);

    // Fonction pour remettre le chrono à zéro après une interaction
    const resetInterval = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => showSlide(currentIndex + 1), 5000);
    };

    // Gestion des clics sur les boutons flèches
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { 
            showSlide(currentIndex + 1);
            resetInterval(); // Relance le chrono
        });
        prevBtn.addEventListener('click', () => { 
            showSlide(currentIndex - 1);
            resetInterval(); // Relance le chrono
        });
    }
    
    // Gestion du swipe tactile (glissement du doigt)
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselContainer) {
        // Enregistre la position initiale du doigt
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            // Arrête l'autoplay temporairement
            clearInterval(autoPlay);
        }, {passive: true});
        
        // Calcule la distance de glissement à la fin du toucher
        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            
            // Seuil de détection du swipe (50px)
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    showSlide(currentIndex - 1); // Swipe à droite -> Précédent
                } else {
                    showSlide(currentIndex + 1); // Swipe à gauche -> Suivant
                }
            }
            // Relance l'autoplay après interaction
            autoPlay = setInterval(() => showSlide(currentIndex + 1), 5000);
        }, {passive: true});
    }

    // --- 5. FAQ INTERACTIVE (ACCORDÉON) ---
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            
            // Ferme toutes les autres réponses
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            
            // Ouvre/Ferme la réponse cliquée
            answer.style.display = isVisible ? 'none' : 'block';
            
            // Fait pivoter l'icône flèche (Optionnel si géré en CSS)
            // q.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });

    // --- 6. SCROLL REVEAL, BACK TO TOP & BARRE DE PROGRESSION ---
    const handleScroll = () => {
        // A. Barre de progression de lecture (Scroll Progress)
        const progressBar = document.getElementById('scroll-progress-bar');
        if (progressBar) {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = `${(totalScroll / windowHeight) * 100}%`;
            progressBar.style.width = scrollPercent;
        }

        // B. Apparition des éléments au défilement (Reveal)
        document.querySelectorAll('.reveal').forEach(el => {
            // Si l'élément est proche de la zone visible
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });

        // C. Affichage du bouton "Retour en haut"
        const backBtn = document.getElementById('backToTop');
        if (backBtn) {
            backBtn.style.display = (window.scrollY > 400) ? "block" : "none";
        }
    };

    // Attache la fonction handleScroll à l'événement de défilement
    window.addEventListener('scroll', handleScroll);
    // Déclenchement initial au chargement de la page
    handleScroll();

    // Logique du bouton "Retour en haut" au clic
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
