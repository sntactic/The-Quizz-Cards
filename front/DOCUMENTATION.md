# Documentation du Projet QuizzCards - Frontend

## Vue d'ensemble

QuizzCards est une application web Angular permettant la création, la gestion et l'utilisation de cartes de quiz éducatives. L'application offre une interface utilisateur intuitive pour naviguer parmi différentes cartes de quiz, les créer, les modifier et les administrer.

## Technologies utilisées

- **Framework**: Angular 19.2.0
- **Langage**: TypeScript 5.7.2
- **Styling**: SCSS
- **Bibliothèques principales**:
  - Angular Material 19.2.19
  - Angular CDK 19.2.19
  - RxJS 7.8.0
  - jwt-decode 4.0.0

## Structure du projet

```
front/
├── src/
│   ├── app/
│   │   ├── annex-pages/          # Pages annexes (landing, sign in/up)
│   │   ├── auth/                  # Gestion de l'authentification
│   │   ├── bar/                   # Barres de navigation (top-bar, side-bar)
│   │   ├── core/                  # Services et composants centraux
│   │   │   ├── component/         # Composants réutilisables
│   │   │   ├── intercepteur/      # Intercepteurs HTTP
│   │   │   ├── services/          # Services métier
│   │   │   └── templates/         # Modèles de données
│   │   ├── quizz-cards/           # Module principal des cartes de quiz
│   │   │   ├── components/        # Composants des cartes
│   │   │   └── resolver/         # Resolvers pour le routage
│   │   ├── app.component.*        # Composant racine
│   │   ├── app.routes.ts          # Configuration des routes
│   │   └── app.config.ts          # Configuration de l'application
│   ├── assets/                    # Ressources statiques (images)
│   ├── index.html                 # Point d'entrée HTML
│   ├── main.ts                    # Point d'entrée TypeScript
│   └── styles.scss                # Styles globaux
├── public/                        # Fichiers publics
├── angular.json                   # Configuration Angular CLI
├── package.json                   # Dépendances du projet
└── tsconfig.json                  # Configuration TypeScript
```

## Architecture de l'application

### Modules et fonctionnalités

#### 1. Module d'authentification (`auth/`)
- **AuthCallbackComponent**: Gère le callback après authentification
- Gestion des tokens JWT
- Validation et décodage des tokens
- Persistance de l'authentification via localStorage

#### 2. Pages annexes (`annex-pages/`)
- **LandingPageComponent**: Page d'accueil
- **SignInPageComponent**: Page de connexion (`/sign/in`)
- **SignUpPageComponent**: Page d'inscription (`/sign/up`)

#### 3. Barres de navigation (`bar/`)
- **TopBarComponent**: Barre de navigation supérieure
- **SideBarComponent**: Barre latérale de navigation

#### 4. Module Core (`core/`)

##### Services principaux:

**AuthService** (`core/services/auth_service.ts`)
- Gestion de l'authentification utilisateur
- Méthodes:
  - `signUp(user: Object)`: Inscription d'un nouvel utilisateur
  - `signIn(email: string, password: string)`: Connexion
  - `initToken(token: string, route: string)`: Initialisation du token JWT
  - `onDisonnected()`: Déconnexion
  - `getToken()`: Récupération du token actuel
  - `getUser()`: Récupération des informations utilisateur

**QuizzCardService** (`core/services/quizz-cards-services.ts`)
- Gestion des opérations CRUD sur les cartes de quiz
- Méthodes:
  - `getQuizzCardsApi()`: Récupération de toutes les cartes
  - `getMyQuizzCardsApi()`: Récupération des cartes de l'utilisateur connecté
  - `postCard(card: Object)`: Création d'une nouvelle carte
  - `putCard(card: object)`: Modification d'une carte
  - `deleteCard(id: number)`: Suppression d'une carte
  - `getAnswer(question: string)`: Génération de réponses via API
  - `getCardToEdit(card: QuizzCard)`: Partage d'une carte à éditer entre composants

**Autres services**:
- `current-route-service.ts`: Gestion de la route courante
- `header-cevice.ts`: Service pour le header
- `top-side-bare-service.ts`: Service pour les barres de navigation

##### Intercepteurs:

**AuthIntercepteur** (`core/intercepteur/auth_intercepteur.ts`)
- Ajoute automatiquement le token JWT dans l'en-tête `Authorization` de toutes les requêtes HTTP
- Format: `Bearer <token>`

##### Templates:

**QuizzCard** (`core/templates/quizz-card.ts`)
Modèle de données représentant une carte de quiz:
- Propriétés:
  - `id`: Identifiant unique
  - `domaine`: Domaine de connaissance (science, géographie, médecine, etc.)
  - `categorie`: Niveau de difficulté (facile, moyenne, difficile, expert, génie)
  - `question`: Texte de la question
  - `reponse`: Texte de la réponse
  - `explication`: Explication optionnelle
  - `publication`: Statut de publication
  - `date`: Date de création
  - `userID`: Identifiant du créateur
  - `couleur`: Couleur associée au niveau (générée automatiquement)
  - `imageUrl`: Image associée au domaine (générée automatiquement)
- Méthodes:
  - `setCouleur(difficile: string)`: Définit la couleur selon la difficulté
  - `setImage(domaine: string)`: Définit l'image selon le domaine
  - `setExplication(explication: string)`: Gère les explications vides
  - `onVoirReponse()`: Affiche/masque la réponse

**User** (`core/templates/user.ts`)
Modèle représentant un utilisateur:
- Propriétés:
  - `id`: Identifiant unique
  - `name`: Nom d'utilisateur
  - `email`: Email
  - `roles`: Tableau des rôles (ex: ADMIN, USER)

#### 5. Module QuizzCards (`quizz-cards/`)

##### Composants:

**QuizzcardListComponent** (`/quizzcards`)
- Affichage de la liste de toutes les cartes de quiz
- Navigation vers les détails d'une carte

**SigleQuizzCardComponent** (`/quizzcards/:id`)
- Affichage détaillé d'une carte de quiz
- Affichage/masquage de la réponse
- Affichage de l'explication

**MyCardsComponent** (`/mycards`)
- Affichage des cartes créées par l'utilisateur connecté
- Actions de modification et suppression

**CreateCardComponent** (`/createcard`)
- Formulaire de création d'une nouvelle carte de quiz
- Sélection du domaine et de la catégorie

**EditCardComponent** (`/editcard`)
- Formulaire d'édition d'une carte existante
- Récupération de la carte via `QuizzCardService.cardToEdit$`

**AdminPageComponent** (`/adminpage`)
- Page d'administration (réservée aux administrateurs)

##### Resolver:

**MyCardsResolver** (`resolver/myCards.resolver.ts`)
- Résolveur pour précharger les cartes de l'utilisateur avant l'affichage

## Routes de l'application

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | LandingPageComponent | Page d'accueil |
| `/quizzcards` | QuizzcardListComponent | Liste de toutes les cartes |
| `/quizzcards/:id` | SigleQuizzCardComponent | Détails d'une carte |
| `/mycards` | MyCardsComponent | Mes cartes (utilisateur connecté) |
| `/createcard` | CreateCardComponent | Créer une nouvelle carte |
| `/editcard` | EditCardComponent | Éditer une carte |
| `/sign/in` | SignInPageComponent | Connexion |
| `/sign/up` | SignUpPageComponent | Inscription |
| `/auth/callback` | AuthCallbackComponent | Callback d'authentification |
| `/adminpage` | AdminPageComponent | Page d'administration |

## Configuration

### Application Config (`app.config.ts`)
- Configuration du routage avec lazy loading
- Configuration HTTP avec intercepteurs
- Locale française (fr-FR)
- Zone.js avec coalescence des événements

### Point d'entrée (`main.ts`)
- Bootstrap de l'application Angular
- Enregistrement de la locale française

### Composant racine (`app.component.ts`)
- Initialisation de l'authentification au démarrage
- Vérification de la validité du token stocké
- Restauration de la session utilisateur si token valide

## Communication avec le backend

### Endpoints API

**Backend Spring Boot** (port 9000):
- `GET /allcards`: Récupération de toutes les cartes
- `GET /cards/{userID}`: Récupération des cartes d'un utilisateur
- `POST /cards`: Création d'une carte
- `PUT /cards`: Modification d'une carte
- `DELETE /cards/{id}`: Suppression d'une carte
- `POST /signup`: Inscription
- `POST /login`: Connexion

**Backend Express** (port 3000):
- `POST /answer`: Génération de réponses via API externe

## Fonctionnalités principales

### Authentification
- Inscription et connexion utilisateurs
- Gestion des tokens JWT
- Persistance de session via localStorage
- Déconnexion
- Protection des routes via intercepteur

### Gestion des cartes de quiz
- Affichage de toutes les cartes
- Affichage des cartes personnelles
- Création de nouvelles cartes
- Modification de cartes existantes
- Suppression de cartes
- Affichage détaillé avec réponse et explication

### Interface utilisateur
- Navigation avec sidebar et top bar
- Design responsive
- Images associées aux domaines
- Couleurs associées aux niveaux de difficulté
- Masquage/affichage des réponses

## Domaines et catégories

### Domaines supportés
- Science et technologie
- Géographie
- Médecine
- Botanique
- Histoire
- Animale

### Catégories de difficulté
- **Facile**: Couleur verte
- **Moyenne**: Couleur jaune
- **Difficile**: Couleur bleue
- **Expert**: Couleur rouge
- **Génie**: Couleur violette

## Développement

### Commandes disponibles

```bash
# Démarrer le serveur de développement
npm start
# ou
ng serve

# Compiler pour la production
npm run build
# ou
ng build

# Compiler en mode watch
npm run watch

# Exécuter les tests
npm test
# ou
ng test
```

### Dépendances principales

Voir `package.json` pour la liste complète des dépendances.

### Configuration TypeScript

- `tsconfig.json`: Configuration TypeScript principale
- `tsconfig.app.json`: Configuration pour l'application
- `tsconfig.spec.json`: Configuration pour les tests

## Sécurité

- Utilisation de tokens JWT pour l'authentification
- Intercepteur HTTP pour ajouter automatiquement les tokens
- Validation des tokens avant leur utilisation
- Stockage sécurisé des tokens dans localStorage
- Gestion des rôles utilisateurs

## Améliorations futures possibles

- Implémentation de guards de route pour protéger les pages
- Ajout de tests unitaires et d'intégration
- Amélioration de la gestion des erreurs
- Implémentation d'un système de favoris
- Ajout de statistiques de progression
- Recherche et filtrage avancés des cartes
- Support de plusieurs langues (i18n)
- Mode hors ligne (PWA)

## Notes importantes

- L'application nécessite que les backends (Spring Boot et Express) soient démarrés
- Les URLs des API sont codées en dur (à externaliser dans un fichier de configuration)
- Le résolver `MyCardsResolver` est commenté dans les routes (non utilisé actuellement)
- Certains services peuvent nécessiter une refactorisation pour une meilleure séparation des responsabilités

