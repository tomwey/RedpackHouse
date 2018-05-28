import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the BrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})
export class BrowserPage {

  page: any = null;
  body: any = null;

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private san: DomSanitizer,
    public navParams: NavParams) {
    this.page = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BrowserPage');
    setTimeout(() => {
      this.loadPage();
    }, 200);
  }

  loadPage() {
    this.api.GET(`p/${this.page.slug}`, null)
      .then(result => {
        // console.log(res);
        let data = result['data'];

        if (data && data.body) {
          this.body = this.san.bypassSecurityTrustHtml(data.body);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

}
