import { Component } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  providers: [HttpClient],
})
export class AppComponent {}
