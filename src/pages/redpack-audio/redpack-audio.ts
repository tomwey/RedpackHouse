import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';

/**
 * Generated class for the RedpackAudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-audio',
  templateUrl: 'redpack-audio.html',
})
export class RedpackAudioPage {

  audio_type: string = 'common';
  
  catalogs: any = [];
  commonData: any = [];
  selectedCatalogIndex: number = 0;

  redpack: any = null;

  constructor(public navCtrl: NavController, 
    private redpacks: Redpacks,
    public navParams: NavParams) {
      this.redpack = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackThemePage');
    setTimeout(() => {
      this.loadCatalogs();
    }, 200);
  }

  loadCatalogs() {
    this.redpacks.GetCatalogs()
      .then(res => {
        if (res && res['data']) {
          this.catalogs = res['data'];

          this.loadData();
        }
      })
      .catch(error => {

      })
  }

  selectItem(item) {
    this.redpack.audio = item;
  }

  ok() {
    this.navCtrl.pop();
  }

  loadData() {
    if (this.selectedCatalogIndex >= this.catalogs.length) {
      return;
    }

    let catalog = this.catalogs[this.selectedCatalogIndex];

    this.redpacks.GetRedpackAudios(catalog.id)
      .then(res => {
        if (res && res['data']) {
          this.commonData = res['data'];
        }
      })
      .catch(error => {

      });
  }

  selectCatalog(index) {
    this.selectedCatalogIndex = index;
    this.loadData();
  }

  play() {

  }

  segmentChanged(ev) {

  }

}
