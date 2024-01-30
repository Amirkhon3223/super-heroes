import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
  }

  login(): void {
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      if (this.authService.login(this.email, this.password)) {
        localStorage.setItem('username', this.email);
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      } else {
        this.toast.error('Invalid email or password')
        console.log("Invalid email or password");
      }
    } else {
      this.toast.warning('Please enter email and password')
      console.log("Please enter email and password");
    }
  }
}
