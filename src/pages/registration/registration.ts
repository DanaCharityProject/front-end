import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Registration2Page } from '../registration2/registration2';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  formIn = {
      firstname: '',
      lastname: '',
      email: '',
      postal: '',
      password: '',
      password2: ''
    }
  registration2Page = Registration2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  saveInfo(){
    console.log(this.formIn);
    let regexp = new RegExp('^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{6,15}$');
    let test = regexp.test(this.formIn.firstname);
    if(!test){
      console.log("Password not valid");
    }
  }

 onSlideChangeStart(slider) {
    
 }


}
