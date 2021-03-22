import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// import { UserService } from '../../@core/services/user.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;


  constructor(private socialAuthService: SocialAuthService) { }


  ngOnInit(): void {
    console.log('login coponent');

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;

      // this.userService.user = user;

      console.log(user);
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
