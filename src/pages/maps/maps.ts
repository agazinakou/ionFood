import { TchatPage } from './../tchat/tchat';
import { GivePage } from './../give/give';
import { BlogPage } from './../blog/blog';
import { AddPage } from './../add/add';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IonicPage, LoadingController, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Items } from './../../models/items';
import { Storage } from '@ionic/storage';




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
  markerSelected: boolean = false;

  //******************** Map style  **************************//
  //*****  Ggo to snazzymaps.com for mor map styles  ********//
  //**********************************************************//
  mapStyle: any = [{ "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "color": "#faf5ed" }, { "lightness": "0" }, { "gamma": "1" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#bae5a6" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "weight": "1.00" }, { "gamma": "1.8" }, { "saturation": "0" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ffb200" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "lightness": "0" }, { "gamma": "1" }] }, { "featureType": "transit.station.airport", "elementType": "all", "stylers": [{ "hue": "#b000ff" }, { "saturation": "23" }, { "lightness": "-4" }, { "gamma": "0.80" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#a0daf2" }] }];

  //mapStyle: any = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}];

  public infoWindows: any = [];

  arr : any;

  constructor(public navCtrl: NavController, private afs: AngularFirestore, 
  public navParams: NavParams, public loadingCtrl : LoadingController,
  public geolocation : Geolocation, public modalCtrl: ModalController,
  private storage: Storage, public alertCtrl : AlertController) {

  }


  ionViewWillEnter() {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'dots',
      content: ''
    });
    loadingPopup.present();
    this.itemsCollection = this.afs.collection('items'); //ref()
    this.collection = this.itemsCollection.valueChanges().subscribe(subCategory => {
      this.arr = subCategory;
      this.displayGoogleMap();
      loadingPopup.dismiss()
    });

    setTimeout(() => {
      loadingPopup.dismiss();
    }, 2000);

  }


  displayGoogleMap() {
    let latLng = new google.maps.LatLng(5.3711452, -3.9956922);
    console.log(latLng);
    let mapOptions = {
      center: latLng,
      zoom: 12,
      styles: this.mapStyle,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarkersToMap();
  }

  addMarkersToMap() {
    for (let item of this.arr) {
      console.log(item);
      var position = new google.maps.LatLng(item.lat, item.lng);
      var mapMarker = new google.maps.Marker({
        position: position,
        animation: google.maps.Animation.DROP,
        markerSelected: true,
        description: item.description,
        name: item.name,
        //**** Custom Marker Symbols ****/
        //icon:  'assets/red_pin72x96.png'
        icon: {
          url: 'assets/red_pin72x96.png',
          //The size image file.
          size: new google.maps.Size(72, 96),
          // we want to render @ 30x30 logical px (@2x dppx or 'Retina')
          scaledSize: new google.maps.Size(40, 52),
          //The point on the image to measure the anchor from. 0, 0 is the top left.
          origin: new google.maps.Point(0, 0),
          //The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.
          anchor: new google.maps.Point(20, 40),
          labelOrigin: new google.maps.Point(20, 12)
        },
        anchorPoint: new google.maps.Point(0, -40)
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
      this.map.setCenter(position);
    }

  }


  addInfoWindowToMarker(marker) {

    var infoWindowContent = '<div id="iw-container">' +
      '<div class="iw-content">' +
      '<div class="iw-subTitle">' + marker.description + '</div>' +
      '</div>' +
      //'<div id="do-something-button">button</div>' +
      '</div>';

    var infoWindow = new google.maps.InfoWindow();
    // infoWindow.setOptions({
    //     disableAutoPan:false
    // }); 
    infoWindow.setContent(infoWindowContent);

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
      // add listener that will capture the click event of the infoWindow
      // google.maps.event.addListener(infoWindow, 'domready', () => {
      //   document.getElementById('do-something-button').addEventListener('click', () => {
      //      this.doSomething();
      //   });
      // }); 

    });
    this.infoWindows.push(infoWindow);
  }

  doSomething() {
    console.log("doSomething");
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  add(){
    const modal = this.modalCtrl.create(AddPage);
    modal.present();
  }

  tchat(){
    this.storage.get('user').then((val) => {
      if(val != null){
        console.log('Your username is ', val);
        this.navCtrl.push(TchatPage);
      } else {
        this.setUser();
      }
    });
  }

  setUser() {
    const prompt = this.alertCtrl.create({
      title: 'Nouveau utilisateur',
      message: "Saisissez votre prénom pour entrer dans le tchat",
      inputs: [
        {
          name: 'user',
          placeholder: 'Mon prénom'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Entrer',
          handler: data => {
            this.storage.set("user", data.user);
            this.navCtrl.push(TchatPage);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  blog(){
    this.navCtrl.push(BlogPage);
  }

  give(){
    this.navCtrl.push(GivePage);
  }

}
