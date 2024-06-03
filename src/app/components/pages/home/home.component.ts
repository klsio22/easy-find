import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Observable } from 'rxjs';
import { UploadService } from '../../../services/upload.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SpinnerComponent, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  selectedFile: File | null = null;
  bookTitle: string = '';
  bookAuthor: string = '';
  downloadURL$: Observable<string> | null = null;

  constructor(private uploadService: UploadService, private authService: AuthService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (this.selectedFile && this.bookTitle && this.bookAuthor) {
      const bookData = {
        title: this.bookTitle,
        author: this.bookAuthor,
      };

      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.downloadURL$ = this.uploadService.uploadFile(this.selectedFile, bookData, user.uid);
        }
      });
    }
  }
}
