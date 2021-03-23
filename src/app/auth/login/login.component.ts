import { Component, OnInit } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from '../../@core/services/auth.service';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;


  constructor(
    private authService: AuthService
  ) { }


  ngOnInit(): void {

    this.authService.login();

  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }



}
