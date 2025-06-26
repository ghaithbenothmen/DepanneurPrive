# 📧 Configuration de l'envoi d'emails pour le site Dépanneurs Privés

## 🎯 Solutions disponibles

Votre site propose 4 solutions d'envoi d'emails, testées dans cet ordre :

1. **EmailJS** (Recommandé) - Service gratuit professionnel
2. **Formspree** - Alternative simple
3. **Serveur PHP** - Solution serveur 
4. **Mailto** - Solution de base (actuellement active)

## ⚡ Configuration rapide avec EmailJS (RECOMMANDÉ)

### Étape 1 : Créer un compte EmailJS
1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit (200 emails/mois)
3. Confirmez votre email

### Étape 2 : Configurer le service email
1. Dans le dashboard EmailJS, cliquez sur **"Add New Service"**
2. Choisissez votre fournisseur email (Gmail, Outlook, Yahoo, etc.)
3. Suivez les instructions pour connecter votre email
4. Notez le **Service ID** généré

### Étape 3 : Créer un template d'email
1. Cliquez sur **"Create New Template"**
2. Configurez le template avec ces variables :
   ```
   From: {{from_name}} <{{from_email}}>
   To: ghaithbenothmen8@gmail.com
   Subject: Nouveau contact - {{subject}}
   
   Message:
   Nom: {{from_name}}
   Email: {{from_email}}
   Téléphone: {{phone}}
   Objet: {{subject}}
   
   {{message}}
   ```
3. Testez le template
4. Notez le **Template ID**

### Étape 4 : Récupérer votre User ID
1. Allez dans **"Account" > "General"**
2. Copiez votre **User ID**

### Étape 5 : Configurer le site
1. Ouvrez le fichier `config_email.js`
2. Remplacez les valeurs dans `EMAIL_CONFIG.emailjs` :
   ```javascript
   emailjs: {
       service_id: 'VOTRE_SERVICE_ID',     // Service ID d'EmailJS
       template_id: 'VOTRE_TEMPLATE_ID',   // Template ID d'EmailJS
       user_id: 'VOTRE_USER_ID'            // User ID d'EmailJS
   }
   ```

### ✅ C'est tout !
Votre formulaire enverra maintenant les emails directement sans ouvrir le client email !

---

## 🔄 Alternative : Formspree

Si vous préférez Formspree :

1. Allez sur https://formspree.io/
2. Créez un compte gratuit (50 emails/mois)
3. Créez un nouveau formulaire
4. Copiez l'ID du formulaire
5. Dans `config_email.js`, remplacez :
   ```javascript
   formspree_id: 'VOTRE_FORMSPREE_ID'
   ```

---

## 🛠️ Solution actuelle (Mailto)

Actuellement, votre site utilise la solution "mailto" qui :
- ✅ Fonctionne immédiatement sans configuration
- ⚠️ Ouvre le client email de l'utilisateur
- ⚠️ Dépend du client email installé
- ⚠️ L'utilisateur doit manuellement envoyer l'email

**Pour une expérience professionnelle, configurez EmailJS (5 minutes) !**

---

## 📞 Support

Si vous avez des questions sur la configuration :
- 📧 Email : support@exemple.com
- 💬 WhatsApp : +33123456789

---

## 🔍 Test du formulaire

Après configuration :
1. Ouvrez votre site
2. Cliquez sur "Prendre RDV" ou "Nous contacter"
3. Remplissez le formulaire
4. Vous devriez voir "Message envoyé avec succès !" au lieu de l'ouverture du client email
