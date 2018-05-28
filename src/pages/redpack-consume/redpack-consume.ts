import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Redpacks } from '../../provider/Redpacks';

/**
 * Generated class for the RedpackConsumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redpack-consume',
  templateUrl: 'redpack-consume.html',
})
export class RedpackConsumePage {

  consume_type: string = 'confirmed';
  consumeData: any = null;

  constructor(public navCtrl: NavController,
    private redpacks: Redpacks, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RedpackConsumePage');
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.consumeData = null;
    
    this.redpacks.GetRedpackConsumes(this.consume_type)
      .then(res => {
        if (res && res['data']) {
          this.consumeData = res['data']
        }
      })
      .catch(error => {

      });
  }

}
