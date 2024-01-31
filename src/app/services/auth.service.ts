import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() {
    // Проверяем состояние аутентификации при инициализации сервиса
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
      // Если вход неуспешный:
      // reject(false);
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
      // Берем пользователей из локального хранилища
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      // Смотрим, есть ли уже пользователь с таким userName
      const existingUser = registeredUsers.find((user: any) => user.userName === userName);
      if (existingUser) {
        return false; // Пользователь уже существует
      }
      // Делаем регистрацию, сохраняем данные пользователя в локальное хранилище
      registeredUsers.push({ userName, password });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }
}
