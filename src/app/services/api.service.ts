import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Cookie from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public csrf(): any{
    const token = Cookie.get('XSRF-TOKEN');

    if (token) {
      return new Promise(resolve => {
        resolve(token);
      });
    }

    return this.http
      .get('/sanctum/csrf-cookie').toPromise().then((res) => {

      }).catch((e) => {

      });
  }
}
