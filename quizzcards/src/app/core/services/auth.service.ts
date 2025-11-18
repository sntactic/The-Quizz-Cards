import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../shared/models/user.model';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { API_CONFIG } from '../../config/api.config';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  isAuth = false;
  user?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route : ActivatedRoute
  ) {}

  signUp(user: Object): Observable<string> {
    return this.http.post<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.signup}`,
      user,
      { responseType: 'text' as 'json' }
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`,
      { username: email, password: password },
      { responseType: 'json' }
    );
  }

  sendNotif(email: string, usermane: string): Observable<string> {
    return this.http.post<string>(
      `${API_CONFIG.endpoints.notif}/webhook/539ef4fa-8eab-4cf4-b19d-06566201a8f7`,
      { email: email, usermane: usermane },
      { responseType: 'text' as 'json' }
    );
  }

  getToken(): string {
    return this.token;
  }

  getUser(): User | undefined{
    return this.user;
  }

  onDisonnected(): void {
    this.isAuth = false;
    this.user = undefined;
    localStorage.removeItem(APP_CONSTANTS.storage.tokenKey);
    this.router.navigateByUrl(APP_CONSTANTS.routes.quizzCards);
  }

  initToken(token: string, route: string): void {
    this.token = token;
    localStorage.setItem(APP_CONSTANTS.storage.tokenKey, token);
    const payload = jwtDecode<TokenPayload>(token);
    const newUser = new User(
      payload.userID,
      payload.userName,
      payload.email,
      payload.roles
    );
    this.user = newUser;
    this.isAuth = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || route;
    sessionStorage.removeItem('returnUrl');
    this.router.navigateByUrl(returnUrl);
  }
}

