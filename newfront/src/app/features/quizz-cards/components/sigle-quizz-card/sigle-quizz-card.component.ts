import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzCardComponent } from '../../../../shared/components/quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../../core/services/quizz-card.service';
import { QuizzCard } from '../../../../shared/models/quizz-card.model';

@Component({
  selector: 'app-sigle-quizz-card',
  standalone: true,
  imports: [
    QuizzCardComponent,
    CommonModule
  ],
  templateUrl: './sigle-quizz-card.component.html',
  styleUrl: './sigle-quizz-card.component.scss'
})
export class SigleQuizzCardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizzcardservice: QuizzCardService
  ) {}
  
  quizzCard!: QuizzCard;
  quizzCards!: QuizzCard[];
  trouve = '';
  QuizzCardid!: number;

  ngOnInit(): void {
    this.QuizzCardid = this.route.snapshot.params['id'] * 1;

    this.quizzcardservice.getQuizzCardsApi().subscribe(cards => {
      this.quizzCards = cards.map(card =>
        new QuizzCard(
          card.id,
          card.domaine,
          card.categorie,
          card.question,
          card.reponse,
          card.explication,
          card.publication,
          card.date,
          card.userID
        )
      );

      this.quizzCard = cards.filter(card => card.id === this.QuizzCardid).map(card =>
        new QuizzCard(
          card.id,
          card.domaine,
          card.categorie,
          card.question,
          card.reponse,
          card.explication,
          card.publication,
          card.date,
          card.userID
        )
      )[0];

      console.log(this.quizzCard);

      if (this.quizzCard != null) {
        this.trouve = 'yes';
      }
    });
  }
}

