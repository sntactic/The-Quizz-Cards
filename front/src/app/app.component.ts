import { routes } from './app.routes';
import {currentRouteService } from './core/services/current-route-service';
import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from './core/component/header/header.component'
import { TopBarComponent } from './bar/components/top-bar/top-bar.component';
import { SideBarComponent } from './bar/components/side-bar/side-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, filter, interval, map, tap, of, delay, mergeMap, take, concatMap, exhaustMap, switchMap } from 'rxjs';
import { AuthService } from './core/services/auth_service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    TopBarComponent,
    SideBarComponent,
    RouterOutlet,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit
{
  constructor(public route: Router, private auth : AuthService){}
  
  isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp;
      const now = Math.floor(Date.now() / 1000);

      return expiration > now;
    } catch {
      return false;
    }
  }

  ngOnInit(){
    const token  = localStorage.getItem("token");
    if (token) {
      if (this.isTokenValid(token)){
        this.auth.initToken(token);
      }else{
        localStorage.removeItem("token");
      }
    }
  }

}
