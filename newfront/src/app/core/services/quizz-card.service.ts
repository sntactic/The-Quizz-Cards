import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, retry } from 'rxjs';
import { QuizzCard } from '../../shared/models/quizz-card.model';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class QuizzCardService {
  private cardToEdit = new BehaviorSubject<QuizzCard>(
    new QuizzCard(0, '', '', '', '', '', '', new Date(), '')
  );
  cardToEdit$ = this.cardToEdit.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  cardListSubject =new BehaviorSubject<QuizzCard[]>([])
  cardsListObervable = this.cardListSubject.asObservable()

  getCardToEdit(card: QuizzCard): void {
    this.cardToEdit.next(card);
  }

  doGetMyCardsRequest(){
    const id = this.auth.user? this.auth.user.id : "";
    this.http.get<QuizzCard[]>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cardsByUser(id)}`
    ).pipe(
      map(cards =>
        cards.map(card =>
          new QuizzCard(
            card.id,
            card.domaine,
            card.categorie,
            card.question,
            card.reponse,
            card.explication,
            card.publication,
            new Date(card.date),
            card.userID
          )
        )
      )
    ).subscribe(cards => this.cardListSubject.next(cards));
  };

  getAnswer(question: string): Observable<any> {
    return this.http.post(`${API_CONFIG.expressUrl}${API_CONFIG.endpoints.answer}`, { question });
  }

  getQuizzCardsApi(): Observable<QuizzCard[]> {
    return this.http.get<QuizzCard[]>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allCards}`);
  }

  getMyQuizzCardsApi(): Observable<QuizzCard[]> {
    this.doGetMyCardsRequest()
    return this.cardsListObervable;
  }

  postCard(card: Object): Observable<string> {
    return this.http.post<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cards}`,
      card
    );
  }

  putCard(card: object , id :string): Observable<string> {
    return this.http.put<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cards}/${id}`,
      card
    );
  }

  deleteCard(id: number): Observable<string> {
    return this.http.delete<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cardById(id)}`
    );
  }
}

