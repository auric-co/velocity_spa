import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const act = JSON.parse(localStorage.getItem('registration'));
    if (act === null){
      return true;
    }else{
      if (!act.complete){
        return true;
      }
    }

    this.router.navigate(['/activate'])
      .catch((error) => console.log(error));
    return false;
  }

}
