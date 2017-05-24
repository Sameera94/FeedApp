import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { RetailerPage } from '../retailer/retailer';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';
import { LoginService } from '../../app/services/LoginService'
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Component({
	selector: 'login-page',
	templateUrl: 'login.html'
})


export class LoginPage {

	//Variables  
	username: String;
	password: String;
	loading : any;

	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private loginService: LoginService, private storage: Storage) {
		this.username = "piyathi@gmail.com"
		this.password = "123"
	}

	//UI Controller actions
	onClickLoginButton() {
		if (this.username != "" && this.password != "") {
			this.validateUserLogin(this.username,this.password);

			this.loading = this.loadingCtrl.create({
    			content: 'Loading...'
  			});
			this.loading.present();
		} else {
			this.showAlert("Login Failed!","Username or Password cant be Emplty!");
		}
	}

	onClickRegisterButton() {
		this.navCtrl.push(RegisterPage, {});
	}

	//Custom functions
	showAlert(title, message) {
		let prompt = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: [
				{
					text: 'Ok',
					handler: data => {
						console.log('OK clicked');
					}
				}
			]
		});
		prompt.present();
	}

	//Login service call
	validateUserLogin(username, password) {	
		this.loginService.validateUser(username, password).subscribe(response => {
			if (response.status) {
				//Success login
				setTimeout(() => {
					this.loading.dismiss();
					this.storage.set('userId',response.user[0].id);
					this.navCtrl.push(TabsPage, {});
				}, 2000);
			} else {
				//Invalid credintials
				setTimeout(() => {
					this.loading.dismiss();
					this.showAlert("Login Failed!","Username or Password is Incorrect");
				}, 2000);
			}
		});
	}
}
