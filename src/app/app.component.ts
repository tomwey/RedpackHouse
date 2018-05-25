import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Users } from '../provider/Users';
import { Utils } from '../provider/Utils';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; //= TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,
    private users: Users, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.users.token().then(token => {
        if (!token) {
          let code = Utils.getQueryString('code');
          let provider = Utils.getQueryString('provider');

          if (code && provider) {
            // 跳转登录页面去登录
            // window.location.href = '一个登录地址';
            
          } else {
            // this.users.saveToken(_token).then(() => {
            //   this.rootPage = TabsPage;
            // });
            this.rootPage = LoginPage;
          }
        } else {
          this.rootPage = TabsPage;
        }
      });
    });
  }
}
