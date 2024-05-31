import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
  ) {
    this.router = router;
    this.afAuth = afAuth;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.afAuth, provider);
      console.log('Usuário logado:', result.user);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }
}
