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

  ngOnInit(): void {
    this.ld.top_ten().then((res) => {
      res.subscribe((data) => {
        this.leaderboard = data.leaderboard.sort((a, b) => {
          if (a.points < b.points) { return 1; }
          if (a.points > b.points) { return -1; }
        });
      });
    }).catch((e) => {
      console.log(e);
    });

    this.wd = WD.filter(wd => WD);
  }

  reload(): void{
    this.ld.top_ten().then((res) => {
      res.subscribe((data) => {
        this.leaderboard = data.leaderboard.sort((a, b) => {
          if (a.points < b.points) { return -1; }
          if (a.points > b.points) { return 1; }
        });
      });
    })
      .catch((error) => {
        console.log(error);
        this.snotifyService.error('Something went wrong. Please contact admin');
      });

  }

}
