import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Platform, Content, App } from 'ionic-angular';
import { AppManager } from '../../provider/AppManager';
import { Redpacks } from '../../provider/Redpacks';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the RedpackDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-redpack-detail',
  templateUrl: 'redpack-detail.html',
})
export class RedpackDetailPage {

  errorMsg: string = null;
  redpackData: any = null;
  imgLoaded: boolean = false;
  
  answer: string = null;

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appManager: AppManager,
    private redpacks: Redpacks,
    private app: App,
    private platform: Platform,
  ) {
  }

  ionViewDidLoad() {
    // this.fixedIOSScrollBug();

    this.redpacks.GetRedback(this.appManager.shareData.rid)
      .then(data => {
        this.errorMsg = null;

        // console.log(data['data']);

        if (data && data['data']) {
          this.redpackData = data['data'];

          console.log(this.redpackData);
        }

      })
      .catch(error => {
        this.errorMsg = error.message;
        // console.log(error);
      });
  }

  commit() {
    if (this.errorMsg) {
      // 回首页
      // let homeUrl = window.location.href.split('?')[0];
      // window.location.href = homeUrl;
      this.app.getRootNavs()[0].setRoot(TabsPage);
    } else {
      // 拆红包
      // this.redpacks.OpenRedpack
      this.navCtrl.push('RedpackResultPage', { redpack: this.redpackData, 
                                               answer: this.answer, 
                                               has_sign: this.redpackData.has_sign });
    }
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
