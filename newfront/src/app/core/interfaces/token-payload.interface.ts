/**
 * Interface pour le payload du token JWT
 */
export interface TokenPayload {
  userID: string;
  userName: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

