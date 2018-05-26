import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, App, Platform, Content, ModalController } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';

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
  createError: any = null;

  redpack: any = {
    money: '',
    quantity: '',
    subject: '',
    theme: null,
    audio: null,
    sign: '',
    // _type: 0,
    is_cash_hb: true,
  };

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private app: App,
    private modalCtrl: ModalController,
    private redpacks: Redpacks,
    private platform: Platform,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.fixedIOSScrollBug();
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

  commit() {
    let params = {};

    params['money'] = Math.floor(parseFloat(this.redpack.money) * 100);
    params['quantity'] = this.redpack.quantity;
    params['_type'] = this.use_type;
    params['use_type'] = this.redpack.is_cash_hb ? 1 : 2;
    params['subject'] = this.redpack.subject;
    params['sign'] = this.redpack.sign;

    if (this.redpack.theme) {
      params['theme_id'] = this.redpack.theme.id;
    } 

    if (this.redpack.audio) {
      params['audio_id'] = this.redpack.audio.id;
    } 

    this.createError = null;

    this.redpacks.CreateRedpack(params)
      .then(res => {
        // console.log(res);
        this.resetForm();
        if (res && res['data']) {
          // this.app.getRootNavs
          this.modalCtrl.create('RedpackCreatedPage', res['data']).present();
        } else {
          this.createError = { code: -1, message: '未知错误' };
        }
      })
      .catch(error => {
        this.createError = error;
      });
  }

  resetForm() {
    this.redpack = {
      money: '',
      quantity: '',
      subject: '',
      theme: null,
      audio: null,
      sign: '',
      is_cash_hb: true,
    };
  }

  fixedIOSScrollBug() {
    if (this.platform.is('mobileweb') && this.platform.is('ios')) {

      this.content.scrollTo(0, 1);

      this.content.ionScrollEnd.subscribe(evt => {
        const scrollElement = this.content.getScrollElement();
        // console.log(111);
        if ((this.content.contentHeight + 1) < scrollElement.scrollHeight) {

          if (scrollElement.scrollTop === 0) {
            // scrollElement.scrollTo(0, 1);
            this.content.scrollTo(0,1);
          }
          else if ((scrollElement.scrollTop + this.content.contentHeight) === scrollElement.scrollHeight) {
            // scrollElement.scrollTo(0, (scrollElement.scrollTop - 1));
            this.content.scrollTo(0, (scrollElement.scrollTop - 1));
          }
        };
      });
    }
  }

}
