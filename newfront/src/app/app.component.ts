import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './features/layout/components/header/header.component';
import { TopbarComponent } from './features/layout/components/topbar/topbar.component';
import { SidebarComponent } from './features/layout/components/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { TokenUtil } from './core/utils/token.util';
import { APP_CONSTANTS } from './core/constants/app.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    public route: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem(APP_CONSTANTS.storage.tokenKey);
    if (token) {
      if (TokenUtil.isTokenValid(token)) {
        this.auth.initToken(token, APP_CONSTANTS.routes.quizzCards);
      } else {
        localStorage.removeItem(APP_CONSTANTS.storage.tokenKey);
      }
    }
  }
}
