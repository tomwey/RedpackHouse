import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  body: any = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiService,
    private san: DomSanitizer,
    private users: Users,
    private tools: Tools,
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
    this.loadUserAgreement();
  }

  loadUserAgreement() {
    this.api.GET('p/user_agreement', null)
      .then(result => {
        // console.log(res);
        let data = result['data'];

        if (data && data.body) {
          this.body = this.san.bypassSecurityTrustHtml(data.body);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  doLogin() {
    this.users.GetAuthUrl()
      .then(data => {
        // console.log(data.data);
        if (data && data.data) {
          window.location.href = data.data.url;
        } else {
          this.tools.showToast('获取授权登录失败');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

}
