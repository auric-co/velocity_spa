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
  private headers: any;
  constructor(private api: CounsellingService, private fb: FormBuilder, private router: Router,
              private snotifyService: SnotifyService) { }


  ngOnInit(): void {
    this.api.requests().then((res) => {
      res.subscribe((data) => {
        this.requests = data.appointments;
        console.log(this.headers);
      });
    }).catch((e) => {
      console.log(e);
    });
  }


  reload(): any{
    this.api.requests().then((res) => {
      res.subscribe((data) => {
        this.requests = data.appointments;
        console.log(this.headers);
      });
    }).catch((e) => {
      console.log(e);
    });
  }

}
