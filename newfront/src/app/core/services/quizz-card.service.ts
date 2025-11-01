import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getCardToEdit(card: QuizzCard): void {
    this.cardToEdit.next(card);
  }

  getAnswer(question: string): Observable<any> {
    return this.http.post(`${API_CONFIG.expressUrl}${API_CONFIG.endpoints.answer}`, { question });
  }

  getQuizzCardsApi(): Observable<QuizzCard[]> {
    return this.http.get<QuizzCard[]>(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.allCards}`);
  }

  getMyQuizzCardsApi(): Observable<QuizzCard[]> {
    return this.http.get<QuizzCard[]>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cardsByUser(this.auth.user.id)}`
    );
  }

  postCard(card: Object): Observable<string> {
    return this.http.post<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cards}`,
      card
    );
  }

  putCard(card: object): Observable<string> {
    return this.http.put<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cards}`,
      card
    );
  }

  deleteCard(id: number): Observable<string> {
    return this.http.delete<string>(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cardById(id)}`
    );
  }
}

