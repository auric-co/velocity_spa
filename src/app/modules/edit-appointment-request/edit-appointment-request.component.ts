import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CounsellingService} from '../../services/counselling.service';
import {AppointmentRequest} from '../../interfaces/appointment-request';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestAppointmentErrors} from '../../interfaces/request-appointment-errors';
import {SnotifyService} from 'ng-snotify';
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment} from 'moment';

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
  selector: 'app-edit-appointment-request',
  templateUrl: './edit-appointment-request.component.html',
  styleUrls: ['./edit-appointment-request.component.scss']
})
export class EditAppointmentRequestComponent implements OnInit {
  id: number;
  requests: AppointmentRequest[];
  request: AppointmentRequest;
  requestForm: FormGroup;
  errors: RequestAppointmentErrors = {
    date: '',
    time: '',
    contact: '',
    platform: '',
    category: '',
    other: '',
  };

  cat: number;

  platforms: Platform[];

  categories: CounsellingCategory[];
  constructor(private route: ActivatedRoute, private api: CounsellingService,
              private router: Router, private snotifyService: SnotifyService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.requests = [];
    this.route.params.subscribe((params) => {
      this.id = Number(params.id);
    });

    if (this.id !== null) {
      this.api.requests().then((res) => {
        res.subscribe((data) => {
          if (data.success){
            this.requests = data.requests;
            if (this.requests.length !== 0){
              this.requests.forEach(element => {
                if (element.id === this.id){
                  this.request = element;
                }
              });
            }
          }
        });

      }).catch((e) => {
        console.log(e);
      });

    }

    this.platforms = [];
    this.api.platforms().then((res) => {
      res.subscribe((data) => {
        this.platforms = data;
      });
    }).catch((e) => console.log(e));
    this.categories = [];
    this.api.categories().then((res) => {
      res.subscribe((data) => {
        this.categories = data;
      });
    }).catch((e) => console.log(e));

    this.requestForm = this.fb.group({
      platform: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      date: [this.request.date, Validators.compose([Validators.required])],
      time: [this.request.time, Validators.compose([Validators.required])],
      contact: [ this.request.contact, Validators.compose([Validators.required])],
      other: [this.request.other_category_details,  Validators.compose([Validators.minLength(5), Validators.maxLength(100)])]
    });
    this.requestForm.get('category').valueChanges.subscribe((value) => {
      console.log(value);
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

  selectChangeHandler(event: any): any {
    // update the ui
    this.cat = event.value;
  }

  submit(): any{
    this.api.request_counselling(this.requestForm.value.category,
      this.requestForm.value.platform, this.requestForm.value.date, this.requestForm.value.time,
      this.requestForm.value.contact,  this.requestForm.value.other)
      .then((res) => {
        console.log(res);
        if (res.success){
          this.snotifyService.success(res.message, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
          this.router.navigate(['/dashboard/counselling/requests']);
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

        if (res.status === 403){
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
