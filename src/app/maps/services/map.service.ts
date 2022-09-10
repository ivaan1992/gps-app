import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map


  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map ) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if(!this.isMapReady) throw Error ('Map is not initialized');

    this.map?.flyTo({
      zoom: 15,
      center: coords
    });
  }
}
