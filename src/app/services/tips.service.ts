import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
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

  async get_tip(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/user/tips', {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
