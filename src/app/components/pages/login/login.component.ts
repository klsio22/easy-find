import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private afAuth: Auth,
    private router: Router,
    private authService: AuthService
  ) {
    this.router = router;
    this.afAuth = afAuth;
    this.authService = authService;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  async loginWithEmail() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    try {
      await this.authService.loginWithEmail(email, password);
      console.log('Usuário logado com email:', email);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  async loginWithGoogle() {
     this.authService.login().then( async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.afAuth, provider);
        console.log('Usuário logado:', result.user);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    });
  }
}
