import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

declare var CinetPay;


@IonicPage()
@Component({
  selector: 'page-give',
  templateUrl: 'give.html',
})
export class GivePage {

  private CinetPay: any;

  private apikey: string = '5579980505863a3f6aabd82.89189525';
  private site_id: number = 659913;
  private notify_url: string = 'https://YOUR_NOTIFY_URL';

  private trans_id: any;
  private cpm_custom: any;
  private designation: any;
  private currency: string = 'CFA';

  amount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public toastCtrl : ToastController) {
  }


  form() {
    if (this.amount == null || this.amount == '') {
      let toast = this.toastCtrl.create({
        message: 'Le montant est obligatoire',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      toast.present();
    } else {
      this.amount = parseInt(this.amount);
      this.designation = 'don de ' + this.amount + ' à partir de GarbaMap';
      this.seamless();

    }
  }

  seamless() {
    CinetPay.setConfig({
      apikey: this.apikey,
      site_id: this.site_id,
      notify_url: this.notify_url
    });
    //Lorsque la signature est généré
    CinetPay.on('signatureCreated', function (token) {
      console.log('Tocken généré: ' + token);
    });
    CinetPay.on('paymentPending', function (e) {

    });
    CinetPay.on('paymentSuccessfull', function (paymentInfo) {

    });

    CinetPay.setSignatureData({
      amount: this.amount,
      trans_id: window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now(),
      currency: this.currency,
      designation: this.designation,
      custom: this.cpm_custom
    });

    CinetPay.getSignature();

  }


}
