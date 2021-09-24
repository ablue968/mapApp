import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  api_url: String = environment.apiUrl;

  constructor( private http: HttpClient) { }

  getMarkers(): Observable<Marker[]>{
    return this.http.get<Marker[]>(`${this.api_url}/markers`)
  }

  addMarker(color: string, marker: mapboxgl.Marker): Observable<Marker>{
    return this.http.post<Marker>(`${this.api_url}/markers`, [color , marker])
  }
}
