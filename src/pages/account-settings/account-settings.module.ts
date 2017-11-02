import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountSettingsPage } from './account-settings';
import { AlertController } from 'ionic-angular';

@NgModule({
  declarations: [
    AccountSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountSettingsPage),
  ],
})
export class AccountSettingsPageModule {

  constructor(public alertCtrl: AlertController) {}

  infoSavedAlert() {
    const alert = this.alertCtrl.create({
      title: 'Saved!',
      subTitle: 'Your changes were recorded successfully.',
      buttons: ['OK']
    });
    alert.present();
  }

}
