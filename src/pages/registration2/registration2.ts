import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Registration3Page } from '../registration3/registration3';

/**
 * Generated class for the Registration2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration2',
  templateUrl: 'registration2.html',
})
export class Registration2Page {
  formIn = {
    firstname: '',
    lastname: '',
    email: '',
    postal: ''
  }
  registration3Page = Registration3Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let first = this.navParams.get('firstname');
    let last = this.navParams.get('lastname');
  	this.formIn.firstname = first;
  	this.formIn.lastname = last;
  }

  saveInfo(){
  	this.navCtrl.push(Registration3Page, this.formIn);
  }


}
