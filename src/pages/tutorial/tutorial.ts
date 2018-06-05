import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapsPage } from './../maps/maps';

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  collection : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.collection = [{
      title : 'Location',
      img: 'assets/imgs/locations.png',
    }, {
      title : 'Location',
      img: 'assets/imgs/signpost.png',      
    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }

  go(){
    this.navCtrl.setRoot(MapsPage);
  }

}
