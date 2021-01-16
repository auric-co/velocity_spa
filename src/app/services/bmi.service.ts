import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BmiService {
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

  async update(
    bmi: number, weight: number, height: number,
  ): Promise<any>{
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/profile/bmi/update',
        {
           bmi, weight, height
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
}
