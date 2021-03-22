import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AccountService } from '../../@core/services/account.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;


  constructor(
    private socialAuthService: SocialAuthService,
    private accountService: AccountService,
    private cookieService: CookieService
  ) { }


  ngOnInit(): void {




    this.socialAuthService.authState.subscribe((user) => {
      this.accountService.user = user;
      this.user = user;

      this.cookieService.set('googleState', JSON.stringify(user));
      // console.log('login coponent',this.accountService.user);
      // console.log('login coponent',user);

      // this.user = user;
      // console.log('this.accountService.user', this.accountService.user);
      // console.log(this.userService.getUser());
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }



}
