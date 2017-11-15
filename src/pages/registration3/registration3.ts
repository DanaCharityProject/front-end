import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Registration3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration3',
  templateUrl: 'registration3.html',
})
export class Registration3Page {
  formIn = {
    firstname: '',
    lastname: '',
    email: '',
    postal: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let first = this.navParams.get('firstname');
    let last = this.navParams.get('lastname');
    let email = this.navParams.get('email');
    let postal = this.navParams.get('postal');
  	this.formIn.firstname = first;
  	this.formIn.lastname = last;
  	this.formIn.email = email;
  	this.formIn.postal = postal;
  }

   saveInfo(){
  	this.navCtrl.push(Registration3Page, this.formIn);
  }

}
