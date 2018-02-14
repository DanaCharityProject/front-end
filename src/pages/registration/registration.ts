import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
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
  @ViewChild(Slides) slides: Slides;
  formIn = {
      firstname: '',
      lastname: '',
      email: '',
      postal: '',
      password: '',
      password2: ''
    }
  registration2Page = Registration2Page;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }


  saveInfo(){
    console.log(this.formIn);
    this.validatePassword()

  }


  validatePassword(){
    if(this.formIn.password != this.formIn.password2){
      console.log("Passwords do not match")
      this.showToast("Passwords do not match")
    }else{
      let regexLength = new RegExp('^(?=.{8,})');
      let testLength = regexLength.test(this.formIn.password);

      let regexCapitals = new RegExp('^(?=.*[A-Z])');
      let testCapitals = regexCapitals.test(this.formIn.password);

      let regexNumbers = new RegExp('^(?=.*[0-9])');
      let testNumbers = regexNumbers.test(this.formIn.password);

      let regexLowerCase = new RegExp('^(?=.*[a-z])');
      let testLowerCase = regexLowerCase.test(this.formIn.password);

      if(!testLength){
        this.showToast("Password needs to be at least 8 characters long")
        console.log("Password too short");
      }
      else if(!testCapitals){
        this.showToast("Password needs to have at least one Capital letter")
        console.log("Password needs capitals");
      }
      else if(!testNumbers){
        this.showToast("Password needs to have at least one number")
        console.log("Password needs numbers");
      }
      else if(!testLowerCase){
        this.showToast("Password needs to have at least one lower case letter")
        console.log("Password needs lower case");
      }
    }
  }


  showToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  next(){
    this.slides.slideNext();
  }


 onSlideChangeStart(slider) {    
 }


}
