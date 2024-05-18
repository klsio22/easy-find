import { Component, Input, Output } from '@angular/core';
import { PenComponent } from '../../../../../assets/pen/pen.component';
import { BackPreviousScreenComponent } from '../../../back-previous-screen/back-previous-screen.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [PenComponent, BackPreviousScreenComponent, FormsModule,CommonModule],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  email: string = 'joaodasilva@gmail.com';
  newEmail: string = '';
  currentPassword: string = '';
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
