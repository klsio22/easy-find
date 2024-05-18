import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-previous-screen',
  standalone: true,
  imports: [],
  templateUrl: './back-previous-screen.component.html',
})
export class BackPreviousScreenComponent {
  @Input() title: string = '';
  @Input() link: string = '';
}
