import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private categorie = new BehaviorSubject<string>('aléatoire');
  private theme = new BehaviorSubject<string>('aléatoire');
  
  difficulte$: Observable<string> = this.categorie.asObservable();
  domaine$: Observable<string> = this.theme.asObservable();

  setDifficulte(option: string): void {
    this.categorie.next(option);
  }

  setDomaine(option: string): void {
    this.theme.next(option);
  }
}

