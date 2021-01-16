import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
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
        }, {headers: this.httpOptions.headers}
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

    return this.http.get('/api/v2/spa/track-mood/all', {headers: this.httpOptions.headers})
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
