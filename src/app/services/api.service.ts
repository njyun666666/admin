
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GoogleAuthService } from '../modules/google-login/google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private http: HttpClient,
    private googleAuthService: GoogleAuthService
  ) { }

  get(url: string, optionParams?: { [param: string]: any }, optionHeader?: { [header: string]: string })
    : Observable<any> {

    let headers: HttpHeaders = new HttpHeaders(optionHeader);
    headers = this.setHeader(headers);


    const httpOptions = {
      headers,
      params: new HttpParams({ fromObject: optionParams }),
      // withCredentials: true // set cookies
    };



    return this.http.get(url, httpOptions)
      .pipe(catchError(this.handleError));

  }




  post(url: string, optionParams?: { [param: string]: any } | FormData, optionHeader?: { [header: string]: string })
    : Observable<any> {

    let headers: HttpHeaders = new HttpHeaders(optionHeader);
    headers = this.setHeader(headers);

    const httpOptions = {
      headers,
      // withCredentials: true // set cookies
    };

    return this.http.post(url, optionParams, httpOptions)
      .pipe(catchError(this.handleError));
  }






  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //  A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      //  The backend returned an unsuccessful response code.
      //  The response body may contain clues as to what went wrong,
      console.error(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was:\n${error.error}`);
    }

    // alert(`Backend returned code ${error.status}`);

    //  return an observable with a user-facing error message
    return throwError(
      `Backend returned code ${error.status}`);
  }




  private setHeader(headers: HttpHeaders): HttpHeaders {

    if (this.googleAuthService.googleUser) {
      const token = this.googleAuthService.googleUser.id_token;
      headers = headers.append('Token', token);
    }

    return headers;
  }



}