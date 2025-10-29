import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth_service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-sign-in-page',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})

export class SignInPageComponent implements OnInit{

  form!:FormGroup;
  color!:string;
  message!:string;

  constructor(private formBuilder: FormBuilder , private auth : AuthService, private router : Router){};

  ngOnInit(): void {

    this.form = this.formBuilder.group({
        email:[null, Validators.required],
        password:[null, Validators.required]
        }
      )
  }
  

  onSubmitForm(){
    this.auth.signIn(this.form.value.email , this.form.value.password) .subscribe(token => {
      console.log(token);
      this.auth.initToken(token);
      if(this.auth.user){
        this.color = 'green'
        this.message = 'connection reusie'
        this.router.navigateByUrl('/createcard')
      }else{
        this.color = 'red'
        this.message = 'la connection a echouee'
      }
    })
  }

}
