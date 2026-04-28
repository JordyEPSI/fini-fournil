document.addEventListener('DOMContentLoaded', () => {
    
    // Loader
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1000);

    // Affichage nom du fichier PDF
    const fileInput = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const name = e.target.files[0]?.name || "Aucun fichier choisi";
            fileNameDisplay.innerText = name;
            fileNameDisplay.style.color = "#C5A059"; 
        });
    }

    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const handleScroll = () => {
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Menu Burger Mobile
    const burger = document.getElementById('mobile-menu');
    const nav = document.getElementById('nav-list');
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});
