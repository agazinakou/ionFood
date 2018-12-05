import { GivePage } from './../pages/give/give';
import { BlogPage } from './../pages/blog/blog';
import { TchatPage } from './../pages/tchat/tchat';
import { AddPage } from './../pages/add/add';
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
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

//Firebase config
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapsPage,
    LoginPage,
    TutorialPage,
    AddPage,
    TchatPage,
    BlogPage,
    GivePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence() //.enablePersistence() 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapsPage,
    LoginPage,
    TutorialPage,
    AddPage,
    TchatPage,
    BlogPage,
    GivePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
