import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { PageStateService } from '../../services/page-state.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private pageStateService: PageStateService
  ) {
  }

  ngOnInit(): void {
    const storedPage = localStorage.getItem('currentPage');
    this.currentPage = storedPage ? parseInt(storedPage) : 1;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.heroService.getHeroById(id).subscribe({
        next: (hero: Hero) => {
          this.hero = hero;
        },
        error: (error) => {
          console.error('Error fetching hero details:', error);
        }
      });
    }
  }

  goBack(): void {
    const currentPage = this.pageStateService.getCurrentPage(); // Получаем сохраненную страницу
    this.router.navigate([''], { queryParams: { page: currentPage } }); // Переходим на главную страницу с сохраненной страницей
  }
}
