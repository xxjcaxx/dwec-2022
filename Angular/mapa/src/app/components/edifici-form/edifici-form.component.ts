import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edifici-form',
  templateUrl: './edifici-form.component.html',
  styleUrls: ['./edifici-form.component.css']
})
export class EdificiFormComponent implements OnInit {

  public descripcio: string='';
  constructor() { }

  ngOnInit(): void {
  }

}
