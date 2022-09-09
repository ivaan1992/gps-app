import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor( private placesService: PlacesService ) { }

  ngAfterViewInit(): void {
    if( !this.placesService.userLocation ) throw Error('We could not find placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: this.placesService.userLocation,
      zoom: 14,
    });

    const popup = new Popup()
    .setHTML(`
      <h6>You are here</h6>
    `)

    new Marker({ color: 'red' })
    .setLngLat(this.placesService.userLocation)
    .setPopup(popup)
    .addTo(map)

  }
}
