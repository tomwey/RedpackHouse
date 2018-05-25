import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { DomSanitizer } from '@angular/platform-browser';

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
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
    this.loadUserAgreement();
  }

  loadUserAgreement() {
    this.api.GET('p/user_agreement', null)
      .then(data => {
        // console.log(data);
        if (data && data.body) {
          this.body = this.san.bypassSecurityTrustHtml(data.body);
        }
      })
      .catch(error => {});
  }

}
