import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CitysService {

  url = "https://dwec-daw-default-rtdb.firebaseio.com/negocity/cities";

  constructor(private http: HttpClient) { }



  getCities():Observable<City[]>{
    return this.http.get<{[key: string]: City}>(this.url+".json")
    .pipe(
      map( sObjecte => Object.entries(sObjecte)),
      map( sArray => sArray.map(s=> { s[1].id = s[0]; return s[1]})) );
  }

  getCity(id:string):Observable<City>{
    return this.http.get<City>(`${this.url}/${id}.json`)
    .pipe(map(s=>{ s.id = id; return s} ))
  }



}
