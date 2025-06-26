# Configuration EmailJS - Guide Complet

## 🎯 Étapes sur le site EmailJS

### 1. Créer un compte
- Allez sur **https://www.emailjs.com/**
- Cliquez sur **"Sign Up"**
- Créez votre compte gratuit

### 2. Ajouter un service email
- Dans le dashboard, cliquez sur **"Email Services"**
- Cliquez **"Add New Service"**
- Choisissez **"Gmail"**
- Connectez votre Gmail : **ghaithbenothmen8@gmail.com**
- **IMPORTANT :** Notez le **Service ID** généré (ex: service_xxxxxxx)

### 3. Créer un template d'email
- Allez dans **"Email Templates"**
- Cliquez **"Create New Template"**
- **Subject :** `Nouveau contact - {{subject}}`
- **Content :**
```
Nouveau message depuis le site Dépanneurs Privés :

Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
Objet: {{subject}}

Message:
{{message}}

---
Envoyé depuis le formulaire de contact
```
- **IMPORTANT :** Notez le **Template ID** (ex: template_xxxxxxx)

### 4. Récupérer votre Public Key
- Allez dans **"Account"** → **"General"**
- **IMPORTANT :** Copiez votre **Public Key** (ex: abcdef123456789)

## 🔧 Configuration dans votre code

### Étape 1 : Modifier le fichier config_email.js
Remplacez dans le fichier `config_email.js` :

```javascript
emailjs: {
    service_id: 'service_sr6b87l',     // ✅ Déjà configuré
    template_id: 'template_t3mzsxw',   // ✅ Déjà configuré
    public_key: 'VOTRE_PUBLIC_KEY'     // ← Remplacez par votre Public Key
}
```

### Exemple :
```javascript
emailjs: {
    service_id: 'service_sr6b87l',
    template_id: 'template_t3mzsxw',  
    public_key: 'abcdef123456789'
}
```

## ✅ Test
1. Ouvrez votre site web
2. Cliquez sur "Prendre RDV"
3. Remplissez le formulaire
4. Cliquez "Envoyer"
5. Vous devriez recevoir l'email sur **ghaithbenothmen8@gmail.com**

## 🚨 Erreurs courantes
- **"EmailJS non configuré"** → Vérifiez que vous avez bien remplacé la Public Key
- **"Erreur lors de l'envoi"** → Vérifiez votre connexion internet
- **Email non reçu** → Vérifiez vos spams

## 📊 Limites
- **Gratuit :** 200 emails/mois
- **Payant :** À partir de 15$/mois pour plus d'emails
