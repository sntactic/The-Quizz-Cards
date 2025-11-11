import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/components/landing-page/landing-page.component')
      .then(m => m.LandingPageComponent)
  },
  {
    path: 'quizzcards',
    loadComponent: () => import('./features/quizz-cards/components/quizzcard-list/quizzcard-list.component')
      .then(m => m.QuizzcardListComponent)
  },
  {
    path: 'quizzcards/:id',
    loadComponent: () => import('./features/quizz-cards/components/sigle-quizz-card/sigle-quizz-card.component')
      .then(m => m.SigleQuizzCardComponent)
  },
  {
    path: 'mycards',
    loadComponent: () => import('./features/quizz-cards/components/my-cards/my-cards.component')
      .then(m => m.MyCardsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'createcard',
    loadComponent: () => import('./features/quizz-cards/components/create-card/create-card.component')
      .then(m => m.CreateCardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'editcard',
    loadComponent: () => import('./features/quizz-cards/components/edit-card/edit-card.component')
      .then(m => m.EditCardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign/in',
    loadComponent: () => import('./features/auth/components/sign-in/sign-in.component')
      .then(m => m.SignInComponent)
  },
  {
    path: 'sign/up',
    loadComponent: () => import('./features/auth/components/sign-up/sign-up.component')
      .then(m => m.SignUpComponent)
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./features/auth/components/auth-callback/auth-callback.component')
      .then(m => m.AuthCallbackComponent)
  },
  {
    path: 'adminpage',
    loadComponent: () => import('./features/quizz-cards/components/admin-page/admin-page.component')
      .then(m => m.AdminPageComponent),
    canActivate: [AdminGuard]
  }
];
