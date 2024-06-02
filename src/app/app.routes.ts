import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { UserProfileComponent } from './components/pages/account/user-profile/user-profile.component';
import { AuthenticationComponent } from './components/pages/account/authentication/authentication.component';
import { AccountProfileComponent } from './components/pages/account/account-profile/account-profile.component';
import { AuthGuard } from './services/auth.guard';
import { LoggedInGuard } from './services/logged-in.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'account',
    component: AccountProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];
