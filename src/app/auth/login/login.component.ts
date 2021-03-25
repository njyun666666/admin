import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GoogleSignInOptions } from '../../modules/google-login/model/google-sign-in-options';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinOpt: GoogleSignInOptions = new GoogleSignInOptions();

  constructor(
    private authService: AuthService
  ) { }


  ngOnInit(): void {

  }

  signInWithGoogle(): void {

    this.signinOpt.prompt = 'select_account';
    this.signinOpt.redirect_uri = '/';

    this.authService.login(this.signinOpt);
  }



}
