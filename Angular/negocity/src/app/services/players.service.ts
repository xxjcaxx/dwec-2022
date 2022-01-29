import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Player } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  url = "https://dwec-daw-default-rtdb.firebaseio.com/negocity/cities";

  constructor(private http: HttpClient) { }

  getPlayers():Observable<Player[]>{
    return this.http.get<{[key: string]: Player}>(this.url+".json")
    .pipe(
      map( sObjecte => Object.entries(sObjecte)),
      map( sArray => sArray.map(s=> { s[1].id = s[0]; return s[1]})) );
  }

  getPlayer(id:string):Observable<Player>{
    return this.http.get<Player>(`${this.url}/${id}.json`)
    .pipe(map(s=>{ s.id = id; return s} ))
  }


}