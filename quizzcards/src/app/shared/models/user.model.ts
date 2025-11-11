/**
 * Modèle utilisateur
 */
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public roles: string[]
  ) {}

  getInfo(): void {
    console.log(this.id, this.name, this.email);
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }
}

