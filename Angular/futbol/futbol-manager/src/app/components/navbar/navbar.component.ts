import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import * as Realm from 'realm-web';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: Realm.User | null = null;

  logged = false;

  ngOnInit(): void {
    //this.userService.logged.subscribe((l) => (this.logged = l));
    this.userService.userSubject.subscribe((u) => {
      this.user = u;
      if(u){
        this.logged = u.isLoggedIn;
      }
    });
    this.userService.isLogged();
  }
}
