/**
 * Gestion du formulaire de contact - Dépanneurs Privés
 * Gestion du formulaire de contact avec EmailJS et fallback mailto
 */

// Gestion du formulaire de contact avec EmailJS uniquement
function initContactForm() {
    const modalForm = document.querySelector('.modal-form');
    const modalBg = document.getElementById('modalRdvBg');
    
    if (!modalForm) return;
    
    modalForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validation du formulaire
        if (!validateForm(modalForm)) {
            showMessage(EMAIL_CONFIG.messages.validation_error, 'error');
            return;
        }
        
        // Récupération des données
        const formData = new FormData(modalForm);
        
        // Animation du bouton d'envoi
        const submitBtn = modalForm.querySelector('.modal-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = EMAIL_CONFIG.messages.sending;
        submitBtn.disabled = true;
        
        try {
            // Essayer EmailJS d'abord
            if (isEmailJSConfigured()) {
                const result = await sendEmailWithEmailJS(formData);
                showSuccessAndClose(result.message, modalForm, modalBg);
            } else {
                // Fallback vers mailto si EmailJS n'est pas configuré
                const result = await createMailtoFallback(formData);
                showSuccessAndClose(result.message, modalForm, modalBg);
            }
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            
            // Fallback vers mailto en cas d'erreur
            try {
                const result = await createMailtoFallback(formData);
                showSuccessAndClose(result.message, modalForm, modalBg);
            } catch (fallbackError) {
                console.error('Erreur fallback:', fallbackError);
                showMessage(EMAIL_CONFIG.messages.error, 'error');
            }
        } finally {
            // Réactiver le bouton
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Fonction de validation du formulaire
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            field.style.borderColor = '#ff4444';
            setTimeout(() => {
                field.style.borderColor = '';
            }, 3000);
            return false;
        }
    }
    
    // Validation email
    const emailField = form.querySelector('[type="email"]');
    if (emailField && !isValidEmail(emailField.value)) {
        emailField.focus();
        emailField.style.borderColor = '#ff4444';
        return false;
    }
    
    return true;
}

// Validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Vérification de la configuration EmailJS
function isEmailJSConfigured() {
    return typeof emailjs !== 'undefined' && 
           EMAIL_CONFIG.emailjs.service_id !== 'VOTRE_SERVICE_ID' &&
           EMAIL_CONFIG.emailjs.template_id !== 'VOTRE_TEMPLATE_ID' &&
           EMAIL_CONFIG.emailjs.public_key !== 'VOTRE_PUBLIC_KEY';
}

// Affichage des messages
function showMessage(message, type = 'info') {
    // Création d'une notification temporaire
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
        ${type === 'error' ? 'background: #ff4444;' : 'background: #44aa44;'}
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Suppression automatique après 5 secondes
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Succès et fermeture du modal
function showSuccessAndClose(message, form, modal) {
    showMessage(message, 'success');
    modal.classList.remove('active');
    form.reset();
}

// CSS pour les animations
const notificationCSS = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Injection du CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Initialisation quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}
