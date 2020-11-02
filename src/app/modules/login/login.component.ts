import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {LoginErrors} from '../../interfaces/login-errors';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  deviceInfo = null;
  loginForm: FormGroup;
  errors: LoginErrors = {
    email: '',
    password: ''
  };
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private snotifyService: SnotifyService, private api: ApiService, private auth: AuthService, private fb: FormBuilder, private deviceService: DeviceDetectorService) {
    this.device_data();
  }

  device_data(): any {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit(): any {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  get email(): any{return this.loginForm.get('email'); }
  get password(): any{return this.loginForm.get('password'); }

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

  login(): any {
    this.auth.authenticate(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.deviceInfo.device
   ).then((res) => {
     if (res.success){
       const act = JSON.parse(localStorage.getItem('registration'));

       this.snotifyService.success('Login Successful', {
         timeout: 2000,
         showProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true
       });
       // create state
       localStorage.setItem('user', JSON.stringify(res.user));
       if (act !== null){
         if (act.completed){
           this.router.navigate(['/dashboard/update/profile']);
         }
       }

       this.router.navigate(['/dashboard']);
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
    })
      .catch((error) => {
        console.log(error);
        this.snotifyService.error('Something went wrong. Please contact admin');
      });
  }

}
