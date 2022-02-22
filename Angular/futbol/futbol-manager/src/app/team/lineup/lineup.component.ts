import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/player/player.service';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {

  players: any[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.players.subscribe(p=> {this.players = p; console.log(p);
    });
    this.playerService.getLineup();
  }

}
