import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage = 1;
  pageSize = 15;
  searchText: string = '';
  destroy$: Subject<void> = new Subject<void>();
  originalHeroes: Hero[] = []

  constructor(private router: Router, private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getAllSuperheroes().subscribe({
      next: (heroes: Hero[]) => {
        this.originalHeroes = [...heroes];
        this.heroes = heroes;
      },
      error: (error) => {
        console.error('Error fetching heroes:', error);
      }
    });
    // Наблюдатель для поля текста по поиску )
    this.heroService.searchInput.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((text: string) => {
      this.searchText = text;
      this.onFilterHeroes();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterHeroes() {
    this.heroes = this.searchText.trim()
      ? this.originalHeroes.filter(hero => hero.name.toLowerCase().includes(this.searchText.toLowerCase()))
      : [...this.originalHeroes];
  }

  get visibleHeroes(): Hero[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.heroes.slice(startIndex, startIndex + this.pageSize);
  }

  onNextPage() {
    const lastPage = Math.ceil(this.heroes.length / this.pageSize);
    if (this.currentPage < lastPage) {
      this.currentPage++;
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onPageNumberClick(page: number) {
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.heroes.length / this.pageSize);
    return Array.from({length: totalPages}, (_, index) => index + 1);
  }

  onShowHeroDetails(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }

  trackByHeroId(index: number, hero: Hero): number {
    return hero.id;
  }
}
