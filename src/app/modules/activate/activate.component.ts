import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {RegisterService} from '../../services/register.service';
import {ActivationErrors} from '../../interfaces/activation-errors';
import {ActivateState} from '../../interfaces/activate-state';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  errors: ActivationErrors = {
    email: '',
    code: null,
  };
  activateForm: FormGroup;

  constructor(private router: Router, private snotifyService: SnotifyService, private reg: RegisterService, private fb: FormBuilder, ) {
    const act = JSON.parse(localStorage.getItem('registration'));
    if (act){
      if (act.complete){
        this.router.navigate(['/login']);
      }
    }else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): any {
    this.activateForm = this.fb.group({
      code: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
    });
  }

  get code(): any { return this.activateForm.get('code'); }

  get_code_error(): any {
    if (this.code.hasError('required')) {
      return 'Activation code is required';
    }

    if (this.code.hasError('minLength')) {
      return 'Activation code should be a minimum of 4 numbers';
    }

    if (this.code.hasError('maxLength')) {
      return 'Activation code should be a minimum of 4 numbers';
    }

    return this.code.hasError('number') ? 'Not a valid code' : '';
  }


  activate(): any{
    const act = JSON.parse(localStorage.getItem('registration'));

    this.reg.activate(act.email, this.activateForm.value.code)
      .then((res) => {
        console.log(res);
        if (res.success) {
          this.snotifyService.success(res.message, {
            timeout: 3000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });

          const state: ActivateState = { email: null, complete : true, date: Date()};
          localStorage.setItem('registration', JSON.stringify(state));

          this.router.navigate(['/login']);
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

        if (res.status === 500){
          this.snotifyService.error('System error. Cannot connect to service');
        }

      }).catch((e) => {
      if (e.status === 500){
        this.snotifyService.error('System error. Cannot connect to service');
      }
    });
  }
}
