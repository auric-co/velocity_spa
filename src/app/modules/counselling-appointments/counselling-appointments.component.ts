import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {CounsellingService} from '../../services/counselling.service';
import {Appointments} from '../../interfaces/appointments';

@Component({
  selector: 'app-counselling-appointments',
  templateUrl: './counselling-appointments.component.html',
  styleUrls: ['./counselling-appointments.component.scss']
})
export class CounsellingAppointmentsComponent implements OnInit {

  appointments: Appointments[];
  private headers: any;
  constructor(private route: ActivatedRoute, private api: CounsellingService,  private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.api.appointments().then((res) => {
     res.subscribe((data) => {
       console.log(data);
       const keys = data.headers.keys();
       this.headers = keys.map(key =>
         `${key}: ${data.headers.get(key)}`);

       this.appointments = data.appointments;
       console.log(this.headers);
     });
    }).then((e) => {
      console.log(e);
    });

  }

  get_appointments(): any{
    this.api.appointments().then((res) => {
      res.subscribe((data) => {
        console.log(data);
        const keys = data.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${data.headers.get(key)}`);

        this.appointments = data.appointments;
        console.log(this.headers);
      });
    }).catch((e) => {
      console.log(e);
    });
  }

}
