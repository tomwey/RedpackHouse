import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, App, ModalController } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';

/**
 * Generated class for the RedpackListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-redpack-list',
  templateUrl: 'redpack-list.html',
})
export class RedpackListPage {
  redpack_type = 'taked';
  
  years: any = [];
  currentYear: string = null;

  listData: any = null;

  constructor(public navCtrl: NavController, 
    private redpacks: Redpacks,
    private app: App,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
    this.generateYears();
  }

  generateYears() {
    let nowYear = new Date().getFullYear();
    for(var y = nowYear; y >= 2018; y--) {
      this.years.push(`${y}年`);
    }

    this.currentYear = this.years[0];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackListPage');
    setTimeout(() => {
      this.loadData();
    }, 50);
  }

  segmentChanged(ev) {
    this.listData = null;
    this.loadData();
  }

  loadData() {
    const year = this.currentYear.substr(0, this.currentYear.length - 1);
    // console.log(year);
    this.redpacks.GetMyRedpacks(this.redpack_type, year)
      .then(res => {
        if (res && res['data']) {
          this.listData = res['data'];
        }
      })
      .catch(error => {

      });
  }

  viewRedpack(redpack) {
    // console.log(redpack);
    this.app.getRootNavs()[0].push('RedpackHistoryPage', redpack);
  }

  updateRedpack(redpack, event) {
    event.stopPropagation();

    this.modalCtrl.create('RedpackEditPage', redpack).present();
  }

  openOrClose(redpack, event) {
    event.stopPropagation();
  }

  yearChanged(ev) {
    // console.log(ev);
    this.loadData();
  }

}
