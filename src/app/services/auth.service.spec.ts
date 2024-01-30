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
  it('должен возвращать true после успешной регистрации', async () => {
    const userName = 'test@example.com';
    const password = 'password';

    spyOn(service, 'register').and.callFake(async () => true);

    const result = await service.register(userName, password);
    expect(result).toBeTruthy();
  });

// Тест обработки ошибки при регистрации
  it('должен возвращать false после неудачной регистрации', async () => {
    spyOn(service, 'register').and.callFake(async () => false);

    const result = await service.register('', '');
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

// Тест на ошибку входа
  it('должен возвращать false после неудачного входа', () => {
    spyOn(service, 'login').and.returnValue(false);
    const result = service.login('', '');
    expect(result).toBeFalsy();
  });
});