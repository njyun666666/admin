import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
