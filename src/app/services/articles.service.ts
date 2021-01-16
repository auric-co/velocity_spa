import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private handleError: any;
  private httpOptions: { headers: HttpHeaders };
  constructor(private http: HttpClient, private api: ApiService) {
    const token = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };
  }

  async articlecategories(): Promise<Observable<any>> {
    await this.api.csrf();
    return this.http
      .get('/api/v2/spa/articles/categories', {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  async article_by_cat(cat: number): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/articles/by/category/' + cat, {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  async article_by_id(id: number): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/articles/' + id + '/details', {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  async articleall(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/articles/all', {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }
}
