import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatPdfService } from '../../../services/chat-pdf.service';
import { BookData, FileService } from '../../../services/file.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SpinnerComponent],
  providers: [],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  downloadURL$: Observable<string> | null = null;
  books$: Observable<BookData[]> | null = null;
  FileUrl: SafeResourceUrl | null = null;
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  isLoadingBooks: boolean = false;
  isLoadingChat: boolean = false;
  sourceId: string = '';
  chatResponse: string = '';
  question: string = '';
  bookUrlSector: string = '';
  showSuccessMessage: boolean = false;
  showRemoveSuccessMessage: boolean = false;

  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private chatPdfService: ChatPdfService,
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.books$ = this.fileService.getFiles(user.uid);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.showSuccessMessage = false;
      this.showRemoveSuccessMessage = false;
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.isLoadingBooks = true;
      this.authService.getCurrentUser().subscribe((user) => {
        if (user) {
          this.downloadURL$ = this.fileService.uploadFile(
            this.selectedFile as File,
            user.uid,
          );
          this.downloadURL$.subscribe((url) => {
            this.isLoadingBooks = false;
            this.selectedFileUrl = url;
            this.fileService.addFileData(user.uid, {
              FileName: this.selectedFile?.name ?? '',
              FileUrl: url,
            });
            this.showSuccessMessage = true;
            this.showRemoveSuccessMessage = false;
          });
        }
      });
    }
  }

  removeFile(file: BookData) {
    this.isLoadingBooks = true;
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.fileService
          .removeFileData(user.uid, file.FileName)
          .then(() => {
            this.isLoadingBooks = false;
            this.books$ = this.fileService.getFiles(user.uid);
            this.showSuccessMessage = false;
            this.showRemoveSuccessMessage = true;
          })
          .catch((error) => {
            console.error('Error removing file:', error);
          });
      }
    });
  }

  viewPDF(fileUrl: string) {
    this.FileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    this.bookUrlSector = fileUrl;
    this.showSuccessMessage = false;
    this.showRemoveSuccessMessage = false;
  }

  askQuestion() {
    const messages = [{ role: 'user', content: this.question }];
    this.isLoadingChat = true;
    this.chatPdfService.addPdfByUrl(this.bookUrlSector).subscribe({
      next: (response) => {
        this.sourceId = response.sourceId;
        this.chatPdfService
          .chatWithPdf(this.sourceId, messages, true, false)
          .subscribe({
            next: (response) => {
              this.isLoadingChat = false;
              this.chatResponse = response.content;
            },
            error: (error) => {
              this.isLoadingChat = false;
              console.error('Erro ao fazer pergunta:', error);
            },
          });
      },
      error: (error) => {
        this.isLoadingChat = false;
        console.error('Erro ao adicionar PDF:', error);
      },
    });
  }
}
