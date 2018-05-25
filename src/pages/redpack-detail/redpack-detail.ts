import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams } from 'ionic-angular';
import { AppManager } from '../../provider/AppManager';
import { Redpacks } from '../../provider/Redpacks';

/**
 * Generated class for the RedpackDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-redpack-detail',
  templateUrl: 'redpack-detail.html',
})
export class RedpackDetailPage {

  errorMsg: string = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appManager: AppManager,
    private redpacks: Redpacks,
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackDetailPage');
    // console.log(this.appManager.shareData);
    this.redpacks.GetRedback(this.appManager.shareData.rid)
      .then(data => {
        this.errorMsg = null;

        console.log(data);
      })
      .catch(error => {
        this.errorMsg = error.message;
        // console.log(error);
      });
  }

}
