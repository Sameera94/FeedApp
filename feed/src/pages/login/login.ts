import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { RetailerPage } from '../retailer/retailer';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';
import { LoginService } from '../../app/services/LoginService'

@Component({
	selector: 'login-page',
	templateUrl: 'login.html'
})

export class LoginPage {

	//Variables  
	username: String;
	password: String;

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, private loginService: LoginService) {
		this.username = "sameera@gmail.com"
		this.password = "123"
	}

	//UI Controller actions
	onClickLoginButton() {
		if (this.username != "" && this.password != "") {
			this.validateUserLogin(this.username,this.password);
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
			if (response) {
				//Success login
				this.navCtrl.push(TabsPage, {});
			} else {
				//Invalid credintials
				this.showAlert("Login Failed!","Username or Password is Incorrect");
			}
		});
	}
}
