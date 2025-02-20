import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login( userName: string, password: string): Observable<boolean> {

    let properUserName: string = 'igor';
    let properPassword: string = 'ppp';

    if( properUserName === userName && properPassword === password ){
      return of(true);
    }
    else{
      return of(false);
    } 

  }

}
