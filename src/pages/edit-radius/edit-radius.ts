import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

const maxRadius = 10;
/**
 * Generated class for the EditRadiusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-radius',
  templateUrl: 'edit-radius.html',
})
export class EditRadiusPage {
  private radius: number;
  private metricUnit: string;


  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.radius = navParams.get("radius");
    this.metricUnit = navParams.get("metricUnit");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRadiusPage');
  }

  dismissDontSave() {
    this.viewCtrl.dismiss({ "radius": this.navParams.get("radius") });
  }

  dismissSave() {
    if(this.radius == maxRadius){
      this.metricUnit = "km";
      this.viewCtrl.dismiss({ "radius": 1, "metricUnit": this.metricUnit });
    }else{
      this.metricUnit = "m";
      this.viewCtrl.dismiss({ "radius": this.radius, "metricUnit": this.metricUnit });
    }
 }
}
