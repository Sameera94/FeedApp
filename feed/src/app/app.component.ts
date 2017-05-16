import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { RedditService } from './services/reddit.service'
import { LoginService } from './services/LoginService'
import { OrderService } from './services/OrderService'
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { OrderSummaryPage } from '../pages/orderSummary/orderSummary'

@Component({
  templateUrl: 'app.html',
  providers: [RedditService, LoginService, OrderService]
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
