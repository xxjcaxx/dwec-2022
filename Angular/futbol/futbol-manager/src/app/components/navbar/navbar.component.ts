import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: any = {};

  logged = false;

  ngOnInit(): void {
    this.userService.logged.subscribe((l) => (this.logged = l));
    this.userService.isLogged();
    this.userService.userSubject.subscribe((u) => {
      this.user = u;
    });
  }
}
