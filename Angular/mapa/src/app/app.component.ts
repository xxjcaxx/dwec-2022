import { Component, OnInit } from '@angular/core';
import { datos } from './datos';
import { IEdifici } from './interfaces/i-edifici';
import { EdificisService } from './services/edificis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mapa';
  datos: IEdifici[] = datos.features;
  datos_original: IEdifici[] = [...datos.features];
  filtre='';

  constructor(edificisServici: EdificisService){
    this.datos = edificisServici.getEdificis();
    this.datos_original =[...this.datos];
  }

  ngOnInit(): void {
   for(let dato of this.datos){
      dato.properties.ratting = Math.round(Math.random()*5)
   }
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

  canviarNom($event: string,punto: IEdifici){
    punto.properties.descripcio = $event;
  }

  canviarRatting($event: number,punto: IEdifici){
    punto.properties.ratting = $event;
  }
}
