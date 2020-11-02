import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CounsellingService {
  constructor(private http: HttpClient, private api: ApiService) {

  }

  async categories(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get(
        '/api/v2/spa/counselling/categories')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async request_counselling(category: string,
                            platform: string, date: string, time: string, contact: string, other?: string,
  ): Promise<any> {
    await this.api.csrf();
    return this.http
      .post(
        '/api/v2/spa/counselling/request/appointment',
        {category, platform, date, time, contact, other})
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async appointments(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/counselling/appointments')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async requests(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/counselling/requests')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

}
