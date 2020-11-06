import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  constructor(private http: HttpClient, private api: ApiService) {}

  async save_mood(date: string, sentiment: string,
                  comment: string,
  ): Promise<any> {
    await this.api.csrf();

    return this.http
      .post(
        '/api/v2/spa/track-mood/add',
        {
          date,
          sentiment,
          comment
        }
      )
      .toPromise()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }


  async moods(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http.get('/api/v2/spa/track-mood/all')
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
