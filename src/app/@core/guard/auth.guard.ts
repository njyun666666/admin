import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = this.doCanActivate(route, state);

    return result;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = this.doCanActivate(childRoute, state);

    return result;
  }


  doCanActivate(
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // console.log('doCanActivate=');
    // console.log(next);
    // console.log(state);


    console.log('checkTokenCookie', this.authService.checkTokenCookie());

    if (!this.authService.checkTokenCookie()) {
      this.router.navigate(['/auth/login']);

      return false;
    }


    const url = state.url.split('?')[0];
    const queryParams = Route.queryParams;


    // return this.authService.authcheck(url, queryParams);
    console.log('doCanActivate url=' + url, queryParams);


    return this.authService.authcheck(url, queryParams);
  }


}
