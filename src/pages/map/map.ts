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

    leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiZGFuYXRlc3QiLCJhIjoiY2ppbmcxaXB6MGIwNDNrbzc0cWQzb2d4cSJ9.hqahFzlxsbPWRbnuCFU8xg'
    }).addTo(this.map);

    let charIcon = leaflet.icon({
      iconUrl: '../assets/images/icon.png',
      iconSize:     [50, 50], 
      /*iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location*/
      popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });

    const array = [{name: "Good Charity", coordinates: [43.65357, -79.38394], address: '123 Charity St.', phone: '416-123-4567'}, {name: "Cool Charity", coordinates: [43.65707099999999, -79.40551399999998], address: '123 Charity St.', phone: '416-123-4567'}, {name: "Nice Charity", coordinates: [43.6420785, -79.40172150000001], address: '123 Charity St.', phone: '416-123-4567'}, {name: "Happy Charity", coordinates: [43.6473763, -79.40252959999998], address: '123 Charity St.', phone: '416-123-4567'}];
    
    array.forEach(element => {
      let marker = leaflet.marker(element.coordinates, {icon: charIcon}).addTo(this.map);
      marker.bindPopup("<b>"+element.name+"</b><br>Address: "+element.address+"<br>Ph: "+element.phone, {'maxWidth':'500', 'className' : 'custom'}).openPopup();
    });
  }
}
