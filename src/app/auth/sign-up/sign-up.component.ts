import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  signup(): void {
    if (this.authService.register(this.email, this.password)) {
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    } else {
      console.log('Error sign up')
    }
  }
}
