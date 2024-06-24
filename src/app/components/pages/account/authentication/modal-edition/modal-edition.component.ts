import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal-edition',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-edition.component.html',
})
export class ModalEditionComponent implements OnInit {
  @Input() newEmail: string = '';
  @Input() currentPassword: string = '';
  form: FormGroup = new FormGroup({});
  errorMessage: string = '';

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const userData = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      this.closeModal();
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos.';
    }
  }
  closeModal() {
    const modal = document.getElementById(
      'modal_change_email',
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
      this.form.reset();
      this.errorMessage = '';
    }
  }

  onBackdropClick(event: MouseEvent | TouchEvent) {
    if ((event.target as Element).classList.contains('modal')) {
      this.closeModal();
    }
  }
}
