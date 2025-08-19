import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuizzCardComponent } from './../quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../core/services/quizz-cards-services';
import { QuizzCard } from '../../../core/templates/quizz-card';
import { AuthService } from '../../../core/services/auth_service';
import { User } from '../../../core/templates/user';

@Component({
  selector: 'app-create-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuizzCardComponent
],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss'
})

export class CreateCardComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private QuizzCardService: QuizzCardService, private router:Router, private auth : AuthService){};
  // domaine!:string;
  // difficulte!:string;
  // question!:string;
  // reponse!:string;
  // explication!:string;
  // complet!:string;

  // onSubmit(form : NgForm){
  //   console.log(form.value)
  // }

  quizzForm!:FormGroup;
  previewcard$!:Observable<QuizzCard>
  card!:QuizzCard;
  user!: User;

  cardJson = {
    domaine : "",
    categorie : "",
    question : "",
    reponse : "",
    explication : "",
    publication : "privee",
    date : "",
    userID : ""

  };

  getCardJson(card : QuizzCard) : Object{
    this.cardJson.domaine = card.domaine;
    this.cardJson.categorie = card.categorie;
    this.cardJson.question = card.question;
    this.cardJson.reponse = card.reponse;
    this.cardJson.explication = card.explication;
    this.cardJson.publication = card.publication;
    this.cardJson.date = card.date.toISOString();
    this.cardJson.userID = this.auth.user.id;

    return this.cardJson;

  }

  

  isAuth !: boolean;

  ngOnInit(): void {
    this.isAuth = this.auth.isAuth

    this.quizzForm = this.formBuilder.group({
      domaine : [null, Validators.required],
      difficulte:[null, Validators.required],
      question:[null, Validators.required],
      reponse:[null, Validators.required],
      explication:[null]
      },
      {
        // updateOn:"blur"
      }
    )

    this.previewcard$ = this.quizzForm.valueChanges.pipe(
      map(formValues=>
        this.card = new QuizzCard(0 ,formValues.domaine , formValues.difficulte , formValues.question , formValues.reponse, formValues.explication !== null ? formValues.explication:"aucune explication", "privee" ,new Date(),this.auth.user.id)
      )
    )
  }

  onSubmitForm(){
    this.QuizzCardService.postCard(this.getCardJson(this.card)).subscribe(message =>{this.router.navigateByUrl("/mycards")})
  }

  onReponse(){
    this.QuizzCardService.getAnswer(this.quizzForm.value.question).subscribe(res =>{
      console.log(res.answer)
      this.quizzForm.get('reponse')?.setValue(res.answer);
    })
  }
}

