import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { API_CONFIG } from '../../../../config/api.config';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  color!: string;
  oauth2Route = `${API_CONFIG.baseUrl}:9000/oauth2/authorization/google`
  
  ifmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmitForm(): void {
    console.log(this.form.value);
    if (this.ifmail(this.form.value.email) === false) {
      this.color = 'red';
      this.message = 'email invalide!';
    } else {
      this.color = 'green';
      this.auth.signUp(this.form.value).subscribe({
        next: (res) => {
          if (res === 'exist') {
            this.color = 'red';
            this.message = 'Cet email est déjà utilisé!';
          } else {
            this.color = 'green';
            this.message = 'Inscription réussie! Connection en cours...';
            setTimeout(() => {
              this.auth.initToken(res, 'createcard');
            }, 1000);
          }
        },
        error: (err) => {
          this.color = 'red';
          this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      });
    }
  }
}

