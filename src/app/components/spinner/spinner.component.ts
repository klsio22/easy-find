import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}
