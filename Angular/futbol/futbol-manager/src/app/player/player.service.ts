import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Realm from 'realm-web';
import { UserService } from '../user/user.service';
import { IPlayer } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players = new BehaviorSubject<IPlayer[]>([]);


  constructor(private http: HttpClient, private userService: UserService) {
  
  }

  async getLineup() {

    if(this.userService.logged.value){
      let app = this.userService.app;
      
     const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
     const equips = mongodb.db("futbol").collection("lineups");
     //https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document
    
     try {
      const result = await equips.findOne({user: app.currentUser!.id});
      console.log(result);
      const playersdb = mongodb.db("futbol").collection("players");
      let playersPromises = result.players.map((p: any)=> playersdb.findOne({id: p}))
      let playerList: any[] = await Promise.all(playersPromises);
      console.log(playerList);
      this.players.next(playerList);
     }catch (error) {
       console.log(error);
     }
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

  async buyplayer(id:string,lineup:any){
    if(this.userService.logged.value){
      let app = this.userService.app;
      
      const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
      const playersdb = mongodb.db("futbol").collection("players");
      const equipsdb = mongodb.db("futbol").collection("lineups");

      const player = await playersdb.findOne({id: id});
      const newPlayers = [...lineup.players,player]
      await equipsdb.updateOne({user: lineup.user},{$set: {players: newPlayers}})


    }
  }



}
