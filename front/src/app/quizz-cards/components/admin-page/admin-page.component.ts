import { Component } from '@angular/core';
import { QuizzcardListComponent } from "../quizzcard-list/quizzcard-list.component";
import { AuthService } from '../../../core/services/auth_service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  imports: [
    QuizzcardListComponent,
    CommonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  constructor(private authService: AuthService , private router : Router) {}
  isAdmin: boolean = false;

  ngOnInit(){
    if(!this.authService.getUser() || !this.authService.getUser().roles?.includes('ROLE_ADMIN')){
      this.router.navigateByUrl('/quizzcards');
    }
    if(this.authService.getUser() && this.authService.getUser().roles?.includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }
  }
}
