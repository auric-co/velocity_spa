import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../interfaces/article';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-article-read',
  templateUrl: './article-read.component.html',
  styleUrls: ['./article-read.component.scss']
})
export class ArticleReadComponent implements OnInit {
  private id: number;
  article: Article;
  constructor(private route: ActivatedRoute, private art: ArticlesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params.id);
    });

    if (this.id !== null){
      this.art.article_by_id(this.id).then((res) => {
        res.subscribe((data) => {
          if (data.success){
            this.article = data.article;
          }
        });

      }).catch((e) => {
        console.log(e);
      });
    }

  }

}
