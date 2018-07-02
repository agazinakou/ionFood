import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Items } from './../../models/items';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {


  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  items: Observable<Items[]>; // read collection
  collection: any; // read collection

  description : any;
  lat : any;
  lng : any;


  constructor(public navCtrl: NavController, public viewCtrl : ViewController,  
  private afs: AngularFirestore, public navParams: NavParams, 
  public loadingCtrl : LoadingController, public geolocation : Geolocation, 
    public modalCtrl: ModalController, public toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  _add(){
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });

    loading.present();
    
    this.itemsCollection = this.afs.collection('items')
    this.itemsCollection.add({
      description: this.description,
      lat: this.lat,
      lng : this.lng,
    })
    .then((result) => {
      loading.dismiss();
      this.msg("Document addded with id >>> " + result.id);
    })
    .catch((error) => {
      loading.dismiss();
      this.msg("Error adding document: " + error);
    });
  }

  msg(m) {
    const toast = this.toastCtrl.create({
      message: m,
      duration: 3000,
      position : 'bottom'
    });
    toast.present();
  }

}
