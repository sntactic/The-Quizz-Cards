import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuizzCardComponent } from '../../../../shared/components/quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../../core/services/quizz-card.service';
import { QuizzCard } from '../../../../shared/models/quizz-card.model';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuizzCardComponent
  ],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss'
})
export class CreateCardComponent implements OnInit {
  quizzForm!: FormGroup;
  card: QuizzCard = new QuizzCard(0,'','','','','','',new Date(),'');
  user!: User;

  cardJson = {
    domaine: '',
    categorie: '',
    question: '',
    reponse: '',
    explication: '',
    publication: 'privee',
    date: '',
    userID: ''
  };

  isAuth!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private QuizzCardService: QuizzCardService,
    private router: Router,
    private auth: AuthService
  ) {}

  getCardJson(card: QuizzCard): Object {
    if (!this.auth.user) {
      throw new Error("Utilisateur non authentifié !");
    }
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

  ngOnInit(): void {
    this.isAuth = this.auth.isAuth;

    this.quizzForm = this.formBuilder.group({
      domaine: [null, Validators.required],
      difficulte: [null, Validators.required],
      question: [null, Validators.required],
      reponse: [null, Validators.required],
      explication: [null]
    });

    this.quizzForm.valueChanges.pipe(
      map(formValues =>{
        if (!this.auth.user) {
          throw new Error("Utilisateur non authentifié !");
        }
        this.card = new QuizzCard(
          0,
          formValues.domaine,
          formValues.difficulte,
          formValues.question,
          formValues.reponse,
          formValues.explication !== null ? formValues.explication : 'aucune explication',
          'privee',
          new Date(),
          this.auth.user.id
        )}
      )
    ).subscribe();
  }

  onSubmitForm(): void {
    this.QuizzCardService.postCard(this.getCardJson(this.card)).subscribe(message => {
      this.router.navigateByUrl('/mycards');
    });
  }

  onReponse(): void {
    this.QuizzCardService.getAnswer(this.quizzForm.value.question).subscribe(res => {
      console.log(res);
      this.quizzForm.get('reponse')?.setValue(res);
    });
  }
}

