
/**
 * Configuration Email - Dépanneurs Privés
 * Configuration centralisée pour tous les services d'email
 */

// Configuration EmailJS uniquement
const EMAIL_CONFIG = {
    // Adresse de destination
    destination: 'ghaithraid@gmail.com',
    
    // Configuration EmailJS (gratuit, 200 emails/mois)
    emailjs: {
        service_id: 'service_sr6b87l',    // Votre Service ID EmailJS
        template_id: 'template_t3mzsxw',  // Votre Template ID EmailJS  
        public_key: '9BO4jX843DpIDmKhz'    // À remplacer par votre Public Key EmailJS
    },
    
    // Messages d'interface
    messages: {
        success: 'Message envoyé avec succès ! Nous vous répondrons rapidement.',
        error: 'Erreur lors de l\'envoi. Veuillez réessayer.',
        sending: 'ENVOI EN COURS...',
        validation_error: 'Veuillez remplir tous les champs obligatoires.',
        mailto_fallback: 'Votre client email va s\'ouvrir pour envoyer le message.'
    }
};

// Configuration pour la validation
const FORM_CONFIG = {
    validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[0-9\s\-\+\(\)]{8,}$/
    },
    ui: {
        errorColor: '#ff4444',
        successColor: '#44aa44',
        notificationDuration: 5000
    }
};

// Export pour l'utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAIL_CONFIG, FORM_CONFIG };
}

// Instructions d'utilisation :
// 1. Remplacez 'VOTRE_PUBLIC_KEY' par votre Public Key EmailJS
// 2. Vous avez déjà configuré service_id et template_id
// 3. Les emails seront envoyés directement via EmailJS
