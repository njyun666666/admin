import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from '../@theme/theme.module';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule
  ],

})
export class AuthModule { }
