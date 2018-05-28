import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, App } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  user: any = null;
  error: any = null;

  constructor(public navCtrl: NavController, 
    private users: Users,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingPage');
    this.loadUserData();
  }

  logout() {
    this.users.logout().then(() => {
      // this.events.publish('user:logout');
      setTimeout(() => {
        this.app.getRootNavs()[0].setRoot(LoginPage);
      }, 10);
      
    })
    .catch(errror => {});
  }

  loadUserData() {
    this.users.GetUserProfile()
      .then(res => {
        this.user = res['data'];
      })
      .catch(error => {
        this.error = error;
      });
  }

  charge() {

  }

  newVIP() {
    
  }

}
