import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { HotToastModule, provideHotToastConfig } from '@ngneat/hot-toast';
import { AuthService } from './services/auth.service';
import { HeroService } from './services/hero.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    HeroesListComponent,
    HeroDetailComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HotToastModule.forRoot({
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
    }),
  ],
  providers: [
    provideHotToastConfig(),
    AuthService,
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
