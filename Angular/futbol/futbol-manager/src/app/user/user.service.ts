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


  isLogged(){
    this.app.currentUser?.isLoggedIn
    if (this.app.currentUser?.isLoggedIn){
      this.logged.next(true);
    }
    else {
      this.logged.next(false);
    }
  }


  async login(email:string,pass:string){
  //const credentials = Realm.Credentials.anonymous();
  const credentials = Realm.Credentials.emailPassword(email, pass);
  try {
    // Authenticate the user
    const user = await this.app.logIn(credentials);
    this.user = user;
    this.logged.next(true);
    //this.showUserInfo();
    
  } catch (err) {
    console.error("Failed to log in", err);
  }
  }

  async register(email:string,pass:string){
   console.log("Register",{email,pass});
   
    await this.app.emailPasswordAuth.registerUser({ email, password: pass });
  }

  showUserInfo(){
    console.log(this.user);
    
  }

}
