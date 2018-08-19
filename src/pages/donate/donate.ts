import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { List } from 'ionic-angular';

/**
 * Generated class for the DonatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {
	private resources: any;
	private resourceNames: any;
	private amount: 5;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  	this.resources = navParams.get("resources");
  	this.resourceNames = navParams.get("names");
  	console.log(this.resourceNames);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatePage');
  }

  dismissDontSave() {
    this.viewCtrl.dismiss();
  }

  donate() {
  	console.log(this.amount);
  }

}
