import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent], // объявление компонентов, используемых в тесте
      providers: [
        // предоставляем сервисы, используемые в компоненте и подменяем их шпионами
        {provide: AuthService, useValue: authServiceSpyObj},
        {provide: Router, useValue: routerSpyObj}
      ]
    }).compileComponents(); // компилируем компоненты

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Тест проверки создания компонента
  it('должен быть создан', () => {
    expect(component).toBeTruthy();
    // Проверяем, что компонент был создан
  });

  // Тест успешной регистрации
  it('должен вызывать метод authService.register и переходить на страницу входа при успешной регистрации', () => {
    authServiceSpy.register.and.returnValue(true);
    // Настриваем шпион AuthService на успешное выполнение регистрации

    component.userName = 'test@example.com'; // Устанавливаем имя пользователя
    component.password = 'password'; // Устанавливаем пароль
    component.signup(); // Вызываем метод регистрации

    // Проверяем вызов метода register
    expect(authServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'password');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
    // Проверяем вызов метода navigateByUrl
  });

  // Тест обработки ошибки при регистрации
  it('должен записывать ошибку в консоль, когда регистрация неудачна', () => {
    // Настриваем шпион AuthService на неуспешное выполнение регистрации
    authServiceSpy.register.and.returnValue(false);

    component.userName = 'test@example.com'; // Задаем имя пользователя
    component.password = 'password'; // И пароль
    component.signup(); // Вызываем метод регистрации

  });
});
