import { Component } from '@angular/core';
import { TopSideBareService } from '../../../core/services/top-side-bare-service';
import { Router, RouterLink, RouterLinkActive, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  currentRoute!: string;


  constructor(private router:Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  };
}
