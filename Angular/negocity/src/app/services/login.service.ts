import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU";


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  login(data:User):Observable<User>{
    let datos = {...data, returnSecureToken : true}
    return this.http.post<{first: string, last: string}>(this.loginURL,JSON.stringify(datos))
    .pipe(map(() => data));
  }



}
