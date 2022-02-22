import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Realm from 'realm-web';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players = new BehaviorSubject<any[]>([]);


  constructor(private http: HttpClient, private userService: UserService) {
  
  }

  async getLineup() {

    if(this.userService.logged.value){
      let app = this.userService.app;
      
     const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
     const equips = mongodb.db("futbol").collection("lineups");
     //https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document
     const result = await equips.findOne({user: '1'});
     console.log(result);
     const playersdb = mongodb.db("futbol").collection("players");
     let playersPromises = result.players.map((p: any)=> playersdb.findOne({id: p}))
     let playerList: any[] = await Promise.all(playersPromises);
     console.log(playerList);
     this.players.next(playerList);
     
    }
    
  }



}
