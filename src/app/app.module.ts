import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { CommunityResourceProvider } from '../providers/community-resource/community-resource';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { RegistrationPage } from '../pages/registration/registration'
import { Registration2Page } from '../pages/registration2/registration2'
import { Registration3Page } from '../pages/registration3/registration3'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrationPage,
    Registration2Page,
    Registration3Page

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrationPage,
    Registration2Page,
    Registration3Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    CommunityResourceProvider,
    GeolocationProvider
  ]
})
export class AppModule {}
