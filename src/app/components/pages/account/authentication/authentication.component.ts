import { Component } from '@angular/core';
import { PenComponent } from '../../../../../assets/pen/pen.component';
import { BackPreviousScreenComponent } from '../../../back-previous-screen/back-previous-screen.component';
import { ModalEditionComponent } from './modal-edition/modal-edition.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    PenComponent,
    BackPreviousScreenComponent,
    ModalEditionComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  email: string = 'joaodasilva@gmail.com';
  newEmail: string = '';
  currentPassword: string = '';
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModalAuth() {
    this.showModal = false;
  }
}
