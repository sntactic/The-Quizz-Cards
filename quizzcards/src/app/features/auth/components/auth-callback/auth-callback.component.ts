import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  loading = true;
  error = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer le token depuis les query params
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if (token) {
        const returnUrl : string = sessionStorage.getItem('returnUrl') || 'createcard';
        this.authService.initToken(token, returnUrl);
        //if(this.authService.user)
          //this.authService.sendNotif(this.authService.user.email, this.authService.user.name).subscribe()
      } else {
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Échec de l\'authentification. Aucun token reçu.';

        setTimeout(() => {
          this.router.navigateByUrl('/sign/in');
        }, 1000);
      }
    });
  }
}

