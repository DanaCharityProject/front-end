import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from  '../../providers/user/user';

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController, 
    public userProvider: UserProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }


  saveInfo(){
    console.log("Saving user info and calling registration function");
    if(this.validatePassword()){
		    this.userProvider.register(this.formIn.firstname, this.formIn.password, this.formIn.email).then((result) => {
          console.log(result);
          this.showToast("All good Nigga");
		    }, (err) => {
		      this.showToast(err);
		    });
    }

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
      }else{
        return true;
      }
        return false;

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
