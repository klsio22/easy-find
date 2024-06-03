import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { UserProfileComponent } from './components/pages/account/user-profile/user-profile.component';
import { AuthenticationComponent } from './components/pages/account/authentication/authentication.component';
import { AccountProfileComponent } from './components/pages/account/account-profile/account-profile.component';
import { authGuard } from './services/auth.guard';
import { loggedInGuard } from './services/logged-in.guard';
import { authResolver } from './services/auth-resolver.service';

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [loggedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    resolve: { auth: authResolver },
  },
  {
    path: 'account',
    component: AccountProfileComponent,
    canActivate: [authGuard],
    resolve: { auth: authResolver },
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    canActivate: [authGuard],
    resolve: { auth: authResolver },
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
    resolve: { auth: authResolver },
  },
  { path: '**', component: NotFoundPageComponent },
];
