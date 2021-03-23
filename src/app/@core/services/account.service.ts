import { Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: SocialUser;
  constructor() { }


  getUser(): Observable<SocialUser> {
    return of(this.user);
  }


}
