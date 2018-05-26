import { Component } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the NewRedpackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-new-redpack',
  templateUrl: 'new-redpack.html',
})
export class NewRedpackPage {

  use_type: number = 0;
  can_commit: boolean = false;

  redpack: any = {
    money: '',
    quantity: '',
    subject: '',
    theme: '',
    audio: '',
    _type: 0,
    is_cash_hb: true,
  };

  constructor(public navCtrl: NavController, 
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewRedpackPage');
  }

  toggleUseType() {
    if (this.use_type == 0) {
      this.use_type = 1;
    } else {
      this.use_type = 0;
    }
  }

  calcTotalMoney() {
    this.can_commit = this.redpack.money && this.redpack.quantity;
    
    let money = this.redpack.money || 0.00;
    let quantity = this.redpack.quantity || 0;
    if (this.use_type == 0) {
      return parseFloat(money);
    } else {
      return parseFloat(money) * quantity;
    }
  }

  selectTheme() {
    this.app.getRootNavs()[0].push('RedpackThemePage', this.redpack);
  }

  selectAudio() {
    this.app.getRootNavs()[0].push('RedpackAudioPage', this.redpack);
  }

}
