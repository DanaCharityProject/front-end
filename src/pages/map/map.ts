import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { CommunityResourceProvider, CommunityResource } from '../../providers/community-resource/community-resource';
import { CommunityProvider, Community } from '../../providers/community/community';
import { EditRadiusPage } from '../../pages/edit-radius/edit-radius';
import { DonatePage } from '../../pages/donate/donate';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

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
  public communities:Array<string> = [];
  public index:number = 0;

  public radius: number = 300;
  public metricUnit: string = "m";

  lat: any;
  lng: any;
  marker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public modalCtrl: ModalController, 
              public communityProvider: CommunityProvider,
              public communityResourceProvider: CommunityResourceProvider,
              private geolocation: Geolocation) {}

  ionViewDidEnter() {
    this.loadMap();
  }


  ionViewDidLoad(){
    let geoMarker = leaflet.icon({
      iconUrl: '../assets/images/currPos.png',
      iconSize:     [50, 50], 
      //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location*/
      popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });
    this.geolocation.getCurrentPosition().then((pos) => {
         this.lat = pos.coords.latitude;
         this.lng = pos.coords.longitude;
         this.marker = leaflet.marker([this.lat, this.lng], {icon: geoMarker}).addTo(this.map);   
         this.centerLeafletMapOnMarker(this.map, this.marker);
        }).catch((error) => {
          console.log('Error getting location', error);
        });
  }


  recenterMap() {
    this.geolocation.getCurrentPosition().then((pos) => {
      this.marker.setLatLng({lon: this.lng, lat: this.lat });
      this.centerLeafletMapOnMarker(this.map, this.marker);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  private centerLeafletMapOnMarker(map, marker) {
    var latLngs = [ marker.getLatLng() ];
    var markerBounds = leaflet.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  }

  previous() {
    this.index -= ((this.index - 1) >= 0) ? 1 : 0;
  }

  next() {
    this.index += ((this.index + 1) < this.communities.length) ? 1 : 0;
  }

  editRadius() {
    let radius_int = this.getRadiusInt();
    let editRadiusModal = this.modalCtrl.create(EditRadiusPage, { "radius": radius_int, "metricUnit": this.metricUnit }, { showBackdrop: true, enableBackdropDismiss: false, cssClass: "myModal" });
    editRadiusModal.onDidDismiss(data => {
      this.metricUnit = data.metricUnit;
      if(this.metricUnit == "km"){
        this.radius = 1;
      }else{
        this.radius = data.radius*100;
      }
    });
    editRadiusModal.present();
  }

  getRadiusInt(){
    return this.radius == 1 ? 10 : this.radius/100;
  }

  loadMap() {
    this.map = leaflet.map("map", {
      zoomControl: false
    }).setView([43.65357, -79.38394], 14)

    leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      attributions: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiZGFuYXRlc3QiLCJhIjoiY2ppbmcxaXB6MGIwNDNrbzc0cWQzb2d4cSJ9.hqahFzlxsbPWRbnuCFU8xg'
    }).addTo(this.map);

    //leaflet.control.locate().addTo(this.map);
    
    let charIcon = leaflet.icon({
      iconUrl: '../assets/images/icon.png',
      iconSize:     [50, 50], 
      /*iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location*/
      popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });

    this.communityResourceProvider.get_nearby_communityresource(this.lat, this.lng, this.getRadiusInt())
      .then((communityResources: CommunityResource[]) =>
        communityResources.forEach(communityResource => {
          console.log(communityResource);
          let marker = leaflet.marker(communityResource.location, {icon: charIcon}).addTo(this.map);
          marker.bindPopup("<b>"+communityResource.name+"</b><br>"+communityResource.address, {'maxWidth':'500', 'className' : 'custom'}).openPopup();
        }))
      .catch(e => console.log(e));

    this.communityProvider.get_all_communities()
      .then((communities: Community[]) =>
        communities.forEach(community => {
          this.communities.push(community.name);
          let multipolygon = leaflet.polygon(community.boundaries['coordinates'], {color: 'pink'}).addTo(this.map);
          multipolygon.bindPopup("<b>"+community.name+"</b>", {'maxWidth':'500', 'className' : 'custom'}).openPopup();
        }))
      .catch(e => console.log(e));
  }  

  donate(){
    let resources = [];
    //let resourceNames = ['a','b','c'];
    let resourceNames = [];
    console.log(this.getRadiusInt())
    this.communityResourceProvider.get_nearby_communityresource(this.lat, this.lng, this.getRadiusInt())
      .then((communityResources: CommunityResource[]) =>
        communityResources.forEach(communityResource => {
          resources.push(communityResource);
          resourceNames.push(communityResource.name);
    }));
    let donateModal = this.modalCtrl.create(DonatePage, { "resources": resources, 
      "names": resourceNames }, { showBackdrop: true, enableBackdropDismiss: false, cssClass: "myModal" });
    donateModal.onDidDismiss(data => {
      // this.metricUnit = data.metricUnit;
      // if(this.metricUnit == "km"){
      //   this.radius = 1;
      // }else{
      //   this.radius = data.radius*100;
      // }
    });
    donateModal.present();
  }
}
