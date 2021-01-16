import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private user: string;
  private httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, private router: Router, private api: ApiService, private auth: AuthService) {
    const token = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };
  }

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
        }, {headers: this.httpOptions.headers}
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
      .get('/api/v2/spa/profile/details', {headers: this.httpOptions.headers})
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
        }, {headers: this.httpOptions.headers})
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  check_login(): void{
    this.auth.isLoggedIn().then((res) => {
      res.subscribe((data) => {
        if (data.success){
          this.user = localStorage.getItem('user');
        }else{
          this.user = null;
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        }
      });
    }).catch((e) => {
      console.log(e);
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
        }, {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
