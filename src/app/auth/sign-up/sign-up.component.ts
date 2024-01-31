import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  userName: string = '';
  password: string = '';
  userNameValid: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
  }

  async signup(): Promise<void> {
    if (this.userName.trim() !== '' && this.password.trim() !== '' && this.userNameValid && this.passwordValid) {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = users.find((user: any) => user.userName === this.userName);
      if (existingUser) {
        this.toast.error('This username is already used by someone.');
      } else {
        const success = await this.authService.register(this.userName, this.password);
        if (success) {
          this.router.navigateByUrl('/login')
            this.toast.success('Registration successful! Now you can log in.');
        } else {
          this.toast.error('Failed to register user.');
        }
      }
    } else {
      this.toast.warning('Please enter a valid username and password.');
    }
  }


  validateUserName(): void {
    this.userNameValid = /^[a-zA-Z0-9]{6,}$/.test(this.userName);
  }

  validatePassword(): void {
    this.passwordValid = this.password.length >= 8;
  }
}
