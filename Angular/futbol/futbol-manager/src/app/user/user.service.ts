import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';
import { BehaviorSubject } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logged = new BehaviorSubject(false);
  userSubject = new BehaviorSubject<IUser>({ id: '', email: '', games: [] });

  app = new Realm.App({ id: 'futbol-rqxxa' });
  user: any;

  constructor(private http: HttpClient) {}

  async isLogged() {
    this.app.currentUser?.isLoggedIn;
    if (this.app.currentUser?.isLoggedIn) {
      this.logged.next(true);
      await this.app.currentUser!.refreshCustomData();
      //console.log('Custom data', this.app.currentUser.customData);
      const user = {
        ...this.userSubject.value,
        customData: this.app.currentUser.customData,
      };
      this.userSubject.next(this.app.currentUser);
    } else {
      this.logged.next(false);
    }
  }

  async login(email: string, pass: string) {
    //const credentials = Realm.Credentials.anonymous();
    const credentials = Realm.Credentials.emailPassword(email, pass);
    try {
      // Authenticate the user
      const user = await this.app.logIn(credentials);
      this.user = user;
      this.logged.next(true);
      this.userSubject.next(user);

      if (this.app.currentUser?.isLoggedIn) {
        const mongodb = this.app.currentUser.mongoClient('mongodb-atlas');
        const users = mongodb.db('futbol').collection('users');
        const result = await users.findOne({ id: this.app.currentUser.id });
        if (result == null) {
          const result = await users.insertOne({
            id: this.app.currentUser.id,
            email: email,
          });
          console.log(result);
        }
      }
      //this.showUserInfo();
    } catch (err) {
      console.error('Failed to log in', err);
    }
  }

  async register(email: string, pass: string) {
    console.log('Register', { email, pass });

    await this.app.emailPasswordAuth.registerUser({ email, password: pass });
  }

  showUserInfo() {
    console.log(this.user);
  }

  logout() {
    if (this.app.currentUser?.isLoggedIn) {
      this.app.currentUser.logOut();
    }
  }
}
