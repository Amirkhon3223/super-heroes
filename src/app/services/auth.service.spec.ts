import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('должен быть создан', () => {
    expect(service).toBeTruthy();
  });

  // Тест на регистрацию
  it('должен возвращать true после успешной регистрации', () => {
    const userName = 'test@example.com';
    const password = 'password';
    const result = service.register(userName, password);

    expect(result).toBeTruthy();
  });

  // Тест обработки ошибки при регистрации
  it('должен возвращать false после неудачной регистрации', () => {
    const result = service.register('', '');
    expect(result).toBeFalsy();
  });

  // Тест на логин
  it('должен возвращать true после успешного входа', () => {
    //  Тест успешного входа
    //  имя пользователя и пароль
    const userName = 'test@example.com';
    const password = 'password';

    const result = service.login(userName, password);

    expect(result).toBeTruthy();
  });

  // тест на ошибку входа
  it('должен возвращать false после неудачного входа', () => {
    const result = service.login('', '');
    expect(result).toBeFalsy();
  });
});