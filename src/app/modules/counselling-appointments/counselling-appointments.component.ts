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
  constructor(private route: ActivatedRoute, private api: CounsellingService,  private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.api.appointments().then((res) => {
      if (res.success){
        this.appointments = res.appointments;
      }
    }).then((e) => {
      console.log(e);
    });

  }

}
