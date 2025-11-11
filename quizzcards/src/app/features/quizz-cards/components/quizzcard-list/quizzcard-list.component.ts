import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QuizzCardComponent } from '../../../../shared/components/quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../../core/services/quizz-card.service';
import { FilterService } from '../../../../core/services/filter.service';
import { QuizzCard } from '../../../../shared/models/quizz-card.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AnimateOnVisibleDirective } from '../../../../core/directives/AnimationOnVisible.directive';

@Component({
  selector: 'app-quizzcard-list',
  standalone: true,
  imports: [
    QuizzCardComponent,
    CommonModule,
    MatToolbarModule,
    AnimateOnVisibleDirective
  ],
  templateUrl: './quizzcard-list.component.html',
  styleUrl: './quizzcard-list.component.scss'
})
export class QuizzcardListComponent implements OnInit, OnDestroy {
  quizzCards!: QuizzCard[];
  quizzCards$!: Observable<QuizzCard[]>;
  difficulte!: string;
  domaine!: string;
  quizzCardLsength =0
  private destroy$!: Subject<boolean>;

  constructor(
    public quizzCardService: QuizzCardService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();

    this.filterService.difficulte$.subscribe(value => {
      this.difficulte = value;
    });

    this.filterService.domaine$.subscribe(value => {
      this.domaine = value;
    });

    this.quizzCards$ = this.quizzCardService.getQuizzCardsApi();

    this.quizzCards$.subscribe(cards => {
      this.quizzCardLsength = cards.length;
      this.quizzCards = cards.filter(
        card => card.publication === 'publique' || this.router.url === '/adminpage'
      ).map(card =>
        new QuizzCard(
          card.id,
          card.domaine,
          card.categorie,
          card.question,
          card.reponse,
          card.explication,
          card.publication,
          card.date ? card.date : new Date(),
          card.userID
        )
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  setDifficulte(option: string): void {
    this.filterService.setDifficulte(option);
  }

  setDomaine(option: string): void {
    this.filterService.setDomaine(option);
  }
}

