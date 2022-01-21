import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edifici-detail',
  templateUrl: './edifici-detail.component.html',
  styleUrls: ['./edifici-detail.component.css']
})
export class EdificiDetailComponent implements OnInit {

 map! : Map;
 id : number = 0;

  constructor(private rutes: ActivatedRoute) { }

  ngOnInit(): void {
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([7.0785, 51.4614]),
        zoom: 5
      })
    });


    this.rutes.params.subscribe( params => { this.id = params['id']})


  }

}
