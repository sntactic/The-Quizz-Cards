/**
 * Configuration des endpoints API
 */
export const API_CONFIG = {
  baseUrl: '/api',
  expressUrl: '/answer',
  endpoints: {
    // Authentication
    signup: '/signup',
    login: '/login',
    
    // Quizz Cards
    allCards: '/allcards',
    cards: '/cards',
    cardById: (id: number) => `/cards/${id}`,
    cardsByUser: (userId: string) => `/cards/${userId}`,
    
    // Answer Generation
    answer: '/answer'
  }
} as const;

