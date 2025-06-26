/**
 * Fichier principal - Dépanneurs Privés
 * Contient toutes les fonctionnalités communes du site
 */

// Configuration globale
const SITE_CONFIG = {
    // Animation settings
    animation: {
        threshold: 0.15,
        cardDelay: 200,
        focusInterval: 2000
    },
    
    // Elements selectors
    selectors: {
        animatedElements: '.animated, .animated-title, .animated-left, .animated-right, .animated-scale, .animated-fade',
        serviceCards: '.service-detailed-card',
        zoneCards: '.zone-card',
        whyCards: '.why-card',
        modalBg: '#modalRdvBg',
        modalClose: '#modalRdvClose',
        modalForm: '.modal-form',
        btnRdv: '.btn-secondary',
        btnContact: '.nav-links a[href="index.html#contact"], .nav-links a[href="#contact"]',
        mobileToggle: '.mobile-menu-toggle',
        navLinks: '.nav-links'
    }
};

/**
 * Classe principale pour gérer toutes les fonctionnalités du site
 */
class DepanneurPriveApp {
    constructor() {
        this.observers = [];
        this.intervals = [];
        this.init();
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        console.log('🚀 Initialisation Dépanneurs Privés');
        
        // Initialiser toutes les fonctionnalités
        this.initScrollAnimations();
        this.initCardFocusAnimation();
        this.initModal();
        this.initMobileMenu();
        this.initContactForm();
        this.initHeroVideo();
        
        console.log('✅ Application initialisée avec succès');
    }

    /**
     * Initialise les animations au scroll
     */
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll(SITE_CONFIG.selectors.animatedElements);
        const serviceCards = document.querySelectorAll(SITE_CONFIG.selectors.serviceCards);
        const zoneCards = document.querySelectorAll(SITE_CONFIG.selectors.zoneCards);
        
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Délai progressif pour les cartes
                    if (entry.target.matches(SITE_CONFIG.selectors.serviceCards) || 
                        entry.target.matches(SITE_CONFIG.selectors.zoneCards)) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * SITE_CONFIG.animation.cardDelay);
                    } else {
                        entry.target.classList.add('visible');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: SITE_CONFIG.animation.threshold });

        // Observer tous les éléments animés
        [...animatedElements, ...serviceCards, ...zoneCards].forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    /**
     * Animation focus orange sur les why-cards (page d'accueil uniquement)
     */
    initCardFocusAnimation() {
        const whyCards = document.querySelectorAll(SITE_CONFIG.selectors.whyCards);
        
        if (whyCards.length === 0) return;

        let currentIndex = 0;
        
        const updateFocus = () => {
            whyCards.forEach((card, index) => {
                card.classList.toggle('focus-orange', index === currentIndex);
            });
            currentIndex = (currentIndex + 1) % whyCards.length;
        };

        // Premier focus immédiat
        updateFocus();
        
        // Interval pour changer le focus
        const interval = setInterval(updateFocus, SITE_CONFIG.animation.focusInterval);
        this.intervals.push(interval);
    }

    /**
     * Initialise la modal RDV
     */
    initModal() {
        const btnRdv = document.querySelector(SITE_CONFIG.selectors.btnRdv);
        const btnContact = document.querySelector(SITE_CONFIG.selectors.btnContact);
        const modalBg = document.querySelector(SITE_CONFIG.selectors.modalBg);
        const modalClose = document.querySelector(SITE_CONFIG.selectors.modalClose);

        if (!modalBg) return;

        const openModal = (e) => {
            if (e) e.preventDefault();
            modalBg.classList.add('active');
        };

        const closeModal = () => {
            modalBg.classList.remove('active');
        };

        // Event listeners
        if (btnRdv) btnRdv.addEventListener('click', openModal);
        if (btnContact) btnContact.addEventListener('click', openModal);
        if (modalClose) modalClose.addEventListener('click', closeModal);

        // Fermer avec Escape ou clic sur le background
        modalBg.addEventListener('click', (e) => {
            if (e.target === modalBg) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    /**
     * Initialise le menu mobile avec gestion du scroll
     */
    initMobileMenu() {
        const mobileToggle = document.querySelector(SITE_CONFIG.selectors.mobileToggle);
        const navLinks = document.querySelector(SITE_CONFIG.selectors.navLinks);
        const body = document.body;

        if (!mobileToggle || !navLinks) return;

        // Toggle du menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mobileToggle.classList.contains('active');
            
            if (isActive) {
                // Fermer le menu
                this.closeMobileMenu(mobileToggle, navLinks, body);
            } else {
                // Ouvrir le menu
                this.openMobileMenu(mobileToggle, navLinks, body);
            }
        });

        // Fermer le menu sur clic des liens
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu(mobileToggle, navLinks, body);
            });
        });

        // Fermer le menu sur clic extérieur
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                this.closeMobileMenu(mobileToggle, navLinks, body);
            }
        });

        // Fermer le menu sur escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                this.closeMobileMenu(mobileToggle, navLinks, body);
            }
        });

        // Fermer le menu sur redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
                this.closeMobileMenu(mobileToggle, navLinks, body);
            }
        });
    }

    /**
     * Ouvre le menu mobile et bloque le scroll
     */
    openMobileMenu(toggle, navLinks, body) {
        toggle.classList.add('active');
        navLinks.classList.add('active');
        body.classList.add('menu-open');
        
        // Bloquer le scroll sur mobile
        if (window.innerWidth <= 900) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        }
    }

    /**
     * Ferme le menu mobile et restaure le scroll
     */
    closeMobileMenu(toggle, navLinks, body) {
        toggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Restaurer le scroll
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }

    /**
     * Initialise le formulaire de contact
     */
    initContactForm() {
        // Appeler la fonction depuis contact_form.js une seule fois
        if (typeof initContactForm === 'function') {
            initContactForm();
        }
    }

    /**
     * Initialise la fonctionnalité vidéo hero
     */
    initHeroVideo() {
        const heroVideo = document.getElementById('heroVideo');
        const videoThumbnail = document.getElementById('videoThumbnail');
        const playButton = document.getElementById('playButton');

        if (!heroVideo || !videoThumbnail || !playButton) return;

        const playVideo = () => {
            // Copier les dimensions de l'image vers la vidéo
            const imgRect = videoThumbnail.getBoundingClientRect();
            heroVideo.style.width = videoThumbnail.offsetWidth + 'px';
            heroVideo.style.height = videoThumbnail.offsetHeight + 'px';
            
            // Masquer l'image et le bouton play
            videoThumbnail.style.display = 'none';
            playButton.style.display = 'none';
            
            // Afficher et lancer la vidéo
            heroVideo.style.display = 'block';
            heroVideo.play().catch(err => {
                console.error('Erreur lors de la lecture de la vidéo:', err);
                // En cas d'erreur, remettre l'image
                videoThumbnail.style.display = 'block';
                playButton.style.display = 'block';
                heroVideo.style.display = 'none';
            });
        };

        // Event listeners pour lancer la vidéo
        videoThumbnail.addEventListener('click', playVideo);
        playButton.addEventListener('click', playVideo);

        // Remettre l'image quand la vidéo se termine
        heroVideo.addEventListener('ended', () => {
            heroVideo.style.display = 'none';
            videoThumbnail.style.display = 'block';
            playButton.style.display = 'block';
        });

        // Gérer les erreurs de chargement
        heroVideo.addEventListener('error', (e) => {
            console.error('Erreur de chargement de la vidéo:', e);
            // Garder l'image affichée en cas d'erreur
            videoThumbnail.style.display = 'block';
            playButton.style.display = 'block';
            heroVideo.style.display = 'none';
        });

        // Ajuster les dimensions lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            if (heroVideo.style.display === 'block') {
                heroVideo.style.width = videoThumbnail.offsetWidth + 'px';
                heroVideo.style.height = videoThumbnail.offsetHeight + 'px';
            }
        });
    }

    /**
     * Nettoyer les observers et intervals (pour éviter les fuites mémoire)
     */
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.intervals.forEach(interval => clearInterval(interval));
    }
}

// Initialisation globale
window.depanneurPriveApp = new DepanneurPriveApp();

// Nettoyage lors du déchargement de la page
window.addEventListener('beforeunload', () => {
    if (window.depanneurPriveApp) {
        window.depanneurPriveApp.cleanup();
    }
});
