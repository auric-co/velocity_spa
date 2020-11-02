import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CoRegErrors} from '../../../interfaces/co-reg-errors';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {AuthService} from '../../../services/auth.service';
import {RegisterService} from '../../../services/register.service';
import {ActivateState} from '../../../interfaces/activate-state';


interface Company {
  id: number;
  name: string;
}

@Component({
  selector: 'app-companyregister',
  templateUrl: './companyregister.component.html',
  styleUrls: ['./companyregister.component.scss']
})
export class CompanyregisterComponent implements OnInit {
  errors: CoRegErrors = {
    company: null,
    email: '',
    password: '',
    password_confirmation: ''
  };
  regForm: FormGroup;
  companys: Company[];

  constructor(private router: Router, private snotifyService: SnotifyService, private reg: RegisterService, private fb: FormBuilder, ) { }

  ngOnInit(): any {
    this.reg.companies().then((res) => {

      this.companys = res;

    }).catch((e) => {
      console.log(e);
    });
    this.regForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      client: [null, Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }
  get client(): any { return this.regForm.get('client'); }
  get email(): any{return this.regForm.get('email'); }
  get password(): any{return this.regForm.get('password'); }
  get confirmPassword(): any{return this.regForm.get('confirmPassword'); }

  get_email_error(): any {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get_client_error(): any {
    if (this.client.hasError('required')) {
      return 'Company is required';
    }
  }

  get_pd_error(): any {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    if (this.password.hasError('minLength')) {
      return 'Password should be atleast 8 characters long';
    }

    return this.password.hasError('password') ? 'Invalid password value' : '';
  }

  get_cpd_error(): any {
    if (this.confirmPassword.hasError('required')) {
      return 'Password confirmation is required';
    }

    if (this.regForm.value.password !== this.regForm.value.confirmPassword) {
      return 'Passwords do not match';
    }

    return this.confirmPassword.hasError('confirmPassword') ? 'Invalid confirm password value' : '';
  }

  load_clients(): void{
    this.reg.companies().then((res) => {
      console.log(res);
      if (res.success){
        this.snotifyService.success(res.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });

        this.companys = res;

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
    });
  }

  register(): any {
    // tslint:disable-next-line:max-line-length
    this.reg.register_company(this.regForm.value.client, this.regForm.value.email, this.regForm.value.password, this.regForm.value.confirmPassword)
      .then((res) => {
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
