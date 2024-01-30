// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login(): void {
    if (this.authService.login(this.email, this.password)) {
      localStorage.setItem('username', this.email);
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    } else {
      console.log("error")
    }
  }
}
