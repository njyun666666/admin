import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private accountService: AccountService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }


  checkLogin(): boolean {

    console.log('googleState', this.cookieService.get('googleState'));
    console.log('googleState check', this.cookieService.check('googleState'));

    if (this.cookieService.check('googleState') && this.cookieService.get('googleState')) {

      const googleState = JSON.parse(this.cookieService.get('googleState'));
      if (googleState.id.length > 0) {
        return true;
      }

    }
    return false;
  }

  logout(): void {
    console.log('logout');
    this.accountService.user = null;
    this.cookieService.delete('googleState');
    this.socialAuthService.signOut();
    this.router.navigate(['/auth/login']);
  }





}
