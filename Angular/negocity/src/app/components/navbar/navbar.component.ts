import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private login: LoginService, private router: Router) { }
  isAuth: boolean = false;

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('idToken') ? true : false;
    this.login.logged.subscribe(l => this.isAuth = l);
  }

  logout(){
    this.login.logout();
    this.router.navigate(['/home']);
  }
}
