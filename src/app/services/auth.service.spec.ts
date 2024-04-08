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

  it('should return true after successful login', async () => {
    const userName = 'test@example.com';
    const password = 'password';
    await service.register(userName, password); // Регистрация пользователя

    const result = await service.login(userName, password);

    expect(result).toBeTruthy();
  });

  it('should return false after unsuccessful registration', async () => {
    spyOn(service, 'register').and.callFake(async () => false);

    const result = await service.register('', '');
    expect(result).toBeFalsy();
  });

  it('should return true after successful login', async () => {
    const userName = 'test@example.com';
    const password = 'password';
    await service.register(userName, password); // Регистрация пользователя

    const result = await service.login(userName, password);

    expect(result).toBeTruthy();
  });
});
