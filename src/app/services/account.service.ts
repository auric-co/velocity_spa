import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private api: ApiService) {}

  async change_password(
    password: string,
    newpassword: string,
    confirmpassword: string,
  ): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/profile/change-password',
        {
          password,
          newpassword,
          newpassword_confirmation: confirmpassword,
        }
      )
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async details(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/profile/details')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async update_profile(
    name: string,
    surname: string,
    dob: string,
    height: string,
    weight: string,
    addressline1: string,
    addressline2: string,
  ): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/profile/update',
        {
          name,
          surname,
          dob,
          height,
          weight,
          address_line_1 : addressline1,
          address_line_2 : addressline2,
        })
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async upload_profile(
    file: File,
  ): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/profile/upload',
        {
          photo: file
        })
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}