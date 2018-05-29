import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { UserProvider } from '../providers/user/user';
import { CommunityResourceProvider } from '../providers/community-resource/community-resource';
import { GeolocationProvider } from '../providers/geolocation/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountSettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountSettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    CommunityResourceProvider,
    GeolocationProvider
  ]
})
export class AppModule {}
