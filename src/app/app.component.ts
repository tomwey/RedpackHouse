import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Users } from '../provider/Users';
import { Utils } from '../provider/Utils';
import { Tools } from '../provider/Tools';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; //= TabsPage;

  constructor(platform: Platform, statusBar: StatusBar,
    private users: Users, 
    private tools: Tools,
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
            // 绑定登录
            this.users.bindAuth(code, provider)
              .then(data => {
                if (data && data.data) {
                  let token = data.data.token;
                  this.users.saveToken(token).then(() => {
                    this.rootPage = TabsPage;
                  });
                } else {
                  this.tools.showToast('登录失败~');
                  this.rootPage = LoginPage;
                }
              })
              .catch(error => {

              });
          } else {
            this.tools.showToast('登录失败~');
            this.rootPage = LoginPage;
          }
        } else {
          this.rootPage = TabsPage;
        }
      });
    });
  }
}
