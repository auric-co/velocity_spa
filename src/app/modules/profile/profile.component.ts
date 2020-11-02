import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

constructor(private user: AccountService, private fb: FormBuilder, private router: Router,
            private snotifyService: SnotifyService, private api: ApiService) { }
usr = JSON.parse(localStorage.getItem('user'));

ngOnInit(): void {
}
}
