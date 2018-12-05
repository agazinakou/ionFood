import { MapsPage } from './../maps/maps';
import { OrderByPipe } from './../../pipes/order-by/order-by';
import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, LoadingController, ModalController, ActionSheetButton, ActionSheetController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Tchat } from '../../models/Tchat';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    private storage: Storage, private camera: Camera) {
    this.storage.get('user').then((val) => {
      if (val != null) {
        console.log('Your username is ', val);
        this.user = val;
      } else {
        this.navCtrl.pop();
      }
    });
  }
  logout(){
    this.navCtrl.setRoot('MapsPage');
    this.storage.clear();
  }

  ionViewWillEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });
    //loadingPopup.present();
    var test = this.afs.collection('tchats/', ref => ref.orderBy('sendDate', 'asc')).valueChanges().subscribe(articles_ => {
      this.arr = articles_;
      console.log(this.arr);
      //loadingPopup.dismiss()
    }, err => {
      //loadingPopup.dismiss();
      console.log(err);
    });;


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
        this.file = false;
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
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.file = true;
    }, (err) => {
      // Handle error
    });
  }

  useGallery(){
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth : 100,
      targetHeight : 100
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.file = true;
    }, (err) => {
      // Handle error
    });
  }

  close(){
    this.file = false;
    this.image = 'undefined';
  }




}
