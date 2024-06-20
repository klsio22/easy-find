// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Observable } from 'rxjs';
import { UploadService } from '../../../services/upload.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { PreviewPdfService } from '../../../services/preview-pdf.service';
import { BookData } from '../../../services/upload.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  providers: [PreviewPdfService],
})
export class HomeComponent implements OnInit {
  selectedFile: File | null = null;
  downloadURL$: Observable<string> | null = null;
  isLoading: boolean = false;
  books$: Observable<BookData[]> | null = null;
  selectedFileUrl: string | null = null;
  convertedFileUrl: string | null = null;

  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private previewPdfService: PreviewPdfService,
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.books$ = this.uploadService.getFiles(user.uid);
        console.log(this.books$);
      }
    });
  }

  ngAfterViewInit(): void {
    this.previewPdfService.initAdobeDCView(
      '0a7691ebc5a14abbadd6bbb8a897fb4f',
      'adobe-dc-view',
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.isLoading = true;
      this.authService.getCurrentUser().subscribe((user) => {
        if (user) {
          this.downloadURL$ = this.uploadService.uploadFile(
            this.selectedFile as File,
            user.uid,
          );
          this.downloadURL$.subscribe((url) => {
            this.isLoading = false;
            this.selectedFileUrl = url;
            this.uploadService.addFileData(user.uid, {
              fileName: this.selectedFile?.name,
              fileUrl: url,
            });
          });
        }
      });
    }
  }

  viewPDF(url: string) {
    this.previewPdfService.previewPdf(url, 'Uploaded PDF');
  }
}
