import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../@core/services/account.service';
import { AuthService } from '../../@core/services/auth.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.logout();
  }

}
