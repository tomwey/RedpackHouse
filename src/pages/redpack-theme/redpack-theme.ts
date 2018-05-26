import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';

/**
 * Generated class for the RedpackThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-theme',
  templateUrl: 'redpack-theme.html',
})
export class RedpackThemePage {

  theme_type: string = 'common';

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
    // console.log(item);
    // this.selectedItem = item;
    this.redpack.theme = item;
  }

  ok() {
    this.navCtrl.pop();
  }

  loadData() {
    if (this.selectedCatalogIndex >= this.catalogs.length) {
      return;
    }

    let catalog = this.catalogs[this.selectedCatalogIndex];

    this.redpacks.GetRedpackThemes(catalog.id)
      .then(res => {
        if (res && res['data']) {
          this.commonData = res['data'];

          this.redpack.theme = this.redpack.theme || this.commonData[0];
          // this.selectedItem = this.commonData[0];
        }
      })
      .catch(error => {

      });
  }

  selectCatalog(index) {
    this.selectedCatalogIndex = index;
    this.loadData();
  }

  segmentChanged(ev) {

  }

}
