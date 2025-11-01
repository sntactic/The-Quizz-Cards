import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../../../../core/services/header.service';
import { FilterService } from '../../../../core/services/filter.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  side_bar!: boolean;
  currentRoute!: string;

  constructor(
    private menuServiceClique: HeaderService,
    private filterService: FilterService,
    private router: Router,
    public auth: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.side_bar = false;
    this.menuServiceClique.onclique$.subscribe(value => {
      this.side_bar = value;
    });
  }

  setDifficulte(option: string): void {
    this.filterService.setDifficulte(option);
  }

  setDomaine(option: string): void {
    this.filterService.setDomaine(option);
  }
}

