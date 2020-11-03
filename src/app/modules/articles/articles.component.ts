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
      res.subscribe((data) => {
        this.temp = data.articles;

        if (this.temp !== null){
          this.temp.forEach(element => {
            if (element.category_id === this.cat){
              this.articles.push(element);
            }
          });
        }
      });
    }).catch((e) => {
      console.log(e);
    });

  }


  reload(): any{
    this.art.article_by_cat(this.cat).then((res) => {
      res.subscribe((data) => {
        this.temp = data.articles;

        if (this.temp !== null){
          this.temp.forEach(element => {
            if (element.category_id === this.cat){
              this.articles.push(element);
            }
          });
        }
      });
    }).catch((e) => {
      console.log(e);
      this.snotifyService.error('Something went wrong. Please contact admin');
    });
  }
}
