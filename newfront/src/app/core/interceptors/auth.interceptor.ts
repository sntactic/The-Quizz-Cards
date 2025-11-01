import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (token) {
      const headers = new HttpHeaders().append(
        'Authorization',
        `Bearer ${token}`
      );
      const modifyRequest = req.clone({ headers });
      return next.handle(modifyRequest);
    } else {
      return next.handle(req);
    }
  }
}

