import { resolve } from 'dns';
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
    return this.doCanActivate(route, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(childRoute, state);
  }


  doCanActivate(
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve, reject) => {

      const url = state.url.split('?')[0];
      const queryParams = Route.queryParams;


      this.authService.checkFrontEndLogin().then((check) => {
        // console.log('----------doCanActivate  checkFrontEndLogin', check);
        // console.log(check);



        if (check) {
          // console.log('----------doCanActivate  resolve(true)', true);


          // call api check

          this.authService.authcheck(url, queryParams).then((apiCheck) => {

            // console.log('------------apiCheck ------', apiCheck);
            resolve(apiCheck);

          }).catch(() => {
            // console.log('------------apiCheck ------ catch', false);
            // this.router.navigate(['/auth/login']);
            this.authService.noLoginRedirect(url, queryParams);
            reject(false);

          });




        } else {
          // this.router.navigate(['/auth/login']);
          this.authService.noLoginRedirect(url, queryParams);
          reject(false);
        }




      }).catch(() => {
        console.log('----------doCanActivate checkFrontEndLogin catch  reject', false);

        // this.router.navigate(['/auth/login']);
        this.authService.noLoginRedirect(url, queryParams);
        reject(false);
      });


    });

    // console.log('doCanActivate=');
    // console.log(next);
    // console.log(state);








    // if (!this.authService.checkFrontEndLogin()) {

    //   console.log('----------doCanActivate  !!!!!!checkFrontEndLogin');

    //   this.router.navigate(['/auth/login']);

    //   return false;
    // }


    // const url = state.url.split('?')[0];
    // const queryParams = Route.queryParams;


    // // return this.authService.authcheck(url, queryParams);
    // // console.log('doCanActivate url=' + url, queryParams);

    // console.log('----------doCanActivate --- last');
    // return true;// this.authService.authcheck(url, queryParams);
  }


}
