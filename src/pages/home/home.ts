import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  registrationPage = RegistrationPage;
  loginPage = LoginPage;

  constructor(public navCtrl: NavController) {	
  	
  }

}
