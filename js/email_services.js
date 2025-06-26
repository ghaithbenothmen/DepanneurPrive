/**
 * Service d'envoi d'email - Dépanneurs Privés
 * Service d'envoi d'email avec EmailJS uniquement
 */

// Service d'envoi d'email avec EmailJS uniquement
function sendEmailWithEmailJS(formData) {
    return new Promise((resolve, reject) => {
        // Vérification si EmailJS est disponible
        if (typeof emailjs === 'undefined') {
            reject(new Error('EmailJS non disponible'));
            return;
        }
        
        // Préparation des données pour EmailJS
        const templateParams = {
            to_email: EMAIL_CONFIG.destination,
            from_name: formData.get('nom'),
            from_email: formData.get('email'),
            phone: formData.get('tel'),
            subject: formData.get('objet'),
            message: formData.get('message'),
            reply_to: formData.get('email')
        };
        
        // Envoi via EmailJS
        emailjs.send(
            EMAIL_CONFIG.emailjs.service_id,
            EMAIL_CONFIG.emailjs.template_id,
            templateParams,
            EMAIL_CONFIG.emailjs.public_key
        )
        .then((response) => {
            console.log('Email envoyé avec succès:', response);
            resolve({success: true, message: EMAIL_CONFIG.messages.success});
        })
        .catch((error) => {
            console.error('Erreur EmailJS:', error);
            reject(error);
        });
    });
}

// Vérification de la configuration EmailJS
function isEmailJSConfigured() {
    return typeof emailjs !== 'undefined' && 
           EMAIL_CONFIG.emailjs.service_id !== 'service_sr6b87l' &&
           EMAIL_CONFIG.emailjs.template_id !== 'template_t3mzsxw' &&
           EMAIL_CONFIG.emailjs.public_key !== '9BO4jX843DpIDmKhz';
}

// Solution de fallback avec mailto
function createMailtoFallback(formData) {
    const nom = formData.get('nom');
    const email = formData.get('email');
    const tel = formData.get('tel');
    const objet = formData.get('objet');
    const message = formData.get('message');
    
    const sujet = `Nouveau contact - ${objet}`;
    const corpsEmail = `Nouveau message depuis le site web Dépanneurs Privés :

Nom: ${nom}
Email: ${email}
Téléphone: ${tel}
Objet: ${objet}

Message:
${message}

---
Message envoyé depuis le formulaire de contact du site web.`;
    
    const mailtoLink = `mailto:${EMAIL_CONFIG.destination}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corpsEmail)}`;
    window.location.href = mailtoLink;
    
    return Promise.resolve({
        success: true, 
        message: EMAIL_CONFIG.messages.mailto_fallback
    });
}
