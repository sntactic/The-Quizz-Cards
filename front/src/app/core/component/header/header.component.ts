import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { HeaderService } from '../../services/header-cevice';
import { RouterLink,RouterLinkActive ,Router} from '@angular/router';
import { AuthService } from '../../services/auth_service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private menuService: HeaderService , public route : Router , public auth : AuthService){};

  img_menue !: string;
  menu!:boolean;

  ngOnInit(): void {
    this.img_menue = 'assets/menu.png';
    this.menu = false;
  }

  onClique(){
    this.menu = !this.menu;
    this.menuService.setClique(this.menu);
    if(this.menu){
      this.img_menue = 'assets/croix.png';
    }else{
      this.img_menue = 'assets/menu.png';
    }
  }

  onDisconnect(){
    this.auth.onDisonnected();
  }
}
