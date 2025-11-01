/**
 * Configuration des endpoints API
 */
export const API_CONFIG = {
  baseUrl: 'http://localhost:9000',
  expressUrl: 'http://localhost:3000',
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

