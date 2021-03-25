import { resolve } from 'dns';
import { GoogleAuthService } from '../modules/google-login/google-auth.service';
import { GoogleBasicProfile } from '../modules/google-login/model/google-basic-profile';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
import { GoogleSignInOptions } from '../modules/google-login/model/google-sign-in-options';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenCookieName = 'token';
  redirectUrl: string;
  redirectUrlPara: Params;

  temp: boolean = false;

  constructor(
    private googleAuthService: GoogleAuthService,
    private router: Router,
    private apiService: ApiService
  ) { }

  refreshToken(): void {
    // this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  login(signInOptions?: GoogleSignInOptions) {

    // console.log('login this.redirectUrl', this.redirectUrl);
    // console.log('login this.redirectUrlPara', this.redirectUrlPara);


    this.googleAuthService.signIn(signInOptions).then((user) => {
      // console.log(user);
      this.temp = true;

      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl], { queryParams: this.redirectUrlPara });
        this.redirectUrl = null;
        this.redirectUrlPara = null;

        // console.log('this is this.redirectUrl', this.redirectUrl);
        // console.log('this is this.redirectUrlPara', this.redirectUrlPara);
        // console.log('this is this.temp', this.temp);


      } else {

        this.router.navigate(['/']);
      }
      // this.authService.afterLogin(user as GoogleBasicProfile);

    }, (res) => {
      console.log(res);
    });

  }

  // afterLogin(user: GoogleBasicProfile): void {

  //   this.router.navigate(['/']);
  // }

  getCurrentUser(): GoogleBasicProfile {
    return this.googleAuthService.googleUser;
  }

  checkFrontEndLogin(): Promise<boolean> {
    return this.googleAuthService.isSignedIn();
  }


  logout(): void {
    this.googleAuthService.signOut();
    this.router.navigate(['/auth/login']);
  }




  authcheck(url: string, queryParams: Params): Promise<boolean> {

    return new Promise((resolve, rejects) => {

      console.log(url);
      console.log(queryParams);

      let result = false;
      let api = environment.apiUrl + '/api/Auth/Check';


      // test
      if (!this.temp && url === '/pages/dashboard/d2') {
        api = environment.apiUrl + '/api/Auth/CheckFalse';
      }




      const params = { url };

      this.apiService.post(api, params).toPromise().then((res) => {

        // console.log('auth check res =');
        // console.log(res);

        result = res.code === 1 ? true : false;

        // console.log('authcheck url=' + url + ' code=' + res.code);


        // no login
        if (res.code === -5) {

          this.noLoginRedirect(url, queryParams);

        } else if (res.code < 0) {
          // no auth

          // alert('no auth');
          console.log('res.code < 0');
          // this.goBack();

        }

        // console.log(result);
        // return result;

        if (result) {
          resolve(true);
        } else {
          rejects(false);
        }


      }).catch(() => {
        console.log('---- auth service -- call api catch');
        rejects(false);
      });

      // return false;
    });

  }


  noLoginRedirect(url?: string, queryParams?: Params): void {
    this.redirectUrl = url;
    this.redirectUrlPara = queryParams;
    this.router.navigate(['/auth/login']);
  }


  noAuthRedirect(url?: string, queryParams?: Params): void {
    this.redirectUrl = url;
    this.redirectUrlPara = queryParams;
    this.router.navigate(['/auth/login']);
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
