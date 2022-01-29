import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent implements OnInit {

  public registerValid = false;
  public registerError = false;
  public username = '';
  public password = '';

  constructor( private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    let user:User = { email: this.username, password: this.password};
    this.loginService.register(user).subscribe(
      {next: ()=>{this.registerValid=true},
      error: err => {console.log('Register Error', err); this.registerError = true}});
  }
}
