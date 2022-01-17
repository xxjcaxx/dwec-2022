import { Component, Input, OnInit } from '@angular/core';
import { IEdifici } from 'src/app/interfaces/i-edifici';

@Component({
  selector: '[app-edifici]',
  templateUrl: './edifici.component.html',
  styleUrls: ['./edifici.component.css']
})
export class EdificiComponent implements OnInit {

  @Input() punto!: IEdifici;

  constructor() {

   }

  ngOnInit(): void {
  }

}
