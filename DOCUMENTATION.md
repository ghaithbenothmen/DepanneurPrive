# Documentation Technique - Dépanneurs Privés

## 📁 Structure du Projet

```
DepanneurPrive/
├── index.html              # Page d'accueil
├── services.html           # Page des services
├── zones.html              # Page des zones d'intervention
├── styles.css              # Styles principaux
├── config_email.js         # Configuration email
├── email_services.js       # Services d'envoi d'email
├── contact_form.js         # Gestion du formulaire de contact
├── js/
│   └── main.js            # Script principal (toutes les fonctionnalités communes)
├── css/
│   └── modal.css          # Styles pour les modals
└── assets/                # Images et ressources
```

## 🚀 Fonctionnalités

### 1. Script Principal (`js/main.js`)
- **Classe DepanneurPriveApp** : Gère toutes les fonctionnalités du site
- **Animations au scroll** : Utilise Intersection Observer pour les animations
- **Gestion des modals** : Ouverture/fermeture des modals de contact
- **Menu mobile** : Navigation responsive
- **Nettoyage mémoire** : Évite les fuites mémoire

### 2. Système d'Email
- **EmailJS** : Service principal d'envoi d'email
- **Fallback mailto** : Solution de secours si EmailJS échoue
- **Validation** : Validation des champs du formulaire
- **Notifications** : Système de notifications visuelles

### 3. Styles Modulaires
- **modal.css** : Styles pour les modals et notifications
- **styles.css** : Styles principaux du site

## 🔧 Configuration

### EmailJS
1. Modifiez `config_email.js` :
```javascript
const EMAIL_CONFIG = {
    destination: 'votre-email@example.com',
    emailjs: {
        service_id: 'votre_service_id',
        template_id: 'votre_template_id',
        public_key: 'votre_public_key'
    }
};
```

### Personnalisation
- **Animations** : Modifiez les délais dans `SITE_CONFIG.animation`
- **Sélecteurs** : Adaptez les sélecteurs CSS dans `SITE_CONFIG.selectors`

## 📱 Responsive Design
- Design adaptatif pour mobile, tablette et desktop
- Menu hamburger pour mobile
- Modals optimisées pour petits écrans

## 🔒 Sécurité
- Validation côté client et serveur
- Échappement des caractères spéciaux
- Protection contre les injections

## 🚀 Déploiement
1. Configurez EmailJS avec vos identifiants
2. Testez le formulaire de contact
3. Vérifiez la responsivité sur différents appareils
4. Optimisez les images dans le dossier `assets/`

## 📈 Performance
- Lazy loading des images recommandé
- Minification des fichiers CSS/JS pour la production
- Optimisation des images WebP recommandée

## 🐛 Débogage
- Ouvrez la console du navigateur pour voir les logs
- Vérifiez que tous les fichiers JS sont chargés
- Testez EmailJS avec votre configuration

## 🔄 Maintenance
- Le script principal gère automatiquement le nettoyage mémoire
- Les observers sont automatiquement déconnectés
- Pas de fuites mémoire avec cette architecture

## 📞 Support
Pour toute question technique, vérifiez :
1. La configuration EmailJS
2. La validité des sélecteurs CSS
3. Les erreurs dans la console du navigateur
