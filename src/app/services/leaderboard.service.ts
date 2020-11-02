import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private handleError: any;

  constructor(private http: HttpClient, private api: ApiService) {}

  async top_ten(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/leaderboard')
      .pipe(
        map((response: Response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  async all(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/user/profile/leaderboard/all')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
