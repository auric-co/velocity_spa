import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { LandingFooterComponent } from './landing-footer/landing-footer.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NoResultsComponent } from './component/no-results/no-results.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LandingFooterComponent,
    LandingHeaderComponent,
    NoResultsComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatCardModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    NoResultsComponent,
  ]
})
export class SharedModule { }
