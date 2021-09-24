import * as mapboxgl from 'mapbox-gl';

export interface Marker {
    color: string;
    point?: mapboxgl.Marker;
    center?: [number, number]
}
