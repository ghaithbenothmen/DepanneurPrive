# 🚀 Guide de déploiement OVH - Dépanneurs Privés

## 📂 Structure finale du site

```
/
├── index.html                          ✅ Page d'accueil
├── services/
│   └── index.html                      ✅ Page services (/services/)
├── zones/
│   └── index.html                      ✅ Page zones (/zones/)
├── mentions-legales/
│   └── index.html                      ✅ Mentions légales
├── politique-confidentialite/
│   └── index.html                      ✅ Politique RGPD
├── gestion-cookies/
│   └── index.html                      ✅ Gestion cookies
├── conditions-generales/
│   └── index.html                      ✅ CGU
├── assets/                             ✅ Images, vidéos
├── css/                                ✅ Styles
├── js/                                 ✅ Scripts
├── .htaccess                           ✅ Config Apache
├── sitemap.xml                         ✅ Plan du site
├── robots.txt                          ✅ SEO
└── 404.html                            ✅ Page d'erreur
```

## 🔧 Étapes de déploiement OVH

### 1. Préparation avant upload

- [X]  Vérifier que tous les liens pointent vers les nouvelles URLs
- [X]  Tester le site en local
- [ ]  Mettre à jour le sitemap.xml avec votre vrai domaine
- [ ]  Configurer le robots.txt avec votre domaine

### 2. Upload sur OVH

- [ ]  Connectez-vous à votre espace client OVH
- [ ]  Accédez au FTP de votre hébergement
- [ ]  Uploadez tous les fichiers à la racine du dossier `www/`
- [ ]  Vérifiez les permissions (755 pour les dossiers, 644 pour les fichiers)

### 3. Configuration post-déploiement

- [ ]  Activez HTTPS via l'interface OVH
- [ ]  Testez les redirections
- [ ]  Vérifiez que le .htaccess fonctionne
- [ ]  Soumettez le sitemap à Google Search Console

## 🎯 URLs finales

- **Accueil** : `https://votre-domaine.com/`
- **Services** : `https://votre-domaine.com/services/`
- **Zones** : `https://votre-domaine.com/zones/`
- **Mentions légales** : `https://votre-domaine.com/mentions-legales/`
- **Politique confidentialité** : `https://votre-domaine.com/politique-confidentialite/`
- **Gestion cookies** : `https://votre-domaine.com/gestion-cookies/`
- **CGU** : `https://votre-domaine.com/conditions-generales/`

## ✅ Avantages de cette structure

1. **SEO optimisé** - URLs propres et sémantiques
2. **Performance** - Compression et cache configurés
3. **Sécurité** - Protection dans .htaccess
4. **Maintenance** - Structure organisée et évolutive
5. **Conformité légale** - RGPD et mentions légales complètes

## 🔒 Fichiers de sécurité inclus

- `.htaccess` avec redirections HTTPS et protection
- Compression Gzip activée
- Cache browser configuré
- Protection contre l'injection SQL
- Masquage des fichiers sensibles

## 📱 Responsive et mobile-first

- Design adaptatif sur tous les appareils
- Bouton d'urgence fixe sur mobile
- Navigation optimisée pour tablettes/mobiles
- Images optimisées et WebP ready

## 🍪 Système de cookies RGPD

- Bandeau automatique conforme RGPD
- Gestion granulaire des préférences
- Sauvegarde locale des choix utilisateur
- Interface de personnalisation complète

## 📊 Prêt pour les analytics

Le système de cookies est configuré pour :

- Google Analytics
- Google Tag Manager
- Facebook Pixel
- Autres outils marketing

Il suffit d'ajouter vos IDs de tracking dans `js/cookies.js`.

---

**Votre site est maintenant prêt pour un déploiement professionnel sur OVH ! 🎉**
