import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject, BehaviorSubject, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userSubject = new Subject<User>();
  logued = new BehaviorSubject<boolean>(false);

  private loginURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU";
  private registerURL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
    localStorage.getItem('idToken') ? this.logued.next(true) : this.logued.next(false);
  }


  login(data: User): Observable<User> {
    let datos = { ...data, returnSecureToken: true };
    return this.http.post<{ email: string, idToken: string }>(this.loginURL, JSON.stringify(datos),this.httpOptions)
      .pipe(
        map(response => {
          this.userSubject.next(data);
          localStorage.setItem('idToken',response.idToken);
          this.logued.next(true);
          return data;
        }),
        catchError((resp:HttpErrorResponse)=> throwError(()=> new Error(`Error de Login: ${resp.message}`)))
      );
  }

  register(data: User): Observable<User>{
    let datos = { ...data, returnSecureToken: true };
    return this.http.post<{ email: string, idToken: string }>(this.registerURL, JSON.stringify(datos),this.httpOptions)
      .pipe(
        map(response => {
          return data;
        }),
        catchError((resp:HttpErrorResponse)=> throwError(()=> new Error(`Error de registre: ${resp.message}`)))
      );
  }

  logout(){
    localStorage.removeItem('idToken');
    this.logued.next(false);
  }

}
