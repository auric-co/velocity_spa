import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { CounsellingComponent } from './modules/counselling/counselling.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { Four0fourComponent } from './modules/four0four/four0four.component';
import { LoginComponent } from './modules/login/login.component';
import { MoodComponent } from './modules/mood/mood.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { CompanyregisterComponent } from './modules/register/companyregister/companyregister.component';
import { PublicRegisterComponent } from './modules/register/public-register/public-register.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { TipsComponent } from './modules/tips/tips.component';
import { AuthGuard } from './_guards/auth.guard';
import {RequestAppointmentComponent} from './modules/request-appointment/request-appointment.component';
import {ActivateComponent} from './modules/activate/activate.component';
import {ActivationGuard} from './_guards/activation.guard';
import {UpdateProfileComponent} from './modules/update-profile/update-profile.component';
import {RequestCodeComponent} from './modules/request-code/request-code.component';
import {BmiCalculatorComponent} from './modules/bmi-calculator/bmi-calculator.component';
import {TrackMoodComponent} from './modules/track-mood/track-mood.component';
import {CounsellingAppointmentsComponent} from './modules/counselling-appointments/counselling-appointments.component';
import {CounsellingRequestsComponent} from './modules/counselling-requests/counselling-requests.component';
import { UpdatePasswordComponent } from './modules/update-password/update-password.component';
import {ArticleReadComponent} from './modules/article-read/article-read.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register/company',
    component: CompanyregisterComponent,
    canActivate: [ActivationGuard],
  },
  {
    path: 'register',
    component: PublicRegisterComponent,
    canActivate: [ActivationGuard],
  },
  {
    path: 'activate',
    component: ActivateComponent,
  },
  {
    path: 'get-code',
    component: RequestCodeComponent,
    canActivate: [ActivationGuard],
  },
  {
    path: 'reset-password',
    component: ForgotPasswordComponent,
    canActivate: [ActivationGuard],
  },
  {
    path: 'dashboard',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'bmi',
        component: BmiCalculatorComponent,
      },
      {
        path: 'counselling',
        component: CounsellingComponent,
      },
      {
        path: 'counselling/appointments',
        component: CounsellingAppointmentsComponent
      },
      {
        path: 'counselling/requests',
        component: CounsellingRequestsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'update/profile',
        component: UpdateProfileComponent,
      },
      {
        path: 'profile/update-password',
        component: UpdatePasswordComponent,
      },
      {
        path: 'appointment-request',
        component: RequestAppointmentComponent,
      },
      {
        path: 'my-mood',
        component: MoodComponent,
      },
      {
        path: 'my-mood/add',
        component: TrackMoodComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'my-tips',
        component: TipsComponent,
      },
      {
        path: 'wellness-dimensions',
        component: ArticlesComponent,
      },
      {
        path: 'articles/:id',
        component: ArticlesComponent
      },
      {
        path: 'articles/read/:id',
        component: ArticleReadComponent
      }
    ],
  },
  { path: '404', component: Four0fourComponent },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
