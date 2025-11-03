import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuizzCard } from '../../models/quizz-card.model';
import { QuizzCardService } from '../../../core/services/quizz-card.service';
import { AuthService } from '../../../core/services/auth.service';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';

@Component({
  selector: 'app-quizz-card',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './quizz-card.component.html',
  styleUrl: './quizz-card.component.scss'
})
export class QuizzCardComponent implements OnInit {
  @Input() quizzCard!: QuizzCard;
  isAdmin = false;
  isDeleted = false;
  readonly MAX_QUESTION_LENGTH = 80;
  truncatedQuestion: string = '';
  isQuestionLong: boolean = false;

  constructor(
    public route: Router,
    private quizzcardservice: QuizzCardService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  fliped = false;
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

  getCardJson(card: QuizzCard): Object {
    this.cardJson.domaine = card.domaine;
    this.cardJson.categorie = card.categorie;
    this.cardJson.question = card.question;
    this.cardJson.reponse = card.reponse;
    this.cardJson.explication = card.explication;
    this.cardJson.publication = card.publication;
    this.cardJson.date = card.date.toISOString();
    this.cardJson.userID = card.userID;

    return this.cardJson;
  }

  onfliped(): void {
    this.fliped = !this.fliped;
  }

  ngOnInit(): void {
    if (this.authService.getUser()?.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
    
    // Vérifier si la question dépasse 90 caractères
    if (this.quizzCard.question.length > this.MAX_QUESTION_LENGTH) {
      this.isQuestionLong = true;
      // Tronquer la question à 90 caractères
      this.truncatedQuestion = this.quizzCard.question.substring(0, this.MAX_QUESTION_LENGTH);
    } else {
      this.truncatedQuestion = this.quizzCard.question;
    }
  }

  openQuestionDialog(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: { question: this.quizzCard.question },
      panelClass: 'question-dialog-container',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fermé', result);
    });
  }

  onPublier(): void {
    if (this.quizzCard.publication === 'privee') {
      this.quizzCard.publication = 'publique';
    } else {
      this.quizzCard.publication = 'privee';
    }

    this.quizzcardservice.putCard(this.getCardJson(this.quizzCard) , this.quizzCard.id.toString()).subscribe();
  }

  onEdit(): void {
    this.router.navigateByUrl('/editcard');
    this.quizzcardservice.getCardToEdit(this.quizzCard);
  }

  onDelete(): void {
    this.quizzcardservice.deleteCard(this.quizzCard.id).subscribe(message => {
      this.quizzcardservice.doGetMyCardsRequest()
      this.fliped = false
    });
  }
}

