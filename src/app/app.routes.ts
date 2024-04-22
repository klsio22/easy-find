import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterComponent } from './components/pages/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: '', component: LoginComponent},
];
