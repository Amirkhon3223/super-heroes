import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {
  }

  login(email: string, password: string): boolean {
    if (email === 'test' && password === 'test') {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn() {
    if (typeof localStorage !== 'undefined') {
      return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
    }
    return false;
  }

  register(email: string, password: string): boolean {
    localStorage.setItem('registeredUser', JSON.stringify({email, password}));
    localStorage.setItem('username', email); // грузим имя юзера в локальной памяти... Тут нет реальной регистрации(нужно делать бекенд)
    return true;
  }
}
