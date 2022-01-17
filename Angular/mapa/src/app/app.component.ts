import { Component } from '@angular/core';
import { EdificisService } from './services/edificis.service';
import { Edifici } from './edifici';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapa';
  datos: Edifici[];
  datos_original: Edifici[];
  filtre='';

  constructor(edificisServici: EdificisService){

  this.datos = edificisServici.getEdificis();
  this.datos_original =[...this.datos];

  }

  filtrar = ()=>{
    this.datos = this.datos_original.filter(d=> d.properties.descripcio.includes(this.filtre))
  }

  ordenar = (criteri:string)=>{
    if(criteri=='nom'){
      this.datos = this.datos.sort((a,b)=>{return a.properties.descripcio > b.properties.descripcio ? 1: -1})
    }
    if(criteri=='id'){
      this.datos = this.datos.sort((a,b)=>{return a.properties.id > b.properties.id ? 1: -1})
    }
  }
}
