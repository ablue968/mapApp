import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Marker } from './marker.interface';
import { MarkerService } from './marker.service';
@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.css']
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLvl: number = 16;
  center: [ number, number ] = [-2.4481710039666873, 42.46701780222979]

  //markerArr!: any[];
  markerArr: Marker[]= [];

  // constructor( public markerS: MarkerService ) {
  //   this.markerS.getMarkers().subscribe( res => this.markerArr = res);
    
  // }

  constructor(  ) {}

  ngAfterViewInit(): void {

    //map for the component
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLvl
    });

    this.getLocalStorage()
  }

  addMarker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.map );
    
    //this.markerS.addMarker(color, newMarker)
    // console.log(this.markerArr)
    //console.log(color, newMarker)
    this.markerArr.push({
      color,
      point: newMarker
    })

    //------------localStorage
    this.saveLocalStorage()

    newMarker.on('dragend', ()=>{
      this.saveLocalStorage();
    })
  }

  goToMarker( marker: mapboxgl.Marker ){
    this.map.flyTo({
      center: marker.getLngLat()
    })
  }


  //-------------con localStorage

  saveLocalStorage(){

    const lngLatArr: Marker[]= [];

    this.markerArr.forEach( m=>{
      const color = m.color;
      const {lng, lat} = m.point!.getLngLat()

      lngLatArr.push({
        color,
        center: [lng, lat]
      });

    })

    localStorage.setItem('markers', JSON.stringify(lngLatArr));

  }

  getLocalStorage(){
    if (!localStorage.getItem('markers')){
      return;
    }

    const lngLatArr: Marker[] = JSON.parse(localStorage.getItem('markers')! );

    lngLatArr.forEach( m =>{

      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: m.color
      })
        .setLngLat( m.center! )
        .addTo( this.map ); 

      this.markerArr.push({
        point: newMarker,
        color: m.color
      })

      newMarker.on('dragend', ()=>{
        this.saveLocalStorage();
      })


    })
    
  }

  deleteMarker(i: number){
    this.markerArr[i].point?.remove();
    this.markerArr.splice(i,1)
    this.saveLocalStorage();
  }

  

}




  // {
        //     "color": "#fe001a",
        //     "point": [-2.4481710039666873, 42.46701780222979]
        // }
