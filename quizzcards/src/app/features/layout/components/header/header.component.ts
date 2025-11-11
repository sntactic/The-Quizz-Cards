import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderService } from '../../../../core/services/header.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  img_menue!: string;
  menu!: boolean;

  constructor(
    private menuService: HeaderService,
    public route: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.img_menue = 'assets/menu.png';
    this.menu = false;
  }

  onClique(): void {
    this.menu = !this.menu;
    this.menuService.setClique(this.menu);
    if (this.menu) {
      this.img_menue = 'assets/croix.png';
    } else {
      this.img_menue = 'assets/menu.png';
    }
  }

  onDisconnect(): void {
    this.auth.onDisonnected();
  }
}

