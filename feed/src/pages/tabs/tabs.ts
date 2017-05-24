import { Component } from '@angular/core';

import { HomePage } from '../home/home'
import { RedditsPage } from '../reddits/reddits';
import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { OrdersPage } from '../orders/orders';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Home: any = HomePage;
  tab1Root: any = OrdersPage;
  tab2Root: any = SettingsPage;
  tab3Root: any = AboutPage;

  constructor() {

  }
}
