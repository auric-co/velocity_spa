import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient, private api: ApiService) {

  }

  async articlecategories(): Promise<any> {
    await this.api.csrf();
    return this.http
      .get('/api/v2/spa/articles/categories')
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  async article_by_cat(cat: number): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/articles/by/category/' + cat)
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async article_by_id(id: number): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/articles/' + id + '/details')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async articleall(): Promise<any> {
    await this.api.csrf();

    return this.http
      .get('/api/v2/spa/articles/all')
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
