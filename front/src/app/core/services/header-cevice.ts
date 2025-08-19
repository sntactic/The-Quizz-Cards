import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class HeaderService{
    private menueClique = new BehaviorSubject<boolean>(false);
    onclique$ = this.menueClique.asObservable();
    
    setClique = (clique : boolean)=>{
        this.menueClique.next(clique);
    }
}