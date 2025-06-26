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
     * Initialise le menu mobile
     */
    initMobileMenu() {
        const mobileToggle = document.querySelector(SITE_CONFIG.selectors.mobileToggle);
        const navLinks = document.querySelector(SITE_CONFIG.selectors.navLinks);

        if (!mobileToggle || !navLinks) return;

        // Toggle du menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fermer le menu sur clic des liens
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fermer le menu sur clic extérieur
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    /**
     * Initialise le formulaire de contact
     */
    initContactForm() {
        // Cette fonction sera appelée depuis contact_form.js
        // pour éviter la duplication de code
        if (typeof initContactForm === 'function') {
            initContactForm();
        }
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
