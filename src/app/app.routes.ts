import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { UserProfileComponent } from './components/pages/account/user-profile/user-profile.component';
import { AuthenticationComponent } from './components/pages/account/authentication/authentication.component';
import { AccountProfileComponent } from './components/pages/account/account-profile/account-profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountProfileComponent},
  { path: 'account/:userName', component: AccountProfileComponent},
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: NotFoundPageComponent }
];
