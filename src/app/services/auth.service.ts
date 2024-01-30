import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {
  }

  login(userName: string, password: string): boolean {
    // Получаем зарегистрированных пользователей из локального хранилища
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Проверяем, существует ли пользователь с таким userName и password
    const loggedInUser = registeredUsers.find((user: any) => user.userName === userName && user.password === password);

    // Если пользователь найден, устанавливаем флаг входа в true и сохраняем имя пользователя
    if (loggedInUser) {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', userName);
      return true;
    } else {
      // Если пользователь не найден, возвращаем false
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

  register(userName: string, password: string): boolean {
    try {
      // Получаем уже зарегистрированных пользователей из локального хранилища
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      // Проверяем, существует ли уже пользователь с таким userName
      const existingUser = registeredUsers.find((user: any) => user.userName === userName);
      if (existingUser) {
        console.error('User with this userName already exists');
        return false;
      }

      // Проводим регистрацию, сохраняем данные пользователя в локальное хранилище
      registeredUsers.push({userName, password});
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      localStorage.setItem('username', userName);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

}
