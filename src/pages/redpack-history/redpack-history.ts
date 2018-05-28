import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';

/**
 * Generated class for the RedpackHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-history',
  templateUrl: 'redpack-history.html',
})
export class RedpackHistoryPage {

  user: any = null;
  redpack_earn: any = null;
  results: any[] = [];
  redpack: any = null;

  dataError: string = null;

  constructor(public navCtrl: NavController, 
    private redpacks: Redpacks,
    public navParams: NavParams) {
    this.user = this.navParams.data.user;
    this.redpack_earn = this.navParams.data.redpack_earn;
    this.redpack = this.navParams.data.redpack;

    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackHistoryPage');
    setTimeout(() => {
      this.loadData();
    }, 100);
  }

  loadData() {
    if (!this.redpack) return;
    
    this.redpacks.GetRedpackResults(this.redpack.id)
      .then(res => {
        if (res && res['data']) {
          this.results = res['data'];
          this.dataError = this.results.length == 0 ? '该红包还未被领过~' : null;
        } else {
          this.dataError = '未知原因错误';
        }
      })
      .catch(error => {
        this.dataError = error.message;
      });
  }

}
