import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {ChangePasswordErrors} from '../../interfaces/change-password-errors';
import {AccountService} from '../../services/account.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  errors: ChangePasswordErrors = {
    new_password: '',
    password: '',
    new_password_confirmation: ''
  };
  passwordForm: FormGroup;
  constructor(private router: Router, private snotifyService: SnotifyService,
              private user: AccountService, private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      current_password: [ '', Validators.compose([Validators.required])],
      new_password: ['', Validators.compose([Validators.required])],
      password_confirmation: ['', Validators.compose([Validators.required])],
    });
  }

  get current_password(): any{return this.passwordForm.get('current_password'); }
  get new_password(): any{return this.passwordForm.get('new_password'); }
  get password_confirmation(): any{return this.passwordForm.get('password_confirmation'); }

  get_current_password_error(): any{
    if (this.current_password.hasError('required')) {
      return 'Current Password is required';
    }
  }

  get_new_password_error(): any{
    if (this.new_password.hasError('required')) {
      return 'New Password cannot be empty';
    }
  }

  get_password_confirmation_error(): any{
    if (this.password_confirmation.hasError('required')) {
      return 'Password confirmation cannot be empty';
    }

    if (this.passwordForm.value.new_password !== this.passwordForm.value.password_confirmation){
      return 'Passwords do not match';
    }
  }

  submit(): any{
    this.user.change_password(
      this.passwordForm.value.current_password,
      this.passwordForm.value.new_password,
      this.passwordForm.value.password_confirmation,
    ).then((res) => {
      if (res.success){

        this.snotifyService.success(res.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        this.snotifyService.success('Please log in afresh', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        this.auth.logout();
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

    });
  }
}
