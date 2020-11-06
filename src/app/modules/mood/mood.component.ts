import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {MoodService} from '../../services/mood.service';
import {Usermood} from '../../interfaces/usermood';
import {Sentiments} from '../track-mood/track-mood.component';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {
  public moods: Usermood[] ;

  private sentimentsDetails: Sentiments[] = [
    {id: 'veryUnhappy', title: 'Very Unhappy', icon: 'sentiment_very_dissatisfied'},
    {id: 'unhappy', title: 'Unhappy', icon: 'sentiment_dissatisfied'},
    {id: 'neutral', title: 'Neutral', icon: 'sentiment_neutral'},
    {id: 'happy', title: 'Happy', icon: 'sentiment_satisfied_alt'},
    {id: 'very happy', title: 'Very Happy', icon: 'sentiment_very_satisfied'}
  ];
  constructor(private route: ActivatedRoute, private md: MoodService,  private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.moods = [];
    this.md.moods().then((res) => {
      res.subscribe((data) => {
        this.moods = data;
      });
    }).catch((e) => console.log(e));
  }

  reload(): any{
    this.md.moods().then((res) => {
      res.subscribe((data) => {
        this.moods = data;
      });
    }).catch((e) => console.log(e));
  }

  get_icon(sentiment: string): string{
    let icon = '';
    this.sentimentsDetails.forEach(element => {
      if (element.id === sentiment){
        icon = element.icon;
      }
    });
    return icon;
  }

  get_sentiment_title(sentiment: string): string{
    let title = '';
    this.sentimentsDetails.forEach(element => {
      if (element.id === sentiment){
        title = element.title;
      }
    });
    return title;
  }
}
