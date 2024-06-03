import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SpinnerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
