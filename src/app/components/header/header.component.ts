import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private heroService: HeroService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.username = localStorage.getItem('username');
    }
  }


  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
    this.username = null;
    this.router.navigate(['login'])
  }

  onSearchInputChange(event: any) {
    this.heroService.setSearchText(event.target.value);
  }
}
