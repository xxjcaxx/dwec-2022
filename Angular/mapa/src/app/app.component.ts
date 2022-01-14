import { Component } from '@angular/core';
import { datos } from './datos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapa';
  datos = datos;
  datos_original = {...datos};
  filtre='';

  filtrar = ()=>{
    this.datos.features = this.datos_original.features.filter(d=> d.properties.descripcio.includes(this.filtre))
  }

  ordenar = (criteri:string)=>{
    if(criteri=='nom'){
      this.datos.features = this.datos.features.sort((a,b)=>{return a.properties.descripcio > b.properties.descripcio ? 1: -1})
    }
    if(criteri=='id'){
      this.datos.features = this.datos.features.sort((a,b)=>{return a.properties.id > b.properties.id ? 1: -1})
    }
  }
}
