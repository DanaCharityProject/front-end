import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  registrationPage = RegistrationPage;
  loginPage = LoginPage;
  mapPage = MapPage;

  constructor(public navCtrl: NavController) {	
  	
  }

  ionViewDidEnter() {
  }

  exploreDana(){
  	this.navCtrl.setRoot(MapPage);
  }
  
}
