import { Component, OnInit } from '@angular/core';
import {WellnessDimensions} from '../../interfaces/wellness-dimensions.metadata';
import {WD} from './wellness-dimensions-items';
import {LeaderboardService} from '../../services/leaderboard.service';
import {ApiService} from '../../services/api.service';
import {Leaderboard} from '../../interfaces/leaderboard';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private ld: LeaderboardService, private api: ApiService, private snotifyService: SnotifyService) {}
  public wd: WellnessDimensions[] = [];
  public leaderboard: Leaderboard[] = [];

  indianStates = [
    {value: 'westbengal', viewValue: 'West Bengal'},
    {value: 'sikkim', viewValue: 'Sikkim'},
    {value: 'assam', viewValue: 'Assam'}
  ];

  sortedLeaderboard: Leaderboard[] = [];
  ngOnInit(): void {
    this.sortedLeaderboard = this.leaderboard.sort((a, b) => {
      if (a.points < b.points) { return -1; }
      if (a.points > b.points) { return 1; }
    });

    this.wd = WD.filter(wd => WD);

    this.ld.top_ten().then((res) => {
      if (res.success){
        this.leaderboard = res.leaderboard;
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  reload(): void{
    this.ld.top_ten().then((res) => {
      if (res.status === 422) {
        this.snotifyService.error('System error. Please contact Admin');
      }

      if (res.status === 0 || res.status === 404) {
        this.snotifyService.error('Failed to connect to service. Please contact admin if problem persist');
      }

      if (res.status === 401){
        this.snotifyService.error(res.error.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }

      if (res.status === 419){
        this.snotifyService.error('System error. CORS. Please contact Admin');
      }

      if (res.status === 500){
        this.snotifyService.error('System error. Cannot connect to service. Please contact admin');
      }

      if (res.success){
        this.snotifyService.success('Leaderboard refresh successful', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        // create state
        this.leaderboard = res.leaderboard;
      }

    })
      .catch((error) => {
        console.log(error);
        this.snotifyService.error('Something went wrong. Please contact admin');
      });

  }

}
