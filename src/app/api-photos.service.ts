import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiPhotosService {
  private apiUrl = 'https://picsum.photos/v2/list';


  constructor(private http: HttpClient) { }

  getPhotos(page: number): Observable<ImageI[]> {
    return this.http.get<ImageI[]>(this.apiUrl, { params: { page: page, limit: 9 } }).pipe(catchError((error) => {
      return of([]);
    }));
  }


}

export interface ImageI {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}
