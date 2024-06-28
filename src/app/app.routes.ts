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

export const routes: Routes = [
  {
    title: 'login',
    path: '',
    component: LoginComponent,
    canActivate: [loggedInGuard],
    pathMatch: 'full',
  },
  {
    title: 'registrar',
    path: 'register',
    component: RegisterComponent,
    canActivate: [loggedInGuard],
  },
  {
    title: 'home',
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    title: 'conta',
    path: 'account',
    component: AccountProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        title: 'autenticação',
        path: 'authentication',
        component: AuthenticationComponent,
      },
      { title: 'perfil', path: 'profile', component: UserProfileComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];
