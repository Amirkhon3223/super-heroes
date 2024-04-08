import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, Subject, take } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { API_BASE_URL, API_TOKEN } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl: string = `${API_BASE_URL}/${API_TOKEN}`;
  private searchTextSubject: Subject<string> = new Subject<string>();
  public searchText$: Observable<string> = this.searchTextSubject.asObservable();
  private filteredHeroes: Hero[] = [];


  constructor(private http: HttpClient) {
  }

  getAllSuperheroes(): Observable<Hero[]> {
    const observables: Observable<Hero>[] = [];
    for (let id = 1; id <= 50; id++) {
      observables.push(this.getHeroById(id.toString()));
    }
    return forkJoin(observables);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        powerstats: response.powerstats,
        biography: response.biography,
        appearance: response.appearance,
        work: response.work,
        connections: response.connections,
        image: response.image
      }))
    );
  }

  filterHeroes(): void {
    let searchText: string;
    this.searchText$.pipe(take(1)).subscribe(value => searchText = value);
    this.filteredHeroes = this.filteredHeroes.filter(hero => hero.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  setSearchText(text: string) {
    this.searchTextSubject.next(text);
  }

}
