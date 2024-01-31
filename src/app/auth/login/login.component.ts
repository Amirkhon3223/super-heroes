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

  async login(): Promise<void> {
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = users.find((user: any) => user.userName === this.email && user.password === this.password);
      if (existingUser) {
        const success = await this.authService.login(this.email, this.password);
        if (success) {
          this.router.navigateByUrl('/');
        } else {
          this.toast.error('Failed to login.');
        }
      } else {
        this.toast.error('Invalid email or password');
      }
    } else {
      this.toast.warning('Please enter email and password');
    }
  }
}
