import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { API_CONFIG } from '../../../../config/api.config';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  color!: string;
  message!: string;
  oauth2Route = `${API_CONFIG.baseUrl}/oauth2/authorization/google`

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmitForm(): void {
    this.auth.signIn(this.form.value.email, this.form.value.password).subscribe({
      next:(res) =>{
        this.auth.user
        this.color = 'green';
        this.message = 'connection reusie';
        setTimeout(() => {
          this.auth.initToken(res.token, 'createcard');
        }, 1000);
      },
      error :()=>{
        this.color = 'red';
        this.message = 'connection echouée! veillez reessayer.';
      }
    })
  }
}

