// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Observable } from 'rxjs';
import { UploadService, BookData } from '../../../services/upload.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatPdfService } from '../../../services/chat-pdf.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    SpinnerComponent,
  ],
  providers: [],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  selectedFile: File | null = null;
  downloadURL$: Observable<string> | null = null;
  isLoading: boolean = false;
  books$: Observable<BookData[]> | null = null;
  selectedFileUrl: string | null = null;
  FileUrl: SafeResourceUrl | null = null;
  sourceId: string = '';
  chatResponse: string = '';
  question: string = '';
  bookUrlSector: string = '';

  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private chatPdfService: ChatPdfService,
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.books$ = this.uploadService.getFiles(user.uid);
      }
    });
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
              FileName: this.selectedFile?.name ?? '',
              FileUrl: url,
            });
          });
        }
      });
    }
  }

  viewPDF(fileUrl: string) {
    this.FileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    this.bookUrlSector = fileUrl;
  }

  askQuestion() {
    const messages = [{ role: 'user', content: this.question }];
    this.chatPdfService.addPdfByUrl(this.bookUrlSector).subscribe({
      next: (response) => {
        this.sourceId = response.sourceId;
        console.log('PDF adicionado com Source ID:', this.sourceId);

        // Faça a chamada chatWithPdf apenas após a resposta bem-sucedida de addPdfByUrl
        this.chatPdfService
          .chatWithPdf(this.sourceId, messages, true, false)
          .subscribe({
            next: (response) => {
              this.chatResponse = response.content;
              console.log('Resposta da API:', this.chatResponse);
            },
            error: (error) => {
              console.error('Erro ao fazer pergunta:', error);
            },
          });
      },
      error: (error) => {
        console.error('Erro ao adicionar PDF:', error);
      },
    });
  }
}
