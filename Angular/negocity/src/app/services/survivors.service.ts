import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap } from 'rxjs';
import { Survivor } from '../interfaces/survivor';

@Injectable({
  providedIn: 'root'
})
export class SurvivorsService {

  url = "https://dwec-daw-default-rtdb.firebaseio.com/negocity/survivors";

  constructor(private http: HttpClient) { }

  public getSurvivors(): Observable<Survivor[]> {
    return this.http.get<{ [key: string]: Survivor }>(this.url + ".json")
      .pipe(
        map(sObjecte => Object.entries(sObjecte)),
        map(sArray => sArray.map(s => { s[1].id = s[0]; return s[1] })));
  }

  /*
  servidor ->  {'s1': {name: 'sup1'}, 's2': {name: 'sup2'}}
  entries() ->  [['s1',{name: 'sup1'}],['s2',{name: 'sup2'}]]

  return   ->  [{id:'s1', name: 'sup1' },{}]

  */

  public getSurvivor(id: string): Observable<Survivor> {
    return this.http.get<Survivor>(`${this.url}/${id}.json`)
      .pipe(map(s => { s.id = id; return s }))
  }

  public createRandomSurvivor():Observable<Survivor[]> {
    let newSurvivor = {
      name: this.generateName(),
      image: '/assets/img/default-survivor.jpg',
      health: 50,
      city: '',
    }
    //console.log(newSurvivor);

    return this.http.post<Survivor>(this.url+'.json', JSON.stringify(newSurvivor))
    .pipe(mergeMap(()=> this.getSurvivors() ))
  }

  private generateName(): string {

    let first = ["Commander", "Bullet", "Imperator", "Doof", "Duff", "Immortal", "Big", "Grease", "Junk", "Rusty",                                                                                     "Gas", "War",
      "Feral", "Blood", "Lead", "Max", "Sprog", "Allan", "Smoke", "Wagon", "Baron", "Leather", "Rotten",
      "Salt","Slake", "Sick", "Sickly", "Nuke", "Oil", "Night", "Water", "Tank", "Rig", "People", "Nocturne",
      "Satanic", "Dead", "Wandering", "Suffering", "Unfit", "Deadly", "Mike", "Nomad", "Mad", "Jhonny", "Unpredictable",
      "Freakish", "Snake", "Praying"];
    let second = ["Killer", "Rider", "Cutter", "Guts", "Eater", "Warrior", "Colossus", "Blaster", "Gunner", "Smith",
      "Doe", "Farmer", "Rock", "Claw", "Boy", "Girl", "Driver", "Ace", "Quick", "Blitzer", "Fury", "Roadster",
      "Interceptor", "Bastich", "Dweller", "Thief", "Bleeder", "Face", "Mutant", "Anomaly", "Risk",
      "Garcia", "Salamanca", "Goodman", "Sakura", "Bleding Gums", "Absent", "Hybrid", "Desire", "Bubblegum"
      , "Serpente", "Petal", "Dust", "Mantis", "Preacher", "Harkonnen", "Heisenberg", "Vonn Newman"];

    return first[Math.floor(Math.random() * first.length)] + " " + second[Math.floor(Math.random() * second.length)];
  }


}
