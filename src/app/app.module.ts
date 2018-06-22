import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AccountSettingsPage } from '../pages/account-settings/account-settings';
import { UserProvider } from '../providers/user/user';
import { CommunityResourceProvider } from '../providers/community-resource/community-resource';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { EnvironmentsModule } from './env/env.module';
import { EditRadiusPage } from '../pages/edit-radius/edit-radius';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccountSettingsPage,
    RegistrationPage,
    LoginPage,
    MapPage,
    EditRadiusPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    EnvironmentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccountSettingsPage,
    RegistrationPage,
    LoginPage,
    MapPage,
    EditRadiusPage
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
