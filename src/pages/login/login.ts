import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { UserProvider } from  '../../providers/user/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {
    username: '',
    email: '',
    password: ''
  }	

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
  	this.userProvider.login(this.credentials.username, this.credentials.password).then((result) => {
          console.log(result);
        }, (err) => {
          console.log(err);
        });
  }


}
