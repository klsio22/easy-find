import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../services/auth.service';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';


interface RegisterData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HeaderComponent, SpinnerComponent
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  protected registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private afAuth: Auth,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatch,
      },
    );
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.firebaseService.registerUser(email, password, {}).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          alert('Usuário já existe ou tente novamente mais tarde');
        },
      });
    }
  }

  passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMatch: true });
      return { passwordMatch: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  private saveToStorage(data: RegisterData) {
    localStorage.setItem('registerData', JSON.stringify(data));
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
