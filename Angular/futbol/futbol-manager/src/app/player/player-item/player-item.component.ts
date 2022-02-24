import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { PlayerService } from '../player.service';

@Component({
  selector: '[app-player-item]',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {

  @Input() player:any = {};
  @Input() mode:string =  '';

  constructor(private playerService: PlayerService, private userService: UserService) { }

  ngOnInit(): void {
  }

  comprar(){
  console.log(this.userService.app.currentUser);
  
    
  }

}
