import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  get userLocationReady(): boolean {
    return !!this. userLocation;
  }

  constructor() { this.getUserLocation() }

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
}
