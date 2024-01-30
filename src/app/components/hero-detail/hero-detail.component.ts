import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent {
  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {
  }

  ngOnInit(): void {
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

}
