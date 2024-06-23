import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { SpinnerComponent } from '../../../spinner/spinner.component';
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
    HeaderComponent, 
    SpinnerComponent
  ],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  email: string = 'joaodasilva@gmail.com';
  newEmail: string = '';
  currentPassword: string = '';
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
