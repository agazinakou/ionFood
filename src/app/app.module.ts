import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { MapsPage } from './../pages/maps/maps';
import { TutorialPage } from './../pages/tutorial/tutorial';
import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapsPage,
    LoginPage,
    TutorialPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapsPage,
    LoginPage,
    TutorialPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
