import { SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: SocialUser;
  constructor() { }
}
