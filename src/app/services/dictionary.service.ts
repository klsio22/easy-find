import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private apiUrl = 'http://dicionario-aberto.net/search-json/';

  constructor(private http: HttpClient) {}

  searchWord(word: string): Observable<any> {
    const url = `${this.apiUrl}${word}`;
    return this.http.get(url);
  }
}
