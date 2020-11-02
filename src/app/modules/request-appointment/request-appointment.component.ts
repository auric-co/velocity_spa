import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder,  FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {RequestAppointmentErrors} from '../../interfaces/request-appointment-errors';
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {CounsellingService} from '../../services/counselling.service';

export interface Platform {
  id: any;
  title: string;
}

export interface CounsellingCategory {
  id: any;
  title: string;
}

const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.scss'],
})
export class RequestAppointmentComponent implements OnInit {
  @ViewChild('picker') picker: any;
  min: Date = new Date();
  max: Date = new Date(2007, 11, 31);
  startAt: Date = new Date(1987, 0, 1);
  startView = 'multi-year';

  selectedValue: string;
  requestForm: FormGroup;
  errors: RequestAppointmentErrors = {
    date: '',
    time: '',
    contact: '',
    platform: '',
    category: '',
    other: '',
  };

  platforms: Platform[] = [
    {id: 1, title: 'Call'},
    {id: 2, title: 'Google Meet'},
    {id: 3, title: 'Zoom'}
  ];

  categories: CounsellingCategory[] = [
    {id: 1, title: 'Covid-19'},
    {id: 2, title: 'Stress'},
    {id: 3, title: 'Marriage'}
  ];

  constructor(private router: Router, private snotifyService: SnotifyService,
              private user: CounsellingService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      platform: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      date: [moment(), Validators.compose([Validators.required])],
      time: ['', Validators.compose([Validators.required])],
      contact: [ '', Validators.compose([Validators.required])],
      other: ['', ]
    });
  }

  get platform(): any{return this.requestForm.get('platform'); }
  get category(): any{return this.requestForm.get('category'); }
  get date(): any{return this.requestForm.get('date'); }
  get time(): any{return this.requestForm.get('time'); }
  get contact(): any{return this.requestForm.get('contact'); }
  get other(): any{return this.requestForm.get('other'); }

  get_category_error(): any{
    if (this.category.hasError('required')) {
      return 'Category is required';
    }
  }
  get_platform_error(): any{
    if (this.platform.hasError('required')) {
      return 'Platform is required';
    }
  }
  get_date_error(): any{
    if (this.date.hasError('required')) {
      return 'Date is required';
    }
  }
  get_time_error(): any{
    if (this.time.hasError('required')) {
      return 'Time is required';
    }
  }

  get_contact_error(): any{
    if (this.contact.hasError('required')) {
      return 'Contact is required';
    }
  }
  get_other_error(): any{
    if (this.other.hasError('required')) {
      return 'Other category field is required';
    }
  }


  submit(): any{
    this.user.request_counselling(this.requestForm.value.category,
      this.requestForm.value.platform, this.requestForm.value.date, this.requestForm.value.time,
      this.requestForm.value.contact,  this.requestForm.value.other)
      .then((res) => {

        if (res.success){
          this.snotifyService.success(res.message, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
          this.router.navigate(['/dashboard/counselling']);
        }

        if (res.status === 422){
          this.errors = res.error.error.message;
        }

        if (res.status === 401){
          this.snotifyService.error(res.error.error.message, {
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
      this.snotifyService.error('Fatal Error. Please contact admin');
    });
  }

}
