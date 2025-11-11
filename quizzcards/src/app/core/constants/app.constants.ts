/**
 * Constantes de l'application
 */
export const APP_CONSTANTS = {
  storage: {
    tokenKey: 'token'
  },
  routes: {
    quizzCards: '/quizzcards',
    myCards: '/mycards',
    createCard: '/createcard',
    editCard: '/editcard',
    signIn: '/sign/in',
    signUp: '/sign/up',
    adminPage: '/adminpage'
  },
  categories: {
    facile: 'facile',
    moyenne: 'moyenne',
    difficile: 'difficile',
    expert: 'expert',
    genie: 'génie'
  },
  domains: {
    scienceTech: 'science et technologie',
    geographie: 'geographie',
    medecine: 'medecine',
    botanique: 'botanique',
    histoire: 'histoire',
    animale: 'animale'
  },
  publication: {
    publique: 'publique',
    privee: 'privee'
  },
  roles: {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER'
  }
} as const;

