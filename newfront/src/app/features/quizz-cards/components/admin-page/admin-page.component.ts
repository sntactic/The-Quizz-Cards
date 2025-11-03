import { Component, OnInit } from '@angular/core';
import { QuizzcardListComponent } from '../quizzcard-list/quizzcard-list.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    QuizzcardListComponent,
    CommonModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.getUser() && this.authService.getUser()?.roles?.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
    if (!this.authService.getUser() || !this.authService.getUser()?.roles?.includes('ROLE_ADMIN')) {
      this.router.navigateByUrl('/quizzcards');
    }
  }
}

