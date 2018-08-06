import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
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

  getUserLocation(): Promise<void> {
    return this.geolocation.getCurrentPosition().then((resp) => {
				 // resp.coords.latitude
				 // resp.coords.longitude
				}).catch((error) => {
				  console.log('Error getting location', error);
				});
  }

}
