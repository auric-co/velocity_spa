import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: string;
  constructor(private http: HttpClient, private router: Router, private api: ApiService) {}

  async authenticate(email: string, password: string, deviceName: string): Promise<any> {

    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/login',
        {email, password, device_name: deviceName}
      )
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async isLoggedIn(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http.get('/api/v2/spa/auth_check')
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  async logout(): Promise<any> {
    await this.api.csrf();

    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('leaderboard');
    localStorage.removeItem('token');
    return this.http
      .post('/api/v2/spa/logout', {})
      .toPromise()
      .then((res) => {
        this.router.navigate(['/login']);
        return res;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/login']);
        return err;
      });
  }

  async reset_password(email: string): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/forgot-password',
        {email},
      )
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
