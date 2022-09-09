import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { this.getUserLocation() }

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

    this.loadPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&types=place%2Cpostcode%2Caddress&language=en&access_token=pk.eyJ1IjoiaXZhYW4tbGctMTk5MiIsImEiOiJjbDdpYnp0eTIwNWxpM25xbW0yZmkxYWFpIn0.XEhoLzDFLhbG7pnt7PEARQ`)
    .subscribe(resp => {
      console.log(resp.features)
      this.loadPlaces = false;
      this.places = resp.features;
    });
  }
}
