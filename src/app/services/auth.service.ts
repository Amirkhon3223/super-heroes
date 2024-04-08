import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (typeof localStorage !== 'undefined') {
      const isLoggedIn = localStorage.getItem('loggedIn');
      this.loggedIn$.next(isLoggedIn === 'true');
    }
  }

  login(userName: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Если вход успешный:
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', userName);
      this.loggedIn$.next(true);
      resolve(true);

    });
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.loggedIn$.next(false);
  }

  isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  async register(userName: string, password: string): Promise<boolean> {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find((user: any) => user.userName === userName);
      if (existingUser) {
        return false;
      }
      registeredUsers.push({userName, password});
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }
}
