import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edition.component.html',
})
export class ModalEditionComponent {
  @Input() isModalOpen: boolean = false;
  @Input() newEmail: string = '';
  @Input() currentPassword: string = '';
}
