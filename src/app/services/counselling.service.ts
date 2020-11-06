import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CounsellingService {
  private handleError: any;
  constructor(private http: HttpClient, private api: ApiService) {

  }

  async categories(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get(
        '/api/v2/spa/counselling/categories')
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  async  platforms(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get(
        '/api/v2/spa/counselling/platforms')
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
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

  async appointments(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/counselling/appointments')
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  async requests(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/counselling/requests')
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

}
