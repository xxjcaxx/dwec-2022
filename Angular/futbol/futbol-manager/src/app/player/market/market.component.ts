import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  players:any[] = [];



  ngOnInit(): void {
    this.playerService.players.subscribe(p=> {this.players = p; //console.log(p);
    });
    this.playerService.getMarket();
  }

}
