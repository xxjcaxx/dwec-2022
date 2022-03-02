import { Component, OnInit } from '@angular/core';
import { IUser } from '../user';
import { UserService } from '../user.service';
import * as Realm from 'realm-web';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: Realm.User | null = null;

  ngOnInit(): void {
    this.userService.userSubject.subscribe((u) => (this.user = u));
  }

  logout() {
    this.userService.logout();
  }
}
