import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Добавлено

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [FormsModule], // Добавлено FormsModule
      providers: [
        {provide: AuthService, useValue: authServiceSpyObj},
        {provide: Router, useValue: routerSpyObj}
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  it('должен вызывать метод authService.register и переходить на страницу входа при успешной регистрации', async () => {
    authServiceSpy.register.and.returnValue(Promise.resolve(true)); // Используем Promise.resolve() для возврата успешного обещания

    component.userName = 'test@example.com';
    component.password = 'password';
    await component.signup(); //  await, чтобы ждать завершения регистрации

    expect(authServiceSpy.register).toHaveBeenCalledWith('test@example.com', 'password');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('должен записывать ошибку в консоль, когда регистрация неудачна', async () => {
    authServiceSpy.register.and.returnValue(Promise.resolve(false)); // Используем Promise.resolve() для возврата неудачного обещания

    component.userName = 'test@example.com';
    component.password = 'password';
    await component.signup();
  });
});
