/**
 * Utilitaires pour la gestion des tokens JWT
 */
export class TokenUtil {
  /**
   * Vérifie si un token JWT est valide (non expiré)
   */
  static isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return expiration > now;
    } catch {
      return false;
    }
  }

  /**
   * Décode un token JWT
   */
  static decodeToken<T = any>(token: string): T | null {
    try {
      return JSON.parse(atob(token.split('.')[1])) as T;
    } catch {
      return null;
    }
  }
}

