import { Component, OnInit } from '@angular/core';
import { IUser } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService) {}

  user?: IUser;

  ngOnInit(): void {
    this.userService.userSubject.subscribe((u) => (this.user = u));
  }

  logout() {
    this.userService.logout();
  }
}
