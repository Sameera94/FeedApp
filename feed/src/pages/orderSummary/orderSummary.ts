import { Component } from '@angular/core';
import { OrderService } from '../../app/services/OrderService';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RiderPage } from '../rider/rider';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

declare var window;

@Component({
	selector: 'orderSummary',
	templateUrl: 'orderSummary.html'
})

export class OrderSummaryPage {

	//Variables
	deliveryFrom	 : String
	deliveryTo		 : String
	deliveryOn		 : String
	estimatedCost 	 : GLfloat
	distance	  	 : GLfloat
	orderTitle		 : String
	orderDescription : String
	ridderId         : GLint
	userId			 : GLint
	orderId			 : GLint
	isHidden		 : Boolean

	constructor(public navCtrl: NavController, public params: NavParams, private orderService: OrderService, public alertCtrl: AlertController,  private storage: Storage) {

		this.deliveryFrom 		= this.params.get('deliveryFrom');
		this.deliveryTo 		= this.params.get('deliveryTo');
		this.estimatedCost 		= this.params.get('estimatedCost');
		this.distance 			= this.params.get('distance');
		this.ridderId			= this.params.get('ridderId');
		this.userId				= this.params.get('userId');
		this.deliveryOn			= this.params.get('deliveryOn');
		this.orderTitle 		= this.params.get('orderTitle');
		this.orderDescription 	= this.params.get('orderDescription'); 
		this.orderId 			= this.params.get('orderId'); 

		if ( this.orderId == 0 ) {
			console.log("Order ID not availalble");
			this.isHidden = false;
		} else {
			console.log("Order ID availalble");
			this.isHidden = true;
		}
	}

	callToRidder() {
		window.location = 'tel:+94-710-589-523'
	}
	
	cancelOrder() {
		this.showConfirmAlert();
	}

	onClickHome() {
		this.navCtrl.setRoot(TabsPage);
	}

	// Custom functions
	showAlert(message) {
		let prompt = this.alertCtrl.create({
			message: message,
			buttons: [
				{
					text: 'Ok',
					handler: data => {
						this.navCtrl.pop();
					}
				}
			]
		});
		prompt.present();
	}

	//Custom functions
	showConfirmAlert() {
		let prompt = this.alertCtrl.create({
			message: "Are you sure want to cancel the order?",
			buttons: [
				{
					text: 'Stop',
					handler: data => { }
				},
				{
					text: 'Cancel',
					handler: data => {

						console.log(this.orderId);

						this.orderService.cancelOrder(this.orderId).subscribe(response => {
			
							if (response) {
								this.showAlert("Sucessfully cancelled!");
							} else {
								this.showAlert("Error! Cannot cancel the order!");
							}
						});
					}
				}
			]
		});
		prompt.present();
	}
}
