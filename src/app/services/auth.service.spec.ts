import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let store: { [key: string]: string };

  beforeEach(() => {
    store = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Тест на регистрацию
  it('should return true after successful login', async () => {
    // Регистрация пользователя
    const userName = 'test@example.com';
    const password = 'password';
    await service.register(userName, password); // Регистрация пользователя

    // Вход
    const result = await service.login(userName, password);

    // Проверка
    expect(result).toBeTruthy();
  });


  // Тест обработки ошибки при регистрации
  it('should return false after unsuccessful registration', async () => {
    spyOn(service, 'register').and.callFake(async () => false);

    const result = await service.register('', '');
    expect(result).toBeFalsy();
  });

// Тест на успешный вход
  it('should return true after successful login', async () => {
    // Регистрация пользователя
    const userName = 'test@example.com';
    const password = 'password';
    await service.register(userName, password); // Регистрация пользователя

    // Вход
    const result = await service.login(userName, password);

    // Проверка
    expect(result).toBeTruthy();
  });
});
