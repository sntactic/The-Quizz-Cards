import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../../../core/services/header-cevice';
import { TopSideBareService } from '../../../core/services/top-side-bare-service';
import { AuthService } from '../../../core/services/auth_service';


@Component({
  selector: 'app-side-bar',
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})


export class SideBarComponent implements OnInit{
  side_bar!:boolean
  currentRoute!:string

  constructor(private menuServiceClique: HeaderService , private topSideBareService: TopSideBareService, private router: Router , public auth : AuthService){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  };

  ngOnInit(): void {
    this.side_bar = false;
    this.menuServiceClique.onclique$.subscribe(value => {this.side_bar = value});
  }

  setDifficulte(option: string){
    this.topSideBareService.setDifficulte(option);
  }

  setDomaine(option: string){
    this.topSideBareService.setDomaine(option);
  }
  
}
