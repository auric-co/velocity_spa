import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandingModule } from './layouts/landing/landing.module';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APIInterceptor} from './interceptors/httpinterceptors';
import {ApiService} from './services/api.service';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerOverlayService} from './services/spinner-overlay.service';
import {AlertModule, AlertService} from './_alert';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoadingScreenComponent,
    SpinnerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule,
    DefaultModule,
    LandingModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    SnotifyModule,
    MatDialogModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {panelClass: 'mat-dialog-override', hasBackdrop: true}},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    ApiService,
    SpinnerOverlayService,
    AlertService,
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
