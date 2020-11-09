import { Component } from '@angular/core';
import {SnotifyService} from 'ng-snotify';
import {AuthService} from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Velocity Wellness';
  offline: boolean;

  onNetworkStatusChange(): any {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
  }
  constructor(private snotifyService: SnotifyService, auth: AuthService){

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }
}
