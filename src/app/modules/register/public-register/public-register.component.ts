import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PublicRegErrors} from '../../../interfaces/public-reg-errors';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {RegisterService} from '../../../services/register.service';
import {ActivateState} from '../../../interfaces/activate-state';

@Component({
  selector: 'app-public-register',
  templateUrl: './public-register.component.html',
  styleUrls: ['./public-register.component.scss']
})
export class PublicRegisterComponent implements OnInit {
  errors: PublicRegErrors = {
    email: '',
    password: '',
    password_confirmation: ''
  };
  regForm: FormGroup;
  constructor(private router: Router, private snotifyService: SnotifyService, private reg: RegisterService, private fb: FormBuilder, ) { }

  ngOnInit(): any {
    this.regForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }
  get email(): any{return this.regForm.get('email'); }
  get password(): any{return this.regForm.get('password'); }
  get confirmPassword(): any{return this.regForm.get('confirmPassword'); }

  get_email_error(): any {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get_pd_error(): any {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }

    return this.password.hasError('password') ? 'Invalid password value' : '';
  }

  get_cpd_error(): any {
    if (this.confirmPassword.hasError('required')) {
      return 'Confirm password is required';
    }

    if (this.confirmPassword !== this.password) {
      return 'Passwords do not match';
    }

    return this.confirmPassword.hasError('confirmPassword') ? 'Invalid confirm password value' : '';
  }

  register(): any {
    this.reg.register_individual(this.regForm.value.email, this.regForm.value.password, this.regForm.value.confirmPassword).
    then((res) => {
      if (res.success){
        this.snotifyService.success(res.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });

        const state: ActivateState = { email: this.regForm.value.email, complete : false, date: Date()};
        localStorage.setItem('registration', JSON.stringify(state));
        this.router.navigate(['/activate']);
      }

      if (res.status === 422){
        this.errors = res.error.error.message;
      }

      if (res.status === 419){
        this.snotifyService.error('System error. CORS. Please contact Admin');
      }

      if (res.status === 401){
        this.snotifyService.error(res.error.error.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }

      if (res.status === 500){
        this.snotifyService.error('System error. Cannot connect to service');
      }

    }).catch((e) => {
      console.log(e);
      this.snotifyService.error('System error. Try again later or contact admin if problem persist');
    });
  }

}
