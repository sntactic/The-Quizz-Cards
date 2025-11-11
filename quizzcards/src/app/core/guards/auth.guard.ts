import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard : CanActivateFn = (route , state) => {
  const authService  = inject(AuthService)
  const router       = inject(Router)

  if (authService.isAuth) {
    return true;
  }
  sessionStorage.setItem('returnUrl', state.url);
  
  return router.createUrlTree(
    [ '/sign/in' ],
    {
      queryParams: { returnUrl: state.url }
    }
  );
};

