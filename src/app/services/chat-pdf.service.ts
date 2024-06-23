import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatPdfService {
  private apiUrl = 'https://api.chatpdf.com/v1';
  private apiKey = 'sec_oYULtYsjgBIdI5J5rwecqHC42WkjPN60';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    console.error('Status:', error.status);
    console.error('Message:', error.message);
    console.error('Error:', error.error);
    console.error('Full response:', error.error.text);
    return throwError(
      () => new Error(`Error processing request: ${error.message}`),
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    });
  }

  addPdfByUrl(url: string): Observable<any> {
    const endpoint = `${this.apiUrl}/sources/add-url`;
    return this.http
      .post(endpoint, { url }, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  addPdfByFile(file: File): Observable<any> {
    const endpoint = `${this.apiUrl}/sources/add-file`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey,
    });
    return this.http.post(endpoint, formData, { headers });
  }

  chatWithPdf(
    sourceId: string,
    messages: { role: string; content: string }[],
    referenceSources: boolean = false,
    stream: boolean = false,
  ): Observable<any> {
    const body = {
      sourceId,
      messages,
      referenceSources,
      stream,
    };
    const endpoint = `${this.apiUrl}/chats/message`;
    return this.http
      .post(endpoint, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }
}
