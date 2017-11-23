import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AccountSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html',
})

export class AccountSettingsPage {
  
    formIn = {
      name: '',
      p1: '',
      p2: ''
    }
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }
      
    saveInfo() {
      if(this.formIn.p1 == this.formIn.p2){
        console.log("MATCH");
        console.log("Name: " + this.formIn.name);
        console.log("P1: " + this.formIn.p1);
        console.log("P2: " + this.formIn.p2);
        const alert = this.alertCtrl.create({
          title: 'Saved!',
          subTitle: 'Your changes were recorded successfully.',
          buttons: ['OK']
        });
        alert.present();
      } else {
        const alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went wrong.',
          buttons: ['OK']
        });
        alert.present();
      }
    }
  }