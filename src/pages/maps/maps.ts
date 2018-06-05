import { Items } from './../../models/items';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  items: Observable<Items[]>; // read collection
  collection: any; // read collection

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapDetail: any;

  constructor(public navCtrl: NavController, private afs: AngularFirestore, 
  public navParams: NavParams, public loadingCtrl : LoadingController,
  public geolocation : Geolocation) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();

    loadingPopup.dismiss()


  }


  ionViewWillEnter() {

    try {
      this.itemsCollection = this.afs.collection('items'); //ref()
      this.collection = this.itemsCollection.valueChanges();   
    } catch (error) {
      console.log(error);
    }

  }

}
