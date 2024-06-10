import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Observable } from 'rxjs';
import { UploadService } from '../../../services/upload.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SpinnerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  selectedFile: File | null = null;
  downloadURL$: Observable<string> | null = null;
  isLoading: boolean = false;

  constructor(private uploadService: UploadService, private authService: AuthService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.isLoading = true;
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.downloadURL$ = this.uploadService.uploadFile(this.selectedFile as File, user.uid);
          this.downloadURL$.subscribe(() => {
            this.isLoading = false;
          });
        }
      });
    }
  }
}
