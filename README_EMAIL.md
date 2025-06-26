# Configuration de l'Envoi d'Emails - Dépanneurs Privés

## 🔧 Configuration Rapide

### 1. Modifier l'adresse email de destination

Ouvrez le fichier `config_email.js` et modifiez cette ligne :

```javascript
destination: 'contact@depanneursprives.fr',
```

Remplacez par votre vraie adresse email :

```javascript
destination: 'votre.email@gmail.com',
```

### 2. Deux méthodes d'envoi disponibles

#### Option A : Avec serveur web (Recommandée)
- Si vous hébergez le site sur un serveur avec PHP
- Les emails sont envoyés automatiquement via `send_email.php`
- Plus professionnel et transparent pour l'utilisateur

#### Option B : Sans serveur (Client email)
- Fonctionne même sans serveur
- Ouvre le client email par défaut de l'utilisateur
- L'utilisateur doit confirmer l'envoi manuellement

## 📧 Adresses Email Compatibles

- Gmail : `votre.nom@gmail.com`
- Outlook : `votre.nom@outlook.com`
- Entreprise : `contact@votre-entreprise.fr`
- Free : `votre.nom@free.fr`
- Orange : `votre.nom@orange.fr`

## 🚀 Test du Formulaire

1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur "RDV EN LIGNE" ou "Contact"
3. Remplissez le formulaire de test
4. Cliquez sur "ENVOYER"
5. Vérifiez votre boîte email !

## 🔍 Informations Techniques

### Données envoyées par email :
- Nom du contact
- Adresse email
- Numéro de téléphone
- Objet de la demande
- Message détaillé
- Date et heure d'envoi
- Adresse IP (pour la sécurité)

### Sécurité :
- Validation des champs côté client et serveur
- Protection contre le spam
- Nettoyage des données avant envoi

## 📞 Support

Si vous avez des questions sur la configuration, contactez votre développeur web.
