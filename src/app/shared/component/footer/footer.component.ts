import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private _year = formatDate(new Date(), 'yyyy', 'en');
  public get year() {
    return this._year;
  }
  public set year(value) {
    this._year = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
