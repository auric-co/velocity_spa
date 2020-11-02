import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from './api.service';

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

  isLoggedIn(): void {
    this.user = localStorage.getItem('user');
    if (this.user){
      this.router.navigate(['/dashboard']);
    }
  }

  async logout(): Promise<any> {
    await this.api.csrf();

    this.user = null;
    localStorage.removeItem('user');
    return this.http
      .post('/api/v2/spa/logout', {})
      .toPromise()
      .then((res) => {
        this.router.navigate(['/login']);
        return res;
      })
      .catch((err) => {
        console.log(err);
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
