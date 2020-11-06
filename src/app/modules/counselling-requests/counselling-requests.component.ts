import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {CounsellingService} from '../../services/counselling.service';
import {AppointmentRequest} from '../../interfaces/appointment-request';

@Component({
  selector: 'app-counselling-requests',
  templateUrl: './counselling-requests.component.html',
  styleUrls: ['./counselling-requests.component.scss']
})
export class CounsellingRequestsComponent implements OnInit {
  requests: AppointmentRequest[];
  constructor(private api: CounsellingService, private fb: FormBuilder, private router: Router,
              private snotifyService: SnotifyService) { }


  ngOnInit(): void {
    this.requests = [];
    this.api.requests().then((res) => {
      res.subscribe((data) => {
        if (data.requests !== null){
          this.requests = data.requests;
        }
      });
    }).catch((e) => {
      console.log(e);
    });
  }


  reload(): any{
    this.api.requests().then((res) => {
      res.subscribe((data) => {
        this.requests = data.requests;
      });
    }).catch((e) => {
      console.log(e);
    });
  }

}
