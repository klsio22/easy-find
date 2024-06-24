import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BackPreviousScreenComponent } from '../../../back-previous-screen/back-previous-screen.component';
import firebase from 'firebase/compat/app';
import { FirebaseService } from '../../../../services/firebase.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, NgIf, BackPreviousScreenComponent,HeaderComponent, SpinnerComponent],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  @Input() userName: string = 'Seu nome';
  @Input() userPhone: string = '';
  @Input() userBio: string = '';
  @Input() editMode: boolean = false;
  currentUser: firebase.User | null = null;

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.loadUserProfile(user.uid);
      }
    });
  }

  loadUserProfile(uid: string) {
    this.firebaseService.getUserProfile(uid).subscribe((profile) => {
      if (profile) {
        this.userName = profile.name || 'Seu nome';
        this.userPhone = profile.phone || '';
        this.userBio = profile.bio || '';
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    if (this.currentUser) {
      const userData = {
        name: this.userName,
        phone: this.userPhone,
        bio: this.userBio,
      };
      this.firebaseService.saveUserProfile(this.currentUser.uid, userData).subscribe(() => {
        this.editMode = false;
      });
    }
  }

  editProfile() {
    this.toggleEditMode();
  }

  navigateToAccountProfile() {
    this.router.navigate(['/profile', this.userName]);
  }
}