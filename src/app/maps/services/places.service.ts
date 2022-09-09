import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public loadPlaces: boolean = false;
  public places: Feature[] = [];

  get userLocationReady(): boolean {
    return !!this. userLocation;
  }

  constructor(private placesApi: PlacesApiClient ) { this.getUserLocation() }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (error) => {
          alert('Could not obtain user`s geolocation');
          console.log(error);
          reject();
        }
      )
    })
  }

  getPlacesByQuery(query: string = '') {
    if(!this.userLocation) throw Error('We could not find user location')

    this.loadPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe(resp => {
      console.log(resp.features)
      this.loadPlaces = false;
      this.places = resp.features;
    });
  }
}
