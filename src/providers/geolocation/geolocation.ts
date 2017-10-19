import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  constructor(private geolocation: Geolocation) {
    console.log('Hello GeolocationProvider Provider');
  }

  getUserLocation(): Promise<Geoposition> {
    let userCoordinate: Promise<Geoposition>;
    this.geolocation.getCurrentPosition().then((resp) => {
      userCoordinate = resp;
    }).catch((error) => {
      console.log('Error getting location', error);
      });
    return userCoordinate;
  }

}
