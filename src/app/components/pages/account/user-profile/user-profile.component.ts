import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  userName = 'Seu Nome';
  userPhone = '(67) 91956-2919';
  userBio = `Olá! Meu nome é ${this.userName} e sou um entusiasta da tecnologia apaixonado por desenvolvimento web e design de interfaces. Atualmente, estou cursando Engenharia de Computação na Universidade Federal de São Paulo (UNIFESP) e buscando oportunidades para aprimorar minhas habilidades e conhecimentos na área.`;
  editMode: boolean = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    this.editMode = false;
  }

  editProfile() {
   this.toggleEditMode();
  }
}
