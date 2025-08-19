import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TopSideBareService{
    private categorie = new BehaviorSubject<string>('aléatoire'); 
    private theme = new BehaviorSubject<string>('aléatoire'); 
    difficulte = this.categorie.asObservable();
    domaine = this.theme.asObservable()
  
    setDifficulte(option: string) {
      this.categorie.next(option);
    }
  
    setDomaine(option: string) {
      this.theme.next(option);
    }
}