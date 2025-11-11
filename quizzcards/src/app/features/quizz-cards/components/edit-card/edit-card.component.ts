import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuizzCardService } from '../../../../core/services/quizz-card.service';
import { QuizzCard } from '../../../../shared/models/quizz-card.model';
import { QuizzCardComponent } from '../../../../shared/components/quizz-card/quizz-card.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-edit-card',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuizzCardComponent
  ],
  templateUrl: './edit-card.component.html',
  styleUrl: './edit-card.component.scss'
})
export class EditCardComponent implements OnInit {
  quizzForm!: FormGroup;
  card!: QuizzCard;
  card$!: Observable<QuizzCard>;

  cardJson = {
    domaine: '',
    categorie: '',
    question: '',
    reponse: '',
    explication: '',
    publication: '',
    date: '',
    userID: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private QuizzCardService: QuizzCardService,
    private router: Router,
    private auth: AuthService
  ) {}

  getCardJson(card: QuizzCard): Object {
    this.cardJson.domaine = card.domaine;
    this.cardJson.categorie = card.categorie;
    this.cardJson.question = card.question;
    this.cardJson.reponse = card.reponse;
    this.cardJson.explication = card.explication;
    this.cardJson.publication = card.publication;
    this.cardJson.date = new Date(card.date).toISOString();
    this.cardJson.userID = card.userID;

    return this.cardJson;
  }

  ngOnInit(): void {
    this.card$ = this.QuizzCardService.cardToEdit$;

    this.card$.subscribe(card => this.card = card);
    this.quizzForm = this.formBuilder.group({
      domaine: [this.card.domaine, Validators.required],
      difficulte: [this.card.categorie, Validators.required],
      question: [this.card.question, Validators.required],
      reponse: [this.card.reponse, Validators.required],
      explication: [this.card.explication]
    });

    this.quizzForm.valueChanges.pipe(
      map(formValues =>
        this.card = new QuizzCard(
          this.card.id,
          formValues.domaine,
          formValues.difficulte,
          formValues.question,
          formValues.reponse,
          formValues.explication,
          this.card.publication,
          this.card.date,
          this.card.userID
        )
      )
    ).subscribe();
  }

  onSubmitForm(): void {
    this.QuizzCardService.putCard(this.getCardJson(this.card) , this.card.id.toString()).subscribe(message => {
      this.router.navigateByUrl('/mycards');
    });
  }
}

