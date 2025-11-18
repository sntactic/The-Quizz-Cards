/**
 * Configuration des endpoints API
 */
export const API_CONFIG = {
  baseUrl: '/api',
  endpoints: {
    // Authentication
    signup: '/signup',
    login: '/login',

    //notification
    notif: '/n8n',
    
    // Quizz Cards
    allCards: '/allcards',
    cards: '/cards',
    cardById: (id: number) => `/cards/${id}`,
    cardsByUser: (userId: string) => `/cards/${userId}`,
    
    // Answer Generation
    answer: '/answer'
  }
} as const;

