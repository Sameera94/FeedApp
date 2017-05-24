import { Component } from '@angular/core';
import { OrderService } from '../../app/services/OrderService';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderSummaryPage } from '../orderSummary/orderSummary';

@Component({
	selector: 'order',
	templateUrl: 'order.html'
})

export class OrderPage {

	//Variables
	deliveryFrom	 : String   // Address
	deliveryTo		 : String   // Address
	deliveryOn		 : String
	fromLat	 	  	 : GLfloat
	fromLng	 	  	 : GLfloat
	toLat  	 	 	 : GLfloat
	toLng  	 	  	 : GLfloat
	fromArea 	  	 : String   // Main Delivery from Area
	toArea	 	  	 : String   // Main Delivery to Area
	estimatedCost 	 : GLfloat
	discount		 : GLfloat
	distance	  	 : GLfloat
	orderTitle		 : String
	orderDescription : String
	ridderId         : GLint
	userId			 : GLint

	constructor(public navCtrl: NavController, public params: NavParams, private orderService: OrderService, public alertCtrl: AlertController) {

		this.deliveryFrom 		= this.params.get('deliveryFrom');
		this.deliveryTo 		= this.params.get('deliveryTo');
		this.fromLat 			= this.params.get('fromLat');
		this.fromLng 			= this.params.get('fromLng');
		this.toLat 				= this.params.get('toLat');
		this.toLng 				= this.params.get('toLng');
		this.fromArea 			= this.params.get('fromArea');
		this.toArea 			= this.params.get('toArea');
		this.estimatedCost 		= this.params.get('estimatedCost');
		this.discount 			= this.params.get('discount');
		this.distance 			= this.params.get('distance');
		this.ridderId			= this.params.get('ridderId');
		this.userId				= this.params.get('userId');
		this.deliveryOn			= this.params.get('deliveryOn');
		this.orderTitle 		= " "
		this.orderDescription 	= " " 
	
	}

	// UI Outlet Actions
	onClickPlaceOrderButtton() {
		this.showConfirmAlert()
	}

	//Custom functions
	showConfirmAlert() {
		let prompt = this.alertCtrl.create({
			message: "Delivery charge of Rs. "+ this.estimatedCost + " will be added to the original amount. Do you want to continue?",
			buttons: [
				{
					text: 'Cancel',
					handler: data => { }
				},
				{
					text: 'Continue',
					handler: data => {
						// Create new order
						this.createNewOrder(this.deliveryFrom, this.deliveryTo, this.deliveryOn, this.estimatedCost, this.discount, this.distance, this.userId, this.ridderId, this.orderTitle, this.orderDescription);
					}
				}
			]
		});
		prompt.present();
	}

	// Service Calls
	createNewOrder(from, to, on, estimatedCost, discount, distance, userId, ridderId, title, description) {
		this.orderService.createNewOrder(from, to, on, estimatedCost, discount, distance, userId, ridderId, title, description).subscribe(response => {
			if (response) {
				this.navCtrl.push(OrderSummaryPage, {
					"deliveryFrom"  : this.deliveryFrom,
					"deliveryTo"    : this.deliveryTo,
					"estimatedCost" : this.estimatedCost,
					"distance"		: this.distance,
					"ridderId"		: this.ridderId,
					"userId"        : this.userId,
					"deliveryOn"    : this.deliveryOn,
					"orderTitle"    : this.orderTitle,
					"orderDescription" : this.orderDescription,
					"orderId"		: 0
				});
			} else {
				this.showAlert("Order Failed!", "Internal error!");
			}
		});
	}

	// Custom functions
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

}
