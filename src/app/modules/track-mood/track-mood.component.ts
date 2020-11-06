import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MoodLogErrors} from '../../interfaces/mood-log-errors';
import {MoodService} from '../../services/mood.service';

export interface Sentiments {
  id: any;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-track-mood',
  templateUrl: './track-mood.component.html',
  styleUrls: ['./track-mood.component.scss']
})
export class TrackMoodComponent implements OnInit {

  errors: MoodLogErrors = {
    date: '',
    sentiment: '',
    comment: '',
  };

  constructor(private router: Router, private snotifyService: SnotifyService, private api: MoodService,
              private auth: AuthService, private fb: FormBuilder, private deviceService: DeviceDetectorService) {}

  moodForm: FormGroup;

  sentiments: Sentiments[] = [
    {id: 'veryUnhappy', title: 'Very Unhappy', icon: 'sentiment_very_dissatisfied'},
    {id: 'unhappy', title: 'Unhappy', icon: 'sentiment_dissatisfied'},
    {id: 'neutral', title: 'Neutral', icon: 'sentiment_neutral'},
    {id: 'happy', title: 'Happy', icon: 'sentiment_satisfied_alt'},
    {id: 'very happy', title: 'Very Happy', icon: 'sentiment_very_satisfied'}
  ];

  ngOnInit(): void {
    this.moodForm = this.fb.group({
      comment: [ '', ],
      sentiment: [ '', Validators.compose([Validators.required])],
    });
  }

  get_icon(sentiment: string): any{
    this.sentiments.forEach(element => {
      if (element.id === sentiment){
        return element.icon;
      }
    });
  }

  get_sentiment_title(sentiment: string): any{
    this.sentiments.forEach(element => {
      if (element.id === sentiment){
        return element.title;
      }
    });
  }

  get comment(): any{return this.moodForm.get('comment'); }
  get sentiment(): any{return this.moodForm.get('sentiment'); }

  get_sentiment_error(): any{
    if (this.sentiment.hasError('required')) {
      return 'How are you feeling?';
    }
  }
  get_comment_error(): any{
    if (this.comment.hasError('required')) {
      return 'Comment is required';
    }
  }


  submit(): any{
    this.api.save_mood(new Date() as unknown as string, this.moodForm.value.sentiment, this.moodForm.value.comment)
      .then((res) => {
      if (res.success){
        this.snotifyService.success(res.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        this.router.navigate(['/dashboard/my-mood']);
      }

      if (res.status === 422){
        this.errors = res.error.error.message;
      }

      if (res.status === 401){
        this.snotifyService.error('Session expired. Please log in again', {
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
    }).catch((e) => {
      console.log(e);
    });
  }
}
