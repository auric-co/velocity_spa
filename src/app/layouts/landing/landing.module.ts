import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterService } from 'src/app/services/register.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { PublicRegisterComponent } from 'src/app/modules/register/public-register/public-register.component';
import { CompanyregisterComponent } from 'src/app/modules/register/companyregister/companyregister.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/_alert/alert.module';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {LandingComponent} from './landing.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ActivateComponent} from '../../modules/activate/activate.component';
import {RequestCodeComponent} from '../../modules/request-code/request-code.component';


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    PublicRegisterComponent,
    CompanyregisterComponent,
    ActivateComponent,
    RequestCodeComponent
  ],
  imports: [
    CommonModule,
    AlertModule,
    SharedModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    BrowserModule,
    MatSelectModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    RegisterService,
  ]
})
export class LandingModule { }
