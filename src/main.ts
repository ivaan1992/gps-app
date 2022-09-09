import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhYW4tbGctMTk5MiIsImEiOiJjbDdpYnp0eTIwNWxpM25xbW0yZmkxYWFpIn0.XEhoLzDFLhbG7pnt7PEARQ';

if(!navigator.geolocation) {
  alert('Browser does not support geolocation');
  throw new Error('Browser does not support geolocation');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
