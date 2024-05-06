import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  @Input() userName: string;
  @Input() userPhone: string;
  @Input() userBio: string;
  @Input() editMode: boolean = false;
  @Output() newName = new EventEmitter<string>();

  constructor(private router: Router) {
    this.userName = 'João Silva';
    this.userPhone = '555-555-5555';
    this.userBio =
      'João Silva nasceu em uma pequena aldeia no coração de Portugal. Desde criança, ele demonstrava uma curiosidade insaciável pelo mundo e uma paixão por explorar novos horizontes. Seus olhos brilhavam quando ouvia histórias de marinheiros e aventureiros que desbravavam os mares em busca de tesouros e conhecimento.';
    this.newName.emit(this.userName);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile(name: string) {
    this.editMode = false;
    this.newName.emit(name);
  }

  editProfile() {
    this.toggleEditMode();
  }

  navigateToAccountProfile() {
    this.router.navigate(['/profile', this.userName]);
  }
}
