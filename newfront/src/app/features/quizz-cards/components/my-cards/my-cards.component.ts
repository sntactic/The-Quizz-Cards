import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzCardComponent } from '../../../../shared/components/quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../../core/services/quizz-card.service';
import { QuizzCard } from '../../../../shared/models/quizz-card.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimateOnVisibleDirective } from '../../../../core/directives/AnimationOnVisible.directive';

@Component({
  selector: 'app-my-cards',
  standalone: true,
  imports: [
    QuizzCardComponent,
    CommonModule,
    RouterLink,
    AnimateOnVisibleDirective
  ],
  templateUrl: './my-cards.component.html',
  styleUrl: './my-cards.component.scss'
})
export class MyCardsComponent implements OnInit {
  quizzCards: QuizzCard[] = [];
  quizzCards$!: Observable<QuizzCard[]>;

  constructor(
    private quizzCardService: QuizzCardService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuth === true) {
      this.quizzCardService.getMyQuizzCardsApi().subscribe(cards => {
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
      });
    }
  }
}

