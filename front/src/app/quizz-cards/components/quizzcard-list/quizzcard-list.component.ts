import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QuizzCardComponent } from '../quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../core/services/quizz-cards-services';
import { TopSideBareService } from '../../../core/services/top-side-bare-service';
import { QuizzCard } from '../../../core/templates/quizz-card';


@Component({
  selector: 'app-quizzcard-list',
  imports: [
    QuizzCardComponent,
    CommonModule
  ],
  templateUrl: './quizzcard-list.component.html',
  styleUrl: './quizzcard-list.component.scss'
})


export class QuizzcardListComponent implements OnInit, OnDestroy{

  quizzCards!:QuizzCard[];
  quizzCards$!:Observable<QuizzCard[]>;
  difficulte!:string;
  domaine!:string;
  private destroy$!: Subject<boolean>

  constructor(private quizzCardService: QuizzCardService , private topSideBareService: TopSideBareService,){}

  ngOnInit(): void {

    this.destroy$ = new Subject<boolean>()

    this.topSideBareService.difficulte.subscribe(value =>{this.difficulte = value})

    this.topSideBareService.domaine.subscribe(value =>{this.domaine = value})

    this.quizzCards$ = this.quizzCardService.getQuizzCardsApi();

    this.quizzCards$.subscribe(cards => {
      this.quizzCards = cards.filter(card => card.publication === 'publique' ).map(card =>
        new QuizzCard(card.id, card.domaine, card.categorie, card.question, card.reponse, card.explication, card.publication , card.date? card.date : new Date(),card.userID)
      );
    });

    // interval(1000).pipe(
    //   takeUntil(this.destroy$),
    //   tap(console.log)
    // ).subscribe()
  }

  ngOnDestroy(): void {
      this.destroy$.next(true)
  }

  setDifficulte(option: string){
    this.topSideBareService.setDifficulte(option);
  }

  setDomaine(option: string){
    this.topSideBareService.setDomaine(option);
  }

}
