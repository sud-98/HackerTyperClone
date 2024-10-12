import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(private http: HttpClient) { }

  getFileContents(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }

}
