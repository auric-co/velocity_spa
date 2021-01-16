import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private httpOptions: { headers: HttpHeaders };

  constructor() {
    const token = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + token
      })
    };
  }
}
