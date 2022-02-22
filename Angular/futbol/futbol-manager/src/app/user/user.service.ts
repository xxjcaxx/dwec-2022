import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  logged = new BehaviorSubject(false);

  app = new Realm.App({ id: "futbol-rqxxa" });
  user: any;


  constructor(private http: HttpClient) { }


  async login(){
  const credentials = Realm.Credentials.anonymous();
  try {
    // Authenticate the user
    const user = await this.app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    this.user = user;
    this.logged.next(true);
    localStorage.setItem('logged','1');
  } catch (err) {
    console.error("Failed to log in", err);
  }
  }

  async register(email:string,pass:string){
   console.log("Register",{email,pass});
   
    await this.app.emailPasswordAuth.registerUser({ email, password: pass });
  }
}
