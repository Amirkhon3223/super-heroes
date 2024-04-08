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
    this.currentPage = 1;
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
    localStorage.setItem('currentPage', this.currentPage.toString());
    this.router.navigate(['/hero', hero.id]);
  }

  onScrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.heroes.length / this.pageSize);
    const visibleButtons = Math.min(11, totalPages);
    let startPage = Math.max(1, Math.min(
      this.currentPage - Math.floor(visibleButtons / 2), totalPages - visibleButtons + 1
    ));
    return Array.from({length: visibleButtons}, (_, i) => startPage + i);
  }

  trackByHeroId(index: number, hero: Hero): number {
    return hero.id;
  }
}
