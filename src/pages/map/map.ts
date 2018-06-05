import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";

import leaflet from 'leaflet';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  public region: string = "Toronto";
  public communities:Array<string> = ['The Annex', 'Riverside', 'Regent Park'];
  public index:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter() {
    this.loadMap();
  }

  previous() {
    this.index = (this.index - 1) % this.communities.length;
  }

  next() {
    this.index = (this.index + 1) % this.communities.length;
  }

  loadMap() {
    this.map = leaflet.map("map", {
      zoomControl: false
    }).setView([43.65357, -79.38394], 14);

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Leaflet',
      maxZoom: 18
    }).addTo(this.map);
  }
}
