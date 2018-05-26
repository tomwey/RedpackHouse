import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the RedpackCreatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-created',
  templateUrl: 'redpack-created.html',
})
export class RedpackCreatedPage {

  redpack: any = null;
  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
      this.redpack = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackCreatedPage');
  }

  close() {
    this.viewCtrl.dismiss().catch(error => {});
  }

  copy() {
    this.copyTextToClipboard(this.redpack.detail_url);
  }

  copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
  
    textArea.style.position = 'fixed';
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = "0";
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      let toast = this.toastCtrl.create({
        message: '复制成功！',
        duration: 1000
      });
      toast.present();
    } catch (err) {
      // console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  }

}
