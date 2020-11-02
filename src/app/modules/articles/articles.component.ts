import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Article} from '../../interfaces/article';
import {WellnessDimensions} from '../../interfaces/wellness-dimensions.metadata';
import {WD} from '../dashboard/wellness-dimensions-items';
import {ArticlesService} from '../../services/articles.service';
import {SnotifyService} from 'ng-snotify';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  public wd: WellnessDimensions[] = [];
  cat: number;
  public temp: Article[];
  public articles: Article[];
  constructor(private route: ActivatedRoute, private art: ArticlesService,  private snotifyService: SnotifyService) { }

  ngOnInit(): void {
    this.articles = [];
    this.wd = WD.filter(wd => WD);
    this.route.params.subscribe((params) => {
      this.cat = Number(params.id);
    });

    this.art.article_by_cat(this.cat).then((res) => {
      this.temp = res.articles;

      if (this.temp !== null){
        this.temp.forEach(element => {
          if (element.category_id === this.cat){
            this.articles.push(element);
          }
        });
      }
    }).catch((e) => {

    });

  }


  reload(): any{
    this.art.articleall().then((res) => {
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
        this.snotifyService.success('Articles refreshed successful', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });

        this.temp = res.articles;
        if (this.temp !== null){
          this.temp.forEach(element => {
            if (element.category_id === this.cat){
              this.articles.push(element);
            }
          });
        }
      }
    }).catch((e) => {
      this.snotifyService.error('Something went wrong. Please contact admin');
    });
  }
}
