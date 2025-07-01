// Gestion des cookies
(function() {
    'use strict';

    // Configuration des cookies
    const COOKIE_CONFIG = {
        name: 'depanneurs_prives_cookies',
        duration: 365, // durée en jours
        domain: window.location.hostname
    };

    // Types de cookies
    const COOKIE_TYPES = {
        necessary: true, // toujours actifs
        analytics: false,
        third_party: false
    };

    // Vérifier si le bandeau doit être affiché
    function shouldShowBanner() {
        return !getCookieConsent();
    }

    // Obtenir le consentement actuel
    function getCookieConsent() {
        const consent = localStorage.getItem(COOKIE_CONFIG.name);
        return consent ? JSON.parse(consent) : null;
    }

    // Sauvegarder le consentement
    function saveCookieConsent(preferences) {
        const consent = {
            preferences: preferences,
            timestamp: new Date().getTime(),
            version: '1.0'
        };
        localStorage.setItem(COOKIE_CONFIG.name, JSON.stringify(consent));
        
        // Définir aussi un cookie pour les sous-domaines
        const expires = new Date();
        expires.setTime(expires.getTime() + (COOKIE_CONFIG.duration * 24 * 60 * 60 * 1000));
        document.cookie = `${COOKIE_CONFIG.name}=accepted; expires=${expires.toUTCString()}; path=/; domain=${COOKIE_CONFIG.domain}`;
    }

    // Créer le bandeau de cookies
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    🔒 <strong>Ce site utilise des cookies</strong> pour améliorer votre expérience, analyser le trafic et personnaliser les contenus.
                    👉 Vous pouvez <strong>accepter</strong>, <strong>refuser</strong> ou <strong>personnaliser</strong> vos préférences.
                </div>
                <div class="cookie-banner-buttons">
                    <button class="cookie-btn" onclick="acceptAllCookies()">Accepter</button>
                    <button class="cookie-btn secondary" onclick="rejectAllCookies()">Refuser</button>
                    <a href="gestion-cookies/" class="cookie-btn tertiary">Personnaliser</a>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Afficher le bandeau avec animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }

    // Masquer le bandeau
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Accepter tous les cookies
    window.acceptAllCookies = function() {
        const preferences = {
            necessary: true,
            analytics: true,
            third_party: true
        };
        saveCookieConsent(preferences);
        hideBanner();
        loadAnalytics();
        loadThirdPartyServices();
        console.log('✅ Tous les cookies acceptés');
    };

    // Refuser les cookies non nécessaires
    window.rejectAllCookies = function() {
        const preferences = {
            necessary: true,
            analytics: false,
            third_party: false
        };
        saveCookieConsent(preferences);
        hideBanner();
        console.log('❌ Cookies non nécessaires refusés');
    };

    // Charger Google Analytics (exemple)
    function loadAnalytics() {
        const consent = getCookieConsent();
        if (consent && consent.preferences.analytics) {
            // Charger Google Analytics ou autre outil d'analyse
            // gtag('config', 'GA_MEASUREMENT_ID');
            console.log('📊 Analytics chargé');
        }
    }

    // Charger les services tiers
    function loadThirdPartyServices() {
        const consent = getCookieConsent();
        if (consent && consent.preferences.third_party) {
            // Charger YouTube, Google Maps, etc.
            console.log('🔌 Services tiers chargés');
        }
    }

    // Initialiser selon le consentement existant
    function initializeCookies() {
        const consent = getCookieConsent();
        if (consent) {
            if (consent.preferences.analytics) {
                loadAnalytics();
            }
            if (consent.preferences.third_party) {
                loadThirdPartyServices();
            }
        }
    }

    // Fonction pour réinitialiser les préférences (utile pour les tests)
    window.resetCookiePreferences = function() {
        localStorage.removeItem(COOKIE_CONFIG.name);
        document.cookie = `${COOKIE_CONFIG.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${COOKIE_CONFIG.domain}`;
        location.reload();
    };

    // Initialisation au chargement de la page
    document.addEventListener('DOMContentLoaded', function() {
        initializeCookies();
        
        if (shouldShowBanner()) {
            createCookieBanner();
        }
    });

    // Exposer une fonction pour gérer les préférences personnalisées
    window.setCookiePreferences = function(preferences) {
        saveCookieConsent(preferences);
        hideBanner();
        
        // Recharger les services selon les nouvelles préférences
        if (preferences.analytics) {
            loadAnalytics();
        }
        if (preferences.third_party) {
            loadThirdPartyServices();
        }
        
        console.log('⚙️ Préférences cookies mises à jour:', preferences);
    };

})();
