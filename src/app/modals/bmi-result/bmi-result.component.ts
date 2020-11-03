import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-bmi-result',
  templateUrl: './bmi-result.component.html',
  styleUrls: ['./bmi-result.component.scss']
})
export class BmiResultComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BmiResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
// prefered BMI for height
  result: any;
  minWeight: any;
  maxWeight: any;
  bmiresponses = [
    'Underweight',
    'Normal or Healthy Weight',
    'Overweight',
    'Obese'
  ];

  static heightSquared(height: number): number{
    return Math.pow((height / 100), 2);
  }

  static calculateMinNormalWeight(height: number): any{
    return 18.5 * BmiResultComponent.heightSquared(height); // minimum weight for height
  }
  static calculateMaxNormalWeight(height: number): any{
    return 25 * BmiResultComponent.heightSquared(height); // maximum weight for height
  }

  tryAgain(): void {
    this.dialogRef.close({
      result: null
    });
  }

  ngOnInit(): void {
    this.minWeight = Math.round(BmiResultComponent.calculateMinNormalWeight(this.data.result));
    this.maxWeight = Math.round(BmiResultComponent.calculateMaxNormalWeight(this.data.result));
  }

  getResponse(bmi: number): number {
    if (bmi < 18.5) {
      return 0;
    } else if (bmi >= 18.5 && bmi < 25) {
      return 1;
    } else if (bmi >= 25 && bmi < 30) {
      return 2;
    } else {
      return 3;
    }
  }



}
