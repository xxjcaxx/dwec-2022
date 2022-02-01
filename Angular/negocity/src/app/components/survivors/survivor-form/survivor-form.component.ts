import { Component, Input, OnInit } from '@angular/core';
import { Survivor } from '../../../interfaces/survivor';

@Component({
  selector: 'app-survivor-form',
  templateUrl: './survivor-form.component.html',
  styleUrls: ['./survivor-form.component.css']
})
export class SurvivorFormComponent implements OnInit {

  @Input() survivor!: Survivor;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
