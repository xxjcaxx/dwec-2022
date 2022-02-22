import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  emailLogin: string = '';
  passLogin: string = '';

  emailReg: string = '';
  passReg: string = '';

  ngOnInit(): void {
   
  }

  login(){
    this.userService.login()
  }


  register(){
    //console.log(this.emailReg,this.passReg);
    
    this.userService.register(this.emailReg,this.passReg);
  }

}
