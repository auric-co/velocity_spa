import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BmiResultComponent} from '../../modals/bmi-result/bmi-result.component';
import {BmiService} from '../../services/bmi.service';
import {SnotifyService} from 'ng-snotify';
import {BmiUpdateErrors} from '../../interfaces/bmi-update-errors';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.scss']
})
export class BmiCalculatorComponent implements OnInit {

  constructor(public dialog: MatDialog, private bmi: BmiService, private router: Router, private fb: FormBuilder,
              private api: ApiService,  private snotifyService: SnotifyService){}

  errors: BmiUpdateErrors = {
    bmi: '',
    weight: '',
    height: '',
  };

  weight: number;

  height: number;

  result: number;

  type: ({ id: number; title: string, formula: string })[] = [{
    id: 1,
    title: 'Metric',
    formula: 'Weight(kg)/[Height(m)* Height(m)]'
  }, {
    id: 2,
    title: 'Imperial',
    formula: '[703 * Weight(convert kg to lbs)]/[Height(in)*Height(in)]'
  }];

  static heightSquared(height: number): number{
    return Math.pow((height / 100), 2);
  }


  ngOnInit(): void {
    this.height = 50;
    this.weight = 30;
  }

  weightVal(event: any): any {
    this.weight = event.value;
  }

  heightVal(event: any): any {
    this.height = event.value;
  }

  openDialog(): void {
    this.result = this.calculateMetric().toFixed(1) as unknown as number;
    const dialogRef = this.dialog.open(BmiResultComponent, {
      width: '80%',
      height: '95%',
      data: {height: this.height, weight: this.weight, result: this.result}
    });

    dialogRef.afterClosed().subscribe(async data => {

      console.log('The dialog was closed', data);
      if (data.result !== null){
        await this.bmi.update(Number(data.result), Number(data.weight), Number(data.height))
          .then((res) => {
            console.log(res);
            if (res.success){
              this.snotifyService.success('Update Successful', {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true
              });

              localStorage.setItem('user', JSON.stringify(res.user));
            }

            if (res.status === 422){
              if (res.error.error.message.bmi){
                this.snotifyService.error(res.error.error.message.bmi[0], {
                  timeout: 2000,
                  showProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true
                });
              }

              if (res.error.error.message.height){
                this.snotifyService.error(res.error.error.message.height[0], {
                  timeout: 2000,
                  showProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true
                });
              }

              if (res.error.error.message.weight){
                this.snotifyService.error(res.error.error.message.weight[0], {
                  timeout: 2000,
                  showProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true
                });
              }

            }

            if (res.status === 401){
              this.snotifyService.error(res.error.error.message ? res.error.error.message : res.error.message, {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
            }

            if (res.status === 500){
              this.snotifyService.error('System error. Cannot connect to service. Please contact admin');
            }

          }).catch((e) => {
            console.log(e);
            this.snotifyService.error('Something went wrong. Please contact admin');
          });
      }
    });
  }

  calculateImperial(): number {
    return this.result = ((this.weight * 703) / BmiCalculatorComponent.heightSquared(this.height));
  }

  calculateMetric(): number {
    return (this.weight / BmiCalculatorComponent.heightSquared(this.height));
  }


}
