import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';

import {App} from 'ionic-angular'

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  constructor(public navCtrl: NavController,public app: App) {

  }

  onClickLogOut() {
	  this.app.getRootNav().setRoot(LoginPage);	
  }

}
