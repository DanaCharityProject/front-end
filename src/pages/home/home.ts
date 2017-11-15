import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AccountSettingsPage } from '../account-settings/account-settings';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  mapElement: HTMLElement;
  accountSettings =  AccountSettingsPage;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, public platform: Platform, public alertCtrl: AlertController) {
    platform.ready()
      .then(() => {
        this.loadMap();
      })
  }
  
  public places:Array<string> = ['Toronto', 'A', 'B'];
  public index:number = 1;
  previous() {
    this.index = this.index - 1;
    document.getElementById('map-box').innerHTML = this.places[this.index];
    
  }

  next() {
    this.index = this.index + 1;
    document.getElementById('map-box').innerHTML = this.places[this.index];
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      controls: {
        compass: false
      },
      camera: {
        target: {
          lat: 43.6532, 
          lng: -79.3832
        },
        zoom: 15,
        tilt: 0,
        bearing: -17 
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Toronto',
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: 43.6532, 
              lng: -79.3832
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

}
