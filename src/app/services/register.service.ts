import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient, private  api: ApiService) { }

  async register_company(
    company: number,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/company/register',
        {
          email,
          company,
          password,
          password_confirmation: confirmPassword,
        }
      ).toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async register_individual(
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/public/register',
        {email, password, password_confirmation: confirmPassword})
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async companies(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/company')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async request_activation_code(email: string): Promise<any> {
    await this.api.csrf();

    return this.http.post('/api/v2/spa/activation/code', {email})
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async activate(email: string, code: string): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/activate',
        {code, email})
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
