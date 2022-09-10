import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  goToMyLocation() {
    if(!this.placesService.userLocationReady) throw Error('Could not find user location');
    if(!this.mapService.isMapReady) throw Error('Map has not been initialized');

    this.mapService.flyTo(this.placesService.userLocation!);
  }

}
