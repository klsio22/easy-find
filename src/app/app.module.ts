// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';
import { RegisterComponent } from './components/pages/register/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AccountProfileComponent } from './components/pages/account/account-profile/account-profile.component';
import { AuthenticationComponent } from './components/pages/account/authentication/authentication.component';
import { UserProfileComponent } from './components/pages/account/user-profile/user-profile.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountProfileComponent },
  { path: 'account/:userName', component: AccountProfileComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'profile', component: UserProfileComponent },

  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterOutlet,
    RouterModule.forRoot(routes),
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AppComponent],
})
export class AppModule {}
