import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {MoodService} from '../../services/mood.service';
import {Usermood} from '../../interfaces/usermood';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {
  private moods: Usermood[] ;

  constructor(private route: ActivatedRoute, private md: MoodService,  private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.md.moods().then((res) => {
      res.subscribe((data) => this.moods = data);
    }).catch((e) => console.log(e));
  }

  reload(): any{
    this.md.moods().then((res) => {
      res.subscribe((data) => this.moods = data);
    }).catch((e) => console.log(e));
  }

}
