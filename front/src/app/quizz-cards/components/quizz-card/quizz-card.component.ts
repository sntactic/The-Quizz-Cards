import { User } from './../../../core/templates/user';
import { AuthService } from './../../../core/services/auth_service';
import { CommonModule, DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzCardService } from '../../../core/services/quizz-cards-services';
import { QuizzCard } from '../../../core/templates/quizz-card';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-quizz-card',
  imports: [
    NgStyle,
    DatePipe,
    CommonModule,
    NgClass,
    MatCardModule
  ],
  templateUrl: './quizz-card.component.html',
  styleUrl: './quizz-card.component.scss'
})
export class QuizzCardComponent implements OnInit{
  @Input() quizzCard!:QuizzCard;
  isAdmin=false;

  constructor(public route : Router , private quizzcardservice: QuizzCardService, private router:Router , private authService: AuthService){}

  fliped = false
  cardJson = {
    id : 0,
    domaine : "",
    categorie : "",
    question : "",
    reponse : "",
    explication : "",
    publication : "privee",
    date : "",
    userID : ''
  };

  getCardJson(card : QuizzCard) : Object{
    this.cardJson.id = card.id
    this.cardJson.domaine = card.domaine;
    this.cardJson.categorie = card.categorie;
    this.cardJson.question = card.question;
    this.cardJson.reponse = card.reponse;
    this.cardJson.explication = card.explication;
    this.cardJson.publication = card.publication;
    this.cardJson.date = String(card.date);
    this.cardJson.userID = card.userID

    return this.cardJson;

  }

  onfliped(){
    this.fliped = !this.fliped
  }

  ngOnInit(){
    if(this.authService.getUser() && this.authService.getUser().roles.includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }
  }

  onPublier(){

    if(this.quizzCard.publication === "privee"){
      this.quizzCard.publication = "publique"

    }else{
      this.quizzCard.publication = "privee"
    }

    this.quizzcardservice.putCard(this.getCardJson(this.quizzCard)).subscribe();
  }

  onEdit(){
    this.router.navigateByUrl("/editcard")
    this.quizzcardservice.getCardToEdit(this.quizzCard)
  }

  onDelete(){
    this.quizzcardservice.deleteCard(this.quizzCard.id).subscribe(message =>{this.router.navigateByUrl('/mycards')});

  }
  
}