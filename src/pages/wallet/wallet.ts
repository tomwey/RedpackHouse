import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Users } from '../../provider/Users';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  user: any = null;
  constructor(public navCtrl: NavController, 
    private users: Users,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad WalletPage');
    setTimeout(() => {
      this.loadUserProfile();
    }, 100);
  }

  loadUserProfile(): void {
    this.users.GetUserProfile()
      .then(res => {
        this.user = res['data'];
      })
      .catch(error => {

      });
  }

  gotoTradeList() {

  }

  gotoWithdraw(type) {

  }

}
