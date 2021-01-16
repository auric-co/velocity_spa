import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
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
}
