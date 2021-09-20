import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;

  constructor() { }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -2.4481710039666873, 42.46701780222979 ],
      zoom: 15
      });

  }

  zoom( scope: string ){
    if(scope === '+'){
      this.map.zoomIn()
    }
    if(scope === '-'){
      this.map.zoomOut()
    }
  }
}
