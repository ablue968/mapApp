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
  zoomLvl: number = 16;
  center: [ number, number ] = [-2.4481710039666873, 42.46701780222979]

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', ()=>{});
    this.map.off('zoomend', ()=>{});
    this.map.off('move', ()=>{});
  }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLvl
      });

      this.map.on('zoom', ()=>{
        this.zoomLvl = this.map.getZoom();
      })

      //redirect zoom if exceeded

      this.map.on('zoomend', ()=>{
        if( this.map.getZoom() > 20 ){
          this.map.zoomTo( 20 )
        }
      })

      //mapa movement

      this.map.on('move', (event)=>{
        const target = event.target;
        const { lng, lat } = target.getCenter();
        this.center = [ lng, lat ]; 

      })
  }

  zoomScope( value: number ){
    this.map.zoomTo(value)
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
