import { Component, Input, OnInit, Output } from '@angular/core';
import { IEdifici } from 'src/app/interfaces/i-edifici';
import { EventEmitter } from '@angular/core';

@Component({
  selector: '[app-edifici]',
  templateUrl: './edifici.component.html',
  styleUrls: ['./edifici.component.css']
})
export class EdificiComponent implements OnInit {

  @Input() punto!: IEdifici;
  @Output() nameChanged = new EventEmitter<string>();
  name : string;
  ratting : number;



  constructor() {
   this.name = '';
   this.ratting = 0;
   }

  ngOnInit(): void {
    this.name = this.punto.properties.descripcio;
    this.ratting = this.punto.properties.ratting ? this.punto.properties.ratting : 0;
  }

  canviarNom(){
    this.nameChanged.emit(this.name);
  }

}
