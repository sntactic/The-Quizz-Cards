import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzCardComponent } from '../quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../core/services/quizz-cards-services';
import { QuizzCard } from '../../../core/templates/quizz-card';

@Component({
  selector: 'app-sigle-quizz-card',
  imports: [
    QuizzCardComponent,
    CommonModule
  ],
  templateUrl: './sigle-quizz-card.component.html',
  styleUrl: './sigle-quizz-card.component.scss'
})

export class SigleQuizzCardComponent implements OnInit{
  constructor(private route:ActivatedRoute ,private quizzcardservice:QuizzCardService){}
  quizzCard!:QuizzCard;
  quizzCards!:QuizzCard[];
  trouve= "";
  QuizzCardid!: number;
  ngOnInit(): void {
    this.QuizzCardid = this.route.snapshot.params['id']*1;
    //const result= this.quizzcardservice.getQuizzCardId(this.QuizzCardid) 
    // if(result !== ''){
    //   this.quizzCard = result
    //   this.trouve = "yes"
    // }

    this.quizzcardservice.getQuizzCardsApi().subscribe(cards => {
      this.quizzCards = cards.map(card =>
        new QuizzCard(card.id, card.domaine, card.categorie, card.question, card.reponse, card.explication, card.publication,card.date,card.userID)
      );
      
      this.quizzCard= cards.filter(card => card.id === this.QuizzCardid).map(card =>
        new QuizzCard(card.id, card.domaine, card.categorie, card.question, card.reponse, card.explication, card.publication,card.date,card.userID)
      )[0];

      console.log(this.quizzCard)

      if(this.quizzCard != null){
        this.trouve = 'yes'
      }

    });

  }

}
