import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    SpinnerComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: Auth,
    private router: Router,
    private authService: AuthService,
  ) {
    this.router = router;
    this.afAuth = afAuth;
    this.authService = authService;
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^.{6,}$/),
        ],
      ],
    });
  }
  async loginWithEmail() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    try {
      await this.authService.loginWithEmail(email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  async loginWithGoogle() {
    this.authService.login().then(async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(this.afAuth, provider);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    });
  }
}
