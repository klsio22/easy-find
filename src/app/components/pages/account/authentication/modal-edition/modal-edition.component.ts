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
      console.log('Dados salvos:', userData);
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
      console.log('Salvando dados...');
      modal.close();
      this.form.reset();
      this.errorMessage = '';
    }
  }

  onBackdropClick(event: MouseEvent | TouchEvent) {
    // Verifique se o clique foi feito no fundo do modal
    if ((event.target as Element).classList.contains('modal')) {
      this.closeModal();
    }
  }
}
