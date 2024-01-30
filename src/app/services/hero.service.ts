import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, Subject } from 'rxjs';
import { Hero } from '../interfaces/hero';
import { API_BASE_URL, API_TOKEN } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl: string = `${API_BASE_URL}/${API_TOKEN}`;
  public searchInput: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getAllSuperheroes(): Observable<Hero[]> {
    const observables: Observable<Hero>[] = [];
    // Мне удалось мне разом всех по АПИ взять все героев...
    // Пришлось вот так по ИД взять. Через программу Инсомнния тестил АПИ и там 644 героев..
    // Тут цикл нужно до 644 довести максимум, но сам 644 писать не стал думаю будет сильно грузить
    for (let id = 1; id <= 500; id++) {
      observables.push(this.getHeroById(id.toString()));
    }
    return forkJoin(observables);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const hero: Hero = {
          id: response.id,
          name: response.name,
          powerstats: response.powerstats,
          biography: response.biography,
          appearance: response.appearance,
          work: response.work,
          connections: response.connections,
          image: response.image
        };
        return hero;
      })
    );
  }

  setSearchText(text: string) {
    this.searchInput.next(text);
  }

}