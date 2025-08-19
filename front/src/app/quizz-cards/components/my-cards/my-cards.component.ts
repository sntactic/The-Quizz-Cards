import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizzCardComponent } from '../quizz-card/quizz-card.component';
import { QuizzCardService } from '../../../core/services/quizz-cards-services';
import { QuizzCard } from '../../../core/templates/quizz-card';
import { AuthService } from '../../../core/services/auth_service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-cards',
  imports: [
    QuizzCardComponent,
    CommonModule
  ],
  templateUrl: './my-cards.component.html',
  styleUrl: './my-cards.component.scss'
})


export class MyCardsComponent implements OnInit{

  quizzCards:QuizzCard[] = [];

  quizzCards$!:Observable <QuizzCard[]>;

  constructor(private quizzCardService: QuizzCardService, private auth : AuthService , private route : ActivatedRoute ){}

  ngOnInit(): void {

    //console.log("par le resolver:", this.route.snapshot.data['quizzcards'])

    if ( this.auth.isAuth === true){
      this.quizzCardService.getMyQuizzCardsApi().subscribe(cards => {
        this.quizzCards = cards.map(card =>
          new QuizzCard(card.id, card.domaine, card.categorie, card.question, card.reponse, card.explication, card.publication, card.date, card.userID)
        );
      });
    }

  }
  
}
