import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenCookieName = 'token';

  constructor(
    private accountService: AccountService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService
  ) { }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    // GoogleLoginProvider.getLoginStatus();
  }

  login(): void {



    this.socialAuthService.authState.subscribe((user) => {
      this.accountService.user = user;
      // this.user = user;

      if (user) {

        this.cookieService.set(this.tokenCookieName, JSON.stringify(user), 1, '/');

      } else {

        this.cookieService.delete(this.tokenCookieName, '/');
      }

      // console.log(this.accountService.user.response);

      // console.log('login coponent',this.accountService.user);
      console.log('auth service login', user);

      // this.user = user;
      // console.log('this.accountService.user', this.accountService.user);
      // console.log(this.userService.getUser());
    });
  }

  getTokenCookie(): SocialUser {
    return JSON.parse(this.cookieService.get(this.tokenCookieName)) as SocialUser;
  }

  checkTokenCookie(): boolean {
    return this.cookieService.check(this.tokenCookieName);
  }


  logout(): void {
    // console.log('logout');
    this.accountService.user = null;
    this.cookieService.delete(this.tokenCookieName, '/');
    this.socialAuthService.signOut();
    this.router.navigate(['/auth/login']);
  }




  async authcheck(url, queryParams): Promise<boolean> {

    console.log(url);
    console.log(queryParams);

    let result = false;
    const api = environment.apiUrl + '/api/Auth/Check';


    const params = { url };

    const res = await this.apiService.post(api, params).toPromise();

    console.log('auth check res =');
    console.log(res);

    result = res.code === 1 ? true : false;

    // console.log('authcheck url=' + url + ' code=' + res.code);


    // no login
    if (res.code === 0) {
      const urlParams = {
        returnUrl: url,
        params: btoa(JSON.stringify(queryParams))
      };

      // this.router.navigate(['/auth/login'], { queryParams: urlParams });

    } else if (res.code < 0) {
      // no auth

      // alert('no auth');
      console.log('res.code < 0');
      // this.goBack();

    }

    console.log(result);
    return result;



  }

  goBack(): void {
    this.router.navigate(['']);

    // if (window.history.length > 1) {
    //   this.location.back()
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }









}
