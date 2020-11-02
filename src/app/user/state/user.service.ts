import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UserStore } from './user.store';
import { UserQuery } from './user.query';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {SnotifyService} from 'ng-snotify';
import {AccountService} from '../../services/account.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore, private userQuery: UserQuery, private snotifyService: SnotifyService,
              private http: HttpClient, private api: ApiService, private usr: AccountService) {
  }

  async get(): Promise<Observable<any>> {
    await this.api.csrf();

    return this.http.get<User>('/v2/spa/profile/details').pipe(tap(entities => {
      console.log(entities);
      this.userStore.set(entities);
    }));
  }

  getUser(): any{
    return this.userQuery.selectFirst();
  }

  add(user: User): void {
    this.userStore.add(user);
  }

  async update(user: Partial<User>): Promise<any> {
    await this.api.csrf();
    this.userStore.setLoading(true);
    return this.usr.update_profile(user.name,
      user.surname,
      user.dob,
      user.height,
      user.weight,
      user.address_line_1,
      user.address_line_2).then((res) => {
        if (res.success){
          this.snotifyService.success('Profile Updated Successfully', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
          // create state
          localStorage.setItem('user', JSON.stringify(res.user));
          this.userStore.update(res.user);
        }

        if (res.status === 422){
          this.userStore.setError(res.error.error.message);
          console.log(res);
          this.snotifyService.error('Validation error. Required information not submitted');
        }

        if (res.status === 304){
          this.snotifyService.success('Profile not modified. Submitted information basically the same', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        }

        if (res.status === 401){
          this.userStore.setError(res.error.error.message);
          this.snotifyService.error(res.error.error.message, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
          });
        }

        if (res.status === 419){
          this.userStore.setError('CORS');
          this.snotifyService.error('System error. CORS. Please contact Admin');
        }

        if (res.status === 500){
          this.userStore.setError('Server error');
          this.snotifyService.error('System error. Cannot connect to service. Please contact admin');
        }
        this.userStore.setLoading(false);
    }).catch((e) => {
      console.log(e);
      this.userStore.setError(e);
      this.snotifyService.error('Something went wrong. Please contact admin');
      this.userStore.setLoading(false);
    });
  }

  remove(id: ID): void {
    this.userStore.remove(id);
  }
}
