import { AuthService } from './authservice';
import { Injectable } from '@angular/core';
import { Letter } from '../letter';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class LetterService {
  private url = 'http://localhost:5000/api/';

  constructor(private http: HttpClient, private authService: AuthService) {
   }

  public getAll(sort?: string): Observable<Letter[]> {
    console.log('getAll(sort) = ' + sort);
    if (this.authService.canActivate()) {
      httpOptions.headers.append('Authorization', 'Bearer ' + window.localStorage.jwt);
    }

    return this.http.get<Letter[]>(this.url + 'letter/?sort=' + sort, httpOptions);
  }

  public get(id: number): Observable<Letter> {
    return this.http.get<Letter>(this.url + 'letter/' + id, httpOptions);
  }

  public post(hero: Letter): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'letter/', hero, httpOptions);
  }

  public put(id: number, hero: Letter): Observable<boolean> {
    return this.http.put<boolean>(this.url + 'letter/' + id, hero, httpOptions);
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + 'letter/' + id, httpOptions);
  }
}
