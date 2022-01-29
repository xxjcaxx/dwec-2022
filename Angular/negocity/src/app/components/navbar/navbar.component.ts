import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private login: LoginService) { }
  isAuth: boolean = false;

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('idToken') ? true : false;
    this.login.logued.subscribe(l => this.isAuth = l);
  }

  logout(){
    this.login.logout();

  }
}
