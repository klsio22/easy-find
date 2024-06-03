import { Component } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { BackPreviousScreenComponent } from '../../../back-previous-screen/back-previous-screen.component';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [UserProfileComponent, BackPreviousScreenComponent],
  templateUrl: './account-profile.component.html',
})
export class AccountProfileComponent {}
