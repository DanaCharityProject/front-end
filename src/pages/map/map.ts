import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { CommunityResourceProvider, CommunityResource } from '../../providers/community-resource/community-resource';
import { CommunityProvider, Community } from '../../providers/community/community';
import { EditRadiusPage } from '../../pages/edit-radius/edit-radius';

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

  public radius: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public communityResourceProvider: CommunityResourceProvider, public communityProvider: CommunityProvider) {}

  ionViewDidEnter() {
    this.loadMap();
  }

  previous() {
    this.index -= ((this.index - 1) >= 0) ? 1 : 0;
  }

  next() {
    this.index += ((this.index + 1) < this.communities.length) ? 1 : 0;
  }

  editRadius() {
    let editRadiusModal = this.modalCtrl.create(EditRadiusPage, { "radius": this.radius }, { showBackdrop: true, enableBackdropDismiss: false, cssClass: "myModal" });
    editRadiusModal.onDidDismiss(data => {
      this.radius = data.radius;
    });
    editRadiusModal.present();
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

    this.map.locate({setView: true, watch: true, maxZoom: 16})
    .on('locationfound', function(e){
      console.log ("location received")
    })
    .on('locationerror', function(e){
      console.log(e);
    });

    let charIcon = leaflet.icon({
      iconUrl: '../assets/images/icon.png',
      iconSize:     [50, 50], 
      /*iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location*/
      popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });

    this.communityResourceProvider.get_nearby_communityresource(43.65357, -79.38394, 1)
      .then((communityResources: CommunityResource[]) =>
        communityResources.forEach(communityResource => {
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
}
