import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Articles } from './../../models/articles';

/**
 * Generated class for the BlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {

  itemsCollection: AngularFirestoreCollection<Articles>; //Firestore collection
  items: Observable<Articles[]>; // read collection
  collection: any; // read collection

  arr : any;

  constructor(public navCtrl: NavController, private afs: AngularFirestore,
    public navParams: NavParams, public loadingCtrl: LoadingController, 
    public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });
    loadingPopup.present();
    this.itemsCollection = this.afs.collection('articles'); //ref()
    this.collection = this.itemsCollection.valueChanges().subscribe(articles_ => {
      this.arr = articles_;
      loadingPopup.dismiss()
    });

  }


}
