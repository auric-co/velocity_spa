import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from 'src/app/modules/articles/articles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MoodComponent } from 'src/app/modules/mood/mood.component';
import { SettingsComponent } from 'src/app/modules/settings/settings.component';
import { CounsellingComponent } from 'src/app/modules/counselling/counselling.component';
import { TipsComponent } from 'src/app/modules/tips/tips.component';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { AlertModule } from 'src/app/_alert/alert.module';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { BmiService } from 'src/app/services/bmi.service';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { MoodService } from 'src/app/services/mood.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TipsService } from 'src/app/services/tips.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {Four0fourComponent} from '../../modules/four0four/four0four.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {UpdateProfileComponent} from '../../modules/update-profile/update-profile.component';
import {BmiCalculatorComponent} from '../../modules/bmi-calculator/bmi-calculator.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {BmiResultComponent} from '../../modals/bmi-result/bmi-result.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {AccountService} from '../../services/account.service';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RequestAppointmentComponent} from '../../modules/request-appointment/request-appointment.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TrackMoodComponent} from '../../modules/track-mood/track-mood.component';
import {CounsellingAppointmentsComponent} from '../../modules/counselling-appointments/counselling-appointments.component';
import {CounsellingRequestsComponent} from '../../modules/counselling-requests/counselling-requests.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UpdatePasswordComponent} from 'src/app/modules/update-password/update-password.component';
import {ArticleReadComponent} from '../../modules/article-read/article-read.component';
import {EditAppointmentRequestComponent} from '../../modules/edit-appointment-request/edit-appointment-request.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ArticlesComponent,
    ArticleReadComponent,
    MoodComponent,
    SettingsComponent,
    CounsellingComponent,
    RequestAppointmentComponent,
    EditAppointmentRequestComponent,
    TipsComponent,
    ProfileComponent,
    UpdateProfileComponent,
    BmiResultComponent,
    BmiCalculatorComponent,
    Four0fourComponent,
    TrackMoodComponent,
    CounsellingAppointmentsComponent,
    CounsellingRequestsComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule,
  ],
  providers: [
    DashboardService,
    AuthGuard,
    ArticlesService,
    AuthService,
    BmiService,
    LeaderboardService,
    MoodService,
    SettingsService,
    TipsService,
    AccountService,
  ],
})
export class DefaultModule {}
