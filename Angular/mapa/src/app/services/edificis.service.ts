import { Injectable } from '@angular/core';
import { datos } from '../datos';
import { Edifici } from '../edifici';

@Injectable({
  providedIn: 'root'
})
export class EdificisService {

  constructor() { }

  getEdificis():Edifici[]{
    return datos.features;
  }
}
