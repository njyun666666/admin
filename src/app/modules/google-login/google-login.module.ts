import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthService } from './google-auth.service';
// import { GoogleAuthService } from './google-auth.service';
// import { GoogleLoginProvider } from './providers/google-login-provider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [  ]

})

export class GoogleLoginModule {


  constructor() {

  }

  // static initialize(config?) {
  //   return {
  //     ngModule: GoogleLoginModule,
  //     providers: [
  //       GoogleAuthService,
  //       {
  //         provide: 'GoogleAuthServiceConfig',
  //         useValue: {
  //           autoLogin: false,
  //           providers: [
  //             {
  //               id: 'Google',
  //               provider: new GoogleLoginProvider(
  //                 '1065892758091-10ttsbo9032vc1nr45sbg7i5aqeb48rf.apps.googleusercontent.com' // 於 google 申請的應用程式 client id
  //               )
  //             }
  //           ]
  //         }
  //       }
  //     ]
  //   };
  // }




  // static initialize(config?) {
  //   return {
  //     ngModule: GoogleLoginModule,
  //     providers: [
  //       GoogleAuthService,
  //       {
  //         provide: 'GoogleAuthServiceConfig',
  //         useValue: {
  //           autoLogin: false,
  //           providers: [
  //             {
  //               id: 'Google',
  //               provider: new GoogleLoginProvider(
  //                 '1065892758091-10ttsbo9032vc1nr45sbg7i5aqeb48rf.apps.googleusercontent.com' // 於 google 申請的應用程式 client id
  //               )
  //             }
  //           ]
  //         }
  //       }
  //     ]
  //   };
  // }

  // {
  //   provide: 'GoogleAuthServiceConfig',
  //   useValue: {
  //     autoLogin: false,
  //     providers: [
  //       {
  //         id: GoogleLoginProvider.PROVIDER_ID,
  //         provider: new GoogleLoginProvider(
  //           '1065892758091-10ttsbo9032vc1nr45sbg7i5aqeb48rf.apps.googleusercontent.com' // 於 google 申請的應用程式 client id
  //         )
  //       }
  //     ]
  //   } as SocialAuthServiceConfig
  // }



}
