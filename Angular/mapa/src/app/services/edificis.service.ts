import { Injectable } from '@angular/core';
import { datos } from '../datos';
import { IEdifici } from '../interfaces/i-edifici';

@Injectable({
  providedIn: 'root'
})
export class EdificisService {

  constructor() { }

  getEdificis():IEdifici[]{
    return datos.features;
  }

  getEdifici(id:number):IEdifici | undefined{
    return datos.features.find(d=> d.properties.id == id);
  }
}
