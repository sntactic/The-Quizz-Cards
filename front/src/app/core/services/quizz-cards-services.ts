import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { QuizzCard } from "../templates/quizz-card";
import { AuthService } from "./auth_service";

@Injectable({
    providedIn: 'root'
})

export class QuizzCardService{

    private cardToEdit = new BehaviorSubject<QuizzCard>(new QuizzCard(0,'','','','','','',new Date(),'')) ;
    cardToEdit$ = this.cardToEdit.asObservable();

    constructor(private http:HttpClient, private router : Router, private auth : AuthService){};

    getCardToEdit(card : QuizzCard) {
        this.cardToEdit.next(card);
    };


    getAnswer(question : string) : Observable<any>{
        return this.http.post('http://localhost:3000/answer',{question});
    };


    getQuizzCardsApi() : Observable<QuizzCard[]>{
        return this.http.get<QuizzCard[]>('http://localhost:9000/cards');
    };

    getMyQuizzCardsApi() : Observable<QuizzCard[]>{
        return this.http.get<QuizzCard[]>(`http://localhost:9000/cards/${this.auth.user.id}`);
    };


    postCard(card : Object) : Observable<string>{
        return this.http.post<string>('http://localhost:9000/cards', card);
    };

    putCard(card : object) : Observable<string>{
        return this.http.put<string>('http://localhost:9000/cards', card);
    };

    deleteCard(id : number) : Observable<string>{
        return this.http.delete<string>(`http://localhost:9000/cards/${id}`);
    };

}