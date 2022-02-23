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


  async getMarket() {

    if(this.userService.logged.value){
      let app = this.userService.app;
      
     const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
     const playersdb = mongodb.db("futbol").collection("players");
     const randomPlayers = await playersdb.aggregate([{ $sample: { size: 20 } }]);
  
     
     this.players.next(randomPlayers);
     //console.log(randomPlayers);
     const imgsdb = mongodb.db("futbol").collection("images");
     randomPlayers.map((p: { id: any; imagebase64: any; name: string})=>{
       imgsdb.findOne({player: p.id}).then(i => {p.imagebase64 = `data:image/png;base64, ${i.img}`;});
       this.players.next(randomPlayers);
     });
     
    }
    
  }



}
