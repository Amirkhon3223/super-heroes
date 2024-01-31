import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { PageStateService } from '../../services/page-state.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage = 1;
  pageSize = 15;
  searchText: string = '';

  destroy$: Subject<void> = new Subject<void>();

  originalHeroes: Hero[] = []

  constructor(
    private router: Router,
    private heroService: HeroService,
    private pageStateService: PageStateService
    ) {
  }

  ngOnInit(): void {
    const savedPage = this.pageStateService.getCurrentPage();
    if (savedPage) {
      this.currentPage = savedPage;
    }
    this.heroService.getAllSuperheroes().subscribe({
      next: (heroes: Hero[]) => {
        this.originalHeroes = [...heroes];
        this.heroes = heroes;
      },
    });
    this.heroService.searchText$.pipe(
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
    this.currentPage = 1; // sbros текущую страницу при фильтрации
  }

  get visibleHeroes(): Hero[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.heroes.slice(startIndex, startIndex + this.pageSize);
  }

  onNextPage() {
    const lastPage = Math.ceil(this.heroes.length / this.pageSize);
    if (this.currentPage < lastPage) {
      this.currentPage++;
      this.pageStateService.setCurrentPage(this.currentPage);
      this.onScrollTop();
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageStateService.setCurrentPage(this.currentPage);
      this.onScrollTop();
    }
  }

  onPageNumberClick(page: number) {
    this.currentPage = page;
    this.pageStateService.setCurrentPage(this.currentPage);
    this.onScrollTop();
  }

  onShowHeroDetails(hero: Hero) {
    // Сохраняем текущую страницу в localStorage
    localStorage.setItem('currentPage', this.currentPage.toString());
    this.router.navigate(['/hero', hero.id]);
  }


  // Добавил это, для того чтоб поднять страницу на верх после перехода по пагинациям
  onScrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  getPageNumbers(): number[] {
    // Определяем общее количество страниц
    const totalPages = Math.ceil(this.heroes.length / this.pageSize);
    // Определяем количество видимых кнопок в пагинации (минимум из 11 и общего количества страниц)
    const visibleButtons = Math.min(11, totalPages);
    let startPage = Math.max(1, Math.min(
      // текущую страницу на пагинации ставлю в центр, вычитая половину кнопок из текущей страницы
      this.currentPage - Math.floor(visibleButtons / 2), totalPages - visibleButtons + 1
    ));
    // Массив для отображение в пагинации с startPage
    return Array.from({length: visibleButtons}, (_, i) => startPage + i);
  }


  trackByHeroId(index: number, hero: Hero): number {
    return hero.id;
  }

}
