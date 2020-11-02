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
  appointment: AppointmentRequest[];
  constructor(private api: CounsellingService, private fb: FormBuilder, private router: Router,
              private snotifyService: SnotifyService) { }


  ngOnInit(): void {
    this.api.requests().then((res) => {
      if (res.success){
        this.appointment = res.appointments;
      }
    }).catch((e) => {
      console.log(e);
    });
  }


  reload(): any{
    this.api.requests().then((res) => {
      if (res.success){
        this.appointment = res.appointments;
      }
    }).catch((e) => {
      console.log(e);
    });
  }

}
