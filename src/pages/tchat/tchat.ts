import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, LoadingController, ModalController, ActionSheetButton, ActionSheetController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Tchat } from '../../models/Tchat';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tchat',
  templateUrl: 'tchat.html',
})
export class TchatPage {

  @ViewChild(Content) content: Content;


  itemsCollection: AngularFirestoreCollection<Tchat>; //Firestore collection
  items: Observable<Tchat[]>; // read collection
  collection: any; // read collection

  arr: any;
  image: any = 'undefined';
  message: any;
  user: any;
  type: any = 'Join';
  date_: any = "09/06/2018";

  file : boolean = false;

  constructor(public navCtrl: NavController, private afs: AngularFirestore,
    public navParams: NavParams, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public actionSheetCtrl : ActionSheetController,
    private storage: Storage, ) {
    this.storage.get('user').then((val) => {
      if (val != null) {
        console.log('Your username is ', val);
        this.user = val;
      } else {
        this.navCtrl.pop();
      }
    });
  }

  ionViewWillEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });
    //loadingPopup.present();
    this.itemsCollection = this.afs.collection('tchats/'); //ref()
    this.collection = this.itemsCollection.valueChanges().subscribe(articles_ => {
      this.arr = articles_;
      //loadingPopup.dismiss()
    }, err=> {
      //loadingPopup.dismiss();
      console.log(err);
    });

  }


  send() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });

    loading.present();

    this.itemsCollection = this.afs.collection('tchats/')
    this.itemsCollection.add({
      type: this.type,
      user: this.user,
      message: this.message,
      image: this.image,
      sendDate: Date()
    })
      .then((result) => {
        this.message = '';
        loading.dismiss();
      })
      .catch((error) => {
        loading.dismiss();
      });
  }

  media() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Partager une photo',
      buttons: [
        {
          text: 'Appareil photo',
          icon : 'camera',
          handler: () => {
            this.useCamera();
            console.log('Destructive clicked');
          }
        }, {
          text: 'Galerie',
          icon : 'image',
          handler: () => {
            this.useGallery();
            console.log('Archive clicked');
          }
        }, {
          text: 'Anuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  useCamera(){
    this.image = 'assets/imgs/no_image.png';
    this.file = true;
  }

  useGallery(){
    
  }

  close(){
    this.file = false;
  }




}
