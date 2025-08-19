import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Observable, filter, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class currentRouteService{
  cr$: Observable<string>;

  constructor(private router: Router) {
    this.cr$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.url)
    );
  }
}