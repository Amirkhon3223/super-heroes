import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  loggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private heroService: HeroService,
    private router: Router
  ) {
    this.loggedIn$ = this.authService.isLoggedIn$();

  }

  ngOnInit(): void {
    this.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.username = localStorage.getItem('username');
      } else {
        this.username = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onSearchInputChange(event: any) {
    this.heroService.setSearchText(event.target.value);
    this.heroService.filterHeroes();
  }
}
