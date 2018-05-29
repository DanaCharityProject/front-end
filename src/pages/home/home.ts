import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mapElement: HTMLElement;
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
        this.loadMap();

  }
  
  public places:Array<string> = ['Toronto', 'A', 'B'];
  public index:number = 1;
  previous() {
    this.index = (this.index - 1) % this.places.length;
    document.getElementById('map-box').innerHTML = this.places[this.index];
    
  }

  next() {
    this.index = (this.index + 1) % this.places.length;
    document.getElementById('map-box').innerHTML = this.places[this.index];
  }

  loadMap() {
    this.map = leaflet.map("map", {
      zoomControl: false
    }).fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Leaflet',
      maxZoom: 18
    }).addTo(this.map);
  }

}
