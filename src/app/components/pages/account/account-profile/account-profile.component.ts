import { Component, ViewChild } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [UserProfileComponent],
  templateUrl: './account-profile.component.html',
})
export class AccountProfileComponent {
  userName: string;

  constructor(private route: ActivatedRoute) {
    this.userName = this.route.snapshot.params['userName'];
  }
}
