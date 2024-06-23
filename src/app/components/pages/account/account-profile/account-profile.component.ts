import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { SpinnerComponent } from '../../../spinner/spinner.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { BackPreviousScreenComponent } from '../../../back-previous-screen/back-previous-screen.component';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [UserProfileComponent, BackPreviousScreenComponent, HeaderComponent, SpinnerComponent],
  templateUrl: './account-profile.component.html',
})
export class AccountProfileComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']); 
    });
  }

}


