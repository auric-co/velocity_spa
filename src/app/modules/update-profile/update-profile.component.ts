import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnotifyService} from 'ng-snotify';
import {ApiService} from '../../services/api.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {UpdateProfileErrors} from '../../interfaces/update-profile-errors';
import {AccountService} from '../../services/account.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  @ViewChild('picker') picker: any;
  min: Date = new Date(1900, 0, 1);
  max: Date = new Date(2007, 11, 31);

  updateProfile: FormGroup;
  errors: UpdateProfileErrors = {
    name: '',
    surname: '',
    address_line_1: '',
    address_line_2: '',
    dob: '',
    height: '',
    weight: ''
  };

  usr = JSON.parse(localStorage.getItem('user'));
  constructor(private router: Router, private snotifyService: SnotifyService, private api: ApiService,
              private user: AccountService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateProfile = this.fb.group({
      name: [ this.usr.name, Validators.compose([Validators.required])],
      surname: [this.usr.surname, Validators.compose([Validators.required])],
      address1: [this.usr.address_line_1, Validators.compose([Validators.required])],
      address2: [this.usr.address_line_2, Validators.compose([Validators.required])],
      dob: [this.usr.dob, Validators.compose([Validators.required])],
      height: [this.usr.height, Validators.compose([Validators.required])],
      weight: [this.usr.weight, Validators.compose([Validators.required])]
    });
  }

  get name(): any{return this.updateProfile.get('name'); }
  get surname(): any{return this.updateProfile.get('surname'); }
  get address1(): any{return this.updateProfile.get('address1'); }
  get address2(): any{return this.updateProfile.get('address2'); }
  get dob(): any{return this.updateProfile.get('dob'); }
  get height(): any{return this.updateProfile.get('height'); }
  get weight(): any{return this.updateProfile.get('weight'); }

  get_name_error(): any{
    if (this.name.hasError('required')) {
      return 'Name is required';
    }
  }
  get_surname_error(): any{
    if (this.surname.hasError('required')) {
      return 'Surname is required';
    }
  }
  get_address1_error(): any{
    if (this.name.hasError('required')) {
      return 'Address is required';
    }
  }
  get_address2_error(): any{
    if (this.name.hasError('required')) {
      return 'Address is required';
    }
  }
  get_dob_error(): any{
    if (this.dob.hasError('required')) {
      return 'Date of Birth is required';
    }
  }
  get_height_error(): any{
    if (this.height.hasError('required')) {
      return 'Height is required';
    }
  }
  get_weight_error(): any{
    if (this.weight.hasError('required')) {
      return 'Weight is required';
    }
  }


  update(): any{
    this.user.update_profile(
      this.updateProfile.value.name,
      this.updateProfile.value.surname,
      this.updateProfile.value.dob,
      this.updateProfile.value.height,
      this.updateProfile.value.weight,
      this.updateProfile.value.address1,
      this.updateProfile.value.address2,
    ).then((res) => {
      if (res.success){

        this.snotifyService.success(res.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        });
        // create state
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard/profile']);
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
      if (e.status === 401){
        this.snotifyService.error(e.message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        });
      }
      this.snotifyService.error('Something went wrong. Please contact admin');
    });
  }
}
