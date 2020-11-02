import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {RegisterService} from '../../services/register.service';
import {ActivationCodeError} from '../../interfaces/activation-code-error';

@Component({
  selector: 'app-request-code',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.scss']
})
export class RequestCodeComponent implements OnInit {
  errors: ActivationCodeError = {
    email: '',
  };
  codeForm: FormGroup;

  constructor(private router: Router, private snotifyService: SnotifyService, private reg: RegisterService, private fb: FormBuilder, ) {
    const act = JSON.parse(localStorage.getItem('registration'));
    if (act){
      if (act.completed){
        this.router.navigate(['/login']);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): any {
    this.codeForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  get email(): any { return this.codeForm.get('email'); }

  get_email_error(): any {
    if (this.email.hasError('required')) {
      return 'Email address is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  request(): any{
    this.reg.request_activation_code(this.codeForm.value.email)
      .then((res) => {
        if (res.success){
          this.snotifyService.success(res.message, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });


          this.router.navigate(['/activate']);
        }
        if (res.status === 422){
          this.errors = res.error.error.message;
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
          this.snotifyService.error('System error. Cannot connect to service');
        }

      }).catch((e) => {
        this.snotifyService.error('System error. Cannot connect to service');
      });
  }
}
