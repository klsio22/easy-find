import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
