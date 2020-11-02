import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BmiService {

  constructor(private http: HttpClient, private api: ApiService) {

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
}
