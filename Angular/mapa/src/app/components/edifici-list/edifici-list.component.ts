import { Component, OnInit } from '@angular/core';
import { datos } from '../../datos';
import { IEdifici } from '../../interfaces/i-edifici';
import { EdificisService } from '../../services/edificis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edifici-list',
  templateUrl: './edifici-list.component.html',
  styleUrls: ['./edifici-list.component.css']
})
export class EdificiListComponent implements OnInit {

  title = 'mapa';
  datos: IEdifici[] = datos.features;
  datos_original: IEdifici[] = [...datos.features];
  filtre='';

  constructor(edificisServici: EdificisService,  private rutes: ActivatedRoute ){
    this.datos = edificisServici.getEdificis();
    this.datos_original =[...this.datos];
  }

  ngOnInit(): void {
    let i = 0;
    for(let dato of this.datos){
      dato.properties.ratting = Math.round(Math.random()*5)
      dato.listPosition = i;
      i++;
   }

   this.rutes.params.subscribe( params => { 
     if ('criteri' in params){
      // console.log(this.datos_original);
       
       this.datos = this.datos_original.filter(d=>
          d.properties.descripcio.includes(params['criteri'])
       );
      // console.log(this.datos);
       
     }
   })
  }

  filtrar = ()=>{
    this.datos = this.datos_original.filter(d=> d.properties.descripcio.includes(this.filtre))
  }

  ordenar = (criteri:string)=>{
    if(criteri=='posicio'){
      this.datos = this.datos.sort((a,b)=>{return a.listPosition! > b.listPosition! ? 1: -1})
    }
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

  canviarPosicio($event: number, punto: IEdifici){
    
      if ($event == 1){
        let posterior = this.datos.find(d=>{ d.listPosition == punto.listPosition!+1});
        console.log(posterior);
        
        posterior!.listPosition! = punto.listPosition!;
        punto.listPosition = punto.listPosition!+1;
      }
      if ($event == -1){
        let anterior = this.datos.find(d=>{ d.listPosition == punto.listPosition!-1});
        anterior!.listPosition! = punto.listPosition!;
        punto.listPosition = punto.listPosition!+1;
      }
      this.ordenar('posicio');

  }
}
