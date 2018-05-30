import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, App } from 'ionic-angular';
import { AppManager } from '../../provider/AppManager';
import { Redpacks } from '../../provider/Redpacks';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the RedpackOwnerScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-redpack-owner-scan',
  templateUrl: 'redpack-owner-scan.html',
})
export class RedpackOwnerScanPage {

  // errorMsg: string = null;
  // success: boolean = false;
  loaded: boolean = false;
  errorMsg: string = null;

  constructor(public navCtrl: NavController, 
    private appManager: AppManager,
    private redpacks: Redpacks,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackOwnerScanPage');
    setTimeout(() => {
      this.sendConfirm();
    }, 20);
  }

  sendConfirm() {
    this.redpacks.ConfirmConsumeRedpack(this.appManager.shareData.rrid)
      .then(res => {
        this.loaded = true;

        this.errorMsg = null;
      })
      .catch(error => {
        this.loaded = true;

        this.errorMsg = error.message || error;
      })
  }

  goHome() {
    this.app.getRootNavs()[0].setRoot(TabsPage);
  }

}
