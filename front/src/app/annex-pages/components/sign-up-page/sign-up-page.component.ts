import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth_service';

@Component({
  selector: 'app-sign-up-page',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent implements OnInit{

form!:FormGroup;
message!:string;
color!:string;
ifmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


constructor(private formBuilder: FormBuilder , private auth : AuthService){};

ngOnInit(): void {

  this.form = this.formBuilder.group({
      name : [null, Validators.required],
      email:[null, Validators.required],
      password:[null, Validators.required]
    }
    )
}

onSubmitForm(){
  console.log(this.form.value)
  if (this.ifmail(this.form.value.email) === false){
    this.color = "red"
    this.message = "email invalide!"
  }else{
    this.color = "green"
    this.auth.signUp(this.form.value).subscribe(res => {
      console.log(res);
      this.message = "s'incription reussie!"
    })
  }
}

}
