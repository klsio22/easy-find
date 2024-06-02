import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
