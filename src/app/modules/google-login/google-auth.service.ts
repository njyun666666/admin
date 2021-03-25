import { GoogleSignInOptions } from './model/google-sign-in-options';
import { Injectable } from "@angular/core";
import { GoogleBasicProfile } from "./model/google-basic-profile";


@Injectable({
  providedIn: 'root'
})

export class GoogleAuthService {

  auth2; // The Sign-In object.
  public googleUser = new GoogleBasicProfile(); // The current user.


  constructor() {

    // console.log('--------------- GoogleAuthService constructor');

    this.gapiLoad();

    // console.log('--------------- GoogleAuthService constructor end');

  }




  gapiLoad() {

    gapi.load('auth2', () => {
      // console.log('gapi.load auth2');
      this.auth2 = gapi.auth2.init({
        client_id: '1065892758091-10ttsbo9032vc1nr45sbg7i5aqeb48rf.apps.googleusercontent.com',
        scope: 'profile'
      });

      // console.log('------------ gapiLoad ------------');
    });

  }


  isAuth2load(): Promise<boolean> {
    // console.log('1 ---------------- isAuth2load ');

    return new Promise((resolve, reject) => {

      let count = 1;

      if (this.auth2) {
        // console.log(' ---------------- isAuth2load = true');
        resolve(true);

      } else {


        const interval = setInterval(() => {
          // console.log('2 ---------------- isAuth2load setInterval', count);

          if (count > 10) {
            console.error('gapi load error');
            clearInterval(interval);
            resolve(false);
          }


          if (this.auth2) {
            clearInterval(interval);

            // console.log('3 ---------------- isAuth2load resolve(true); ');
            resolve(true);
          }

          count++;
        }, 1000);

      }

    });

  }


  isSignedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.isAuth2load().then((result) => {

        // console.log('4 ----- isSignedIn --- this.isAuth2load().then ', this.auth2);

        // console.log(this.auth2.isSignedIn);
        // console.log('5 ----- isSignedIn -- ', this.auth2.isSignedIn.get());

        // this.refreshAuthToken();

        if (this.auth2.isSignedIn.get()) {


          console.log('-------------- isSignedIn ------------', this.auth2.isSignedIn.get());

          this.setUserProfile();






          resolve(true);

        } else {

          reject(false);

        }


      }).catch(() => {

        reject(false);

      });

    });



  }



  setUserProfile(): void {
    const user = new GoogleBasicProfile();

    const profile = this.auth2.currentUser.get().getBasicProfile();
    const authResponse = this.auth2.currentUser.get().getAuthResponse(true);

    user.id = profile.getId();
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.imageUrl = profile.getImageUrl();
    user.givenName = profile.getGivenName();
    user.familyName = profile.getFamilyName();

    user.access_token = authResponse.access_token;
    user.id_token = authResponse.id_token;
    user.expires_at = authResponse.expires_at;

    this.googleUser = user;

    console.log('google auth ---- setUserProfile ---', user);
  }



  // currentUser(): Promise<GoogleBasicProfile> {
  //   return new Promise((resolve, reject) => {

  //     this.isAuth2load().then(() => {

  //       if (this.auth2.isSignedIn.get()) {

  //         // console.log(this.auth2);

  //         const user = new GoogleBasicProfile();

  //         // if (!this.auth2) { return user; }

  //         const profile = this.auth2.currentUser.get().getBasicProfile();
  //         const access_token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
  //         const id_token = this.auth2.currentUser.get().getAuthResponse(true).id_token;

  //         user.id = profile.getId();
  //         user.name = profile.getName();
  //         user.email = profile.getEmail();
  //         user.imageUrl = profile.getImageUrl();
  //         user.givenName = profile.getGivenName();
  //         user.familyName = profile.getFamilyName();
  //         user.access_token = access_token;
  //         user.id_token = id_token;

  //         this.googleUser = user;
  //         resolve(user);

  //       } else {

  //         reject();

  //       }


  //     }).catch(() => {

  //       reject();

  //     });

  //   });

  // }



  signIn(signInOptions?: GoogleSignInOptions) {
    // const options = Object.assign(Object.assign({}, this.initOptions), signInOptions);
    return new Promise((resolve, reject) => {
      // const offlineAccess = options && options.offline_access;
      // let promise = !offlineAccess
      //     ? this.auth2.signIn(signInOptions)
      //     : this.auth2.grantOfflineAccess(signInOptions);

      // let promise = this.auth2.grantOfflineAccess({ prompt: 'select_account' });
      let promise = this.auth2.signIn(signInOptions);
      // { prompt: 'select_account' }


      promise
        .then((response) => {

          console.log(response);

          // const user = new GoogleBasicProfile();
          // if (response && response.code) {
          //   user.authorizationCode = response.code;
          // } else {
          // }

          // const profile = this.auth2.currentUser.get().getBasicProfile();
          // const access_token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
          // const id_token = this.auth2.currentUser.get().getAuthResponse(true).id_token;

          // user.id = profile.getId();
          // user.name = profile.getName();
          // user.email = profile.getEmail();
          // user.imageUrl = profile.getImageUrl();
          // user.givenName = profile.getGivenName();
          // user.familyName = profile.getFamilyName();
          // user.access_token = access_token;
          // user.id_token = id_token;
          // // user.response = profile;

          // console.log(user);



          // this.googleUser = user;

          this.setUserProfile();

          resolve(this.googleUser);


        }, (closed) => {
          reject(closed);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }


  refreshAuthToken() {

    return new Promise((resolve, reject) => {

      this.auth2.reloadAuthResponse().then((response) => {
        this.setUserProfile();
        console.log(this.googleUser);

        resolve(true);

      }).catch((err) => {
        reject(err);
      });

    });
  }


  signOut(revoke?) {
    return new Promise((resolve, reject) => {
      let signOutPromise;
      if (revoke) {
        signOutPromise = this.auth2.disconnect();
      } else {
        signOutPromise = this.auth2.signOut();
      }
      signOutPromise
        .then((err) => {
          if (err) {
            reject(err);
          } else {
            // resolve();
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }



  // isSignedIn(){
  //   this.auth2.
  //   gapi.
  // }


  // getLoginStatus(loginStatusOptions?) {
  //   return new Promise((resolve, reject) => {
  //     if (this.auth2.isSignedIn.get()) {
  //       let user = new GoogleBasicProfile();


  //       const profile = this.auth2.currentUser.get().getBasicProfile();

  //       user.id = profile.getId();
  //       user.name = profile.getName();
  //       user.email = profile.getEmail();
  //       user.imageUrl = profile.getImageUrl();
  //       user.givenName = profile.getGivenName();
  //       user.familyName = profile.getFamilyName();
  //       // user.response = profile;


  //       // const profile = this.auth2.currentUser.get().getBasicProfile();
  //       const access_token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
  //       const id_token = this.auth2.currentUser.get().getAuthResponse(true).id_token;

  //       user.id = profile.getId();
  //       user.name = profile.getName();
  //       user.email = profile.getEmail();
  //       user.imageUrl = profile.getImageUrl();
  //       user.givenName = profile.getGivenName();
  //       user.familyName = profile.getFamilyName();
  //       // user.access_token = access_token;
  //       // user.id_token = id_token;


  //       if (loginStatusOptions && loginStatusOptions.refreshToken) {

  //         this.auth2.currentUser.get().reloadAuthResponse().then(authResponse => {
  //           user.access_token = authResponse.access_token;
  //           user.id_token = authResponse.id_token;
  //           resolve(user);
  //         });

  //       } else {

  //         const authResponse = this.auth2.currentUser.get().getAuthResponse(true);
  //         user.access_token = authResponse.access_token;
  //         user.id_token = authResponse.id_token;
  //         resolve(user);
  //       }
  //     }
  //     else {
  //       reject(`No user is currently logged in with Google`);
  //     }
  //   });
  // }





}


