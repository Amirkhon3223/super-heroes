import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HotToastService, Toast } from '@ngneat/hot-toast';

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

  signup(): void {
    if (this.userName.trim() !== '' && this.password.trim() !== '' && this.userNameValid && this.passwordValid) {
      if (this.authService.register(this.userName, this.password)) {
        this.router.navigateByUrl('/login').then(() => {
          this.toast.success('Register was success');
          this.toast.success('Now you can login )');
        });
      } else {
        this.toast.error('This username already used by someone')
        console.log('Error sign up');
      }
    } else {
      this.toast.warning('Please enter valid username and password')
      console.log('Please enter valid username and password');
    }
  }

  validateUserName(): void {
    this.userNameValid = /^[a-zA-Z0-9]{6,}$/.test(this.userName);
  }

  validatePassword(): void {
    this.passwordValid = this.password.length >= 8;
  }
}
