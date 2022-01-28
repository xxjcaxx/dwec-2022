import { Component, Input, OnInit } from '@angular/core';
import { Survivor } from '../../../interfaces/survivor';

@Component({
  selector: 'app-survivor-item',
  templateUrl: './survivor-item.component.html',
  styleUrls: ['./survivor-item.component.css']
})
export class SurvivorItemComponent implements OnInit {

  @Input() survivor?: Survivor;

  constructor() { }

  ngOnInit(): void {
  }

}
