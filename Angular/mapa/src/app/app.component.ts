import { Component } from '@angular/core';
import { datos } from './datos';
import { IEdifici } from './interfaces/i-edifici';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapa';
  datos: IEdifici[] = datos.features;
  datos_original: IEdifici[] = [...datos.features];
  filtre='';

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
