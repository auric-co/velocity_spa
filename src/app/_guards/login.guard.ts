import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {SnotifyService} from 'ng-snotify';
import {ApiService} from '../services/api.service';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private snotifyService: SnotifyService, private auth: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    this.auth.isLoggedIn().then((res) => {
      res.subscribe((data) => {
        if (data.success){
          localStorage.setItem('user', data.user);
          this.snotifyService.success('Session still active', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
          this.router.navigate(['/dashboard']);
          return false;
        }else {
          return true;
        }
      });
    }).catch((e) => {
      console.log(e);
      return true;
    });
    return true;
  }

}
