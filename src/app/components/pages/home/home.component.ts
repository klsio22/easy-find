import { Component, ElementRef, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  selectedFile: File | null = null;
  downloadURL$: Observable<string> | null = null;
  isLoading: boolean = false;
  files$: Observable<any> | null = null;
  selectedFileUrl: string | null = null;
  private adobeDCView: any;

  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.files$ = this.uploadService.getFiles(user.uid);
        console.log(this.files$);
      }
    });

    this.initAdobeDCView();
  }

  ngAfterViewInit(): void {
    this.initAdobeDCView();
  }

  private initAdobeDCView(): void {
    const script = document.createElement('script');
    script.src = 'https://acrobatservices.adobe.com/view-sdk/viewer.js';
    document.body.prepend(script);

    script.onload = () => {
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        this.adobeDCView = new (window as any).AdobeDC.View({
          clientId: '0a7691ebc5a14abbadd6bbb8a897fb4f',
          divId: 'adobe-dc-view',
        });

        this.previewFile('https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf');
        /* if (this.selectedFileUrl) {
        } */
      });
    };
  }

  private previewFile(url: string): void {
    this.adobeDCView.previewFile(
      {
        content: {
          location: {
            url: url,
          },
        },
        metaData: {
          fileName: 'Uploaded PDF',
        },
      },
      {
        embedMode: 'SIZED_CONTAINER',
      },
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
            this.previewFile(url);
          });
        }
      });
    }
  }

  viewPDF(url: string) {
    this.selectedFileUrl = url;
    this.previewFile(url);
  }
}
