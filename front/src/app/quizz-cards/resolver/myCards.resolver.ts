import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from "@angular/router";
import { QuizzCard } from "../../core/templates/quizz-card";
import { QuizzCardService } from "../../core/services/quizz-cards-services";
import { firstValueFrom } from "rxjs";

@Injectable({providedIn : 'root'})

export class MyCardsResolver implements Resolve<QuizzCard[]>{

    quizzCards!:QuizzCard[];

    constructor(private quizzcardsservice : QuizzCardService){}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<QuizzCard[]> {
        return (await firstValueFrom(this.quizzcardsservice.getMyQuizzCardsApi())).map(card =>
            new QuizzCard(card.id, card.domaine, card.categorie, card.question, card.reponse, card.explication, card.publication, card.date, card.userID)
        );
        
    }
}