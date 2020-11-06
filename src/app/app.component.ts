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

  constructor(private snotifyService: SnotifyService, auth: AuthService){

  }
}
