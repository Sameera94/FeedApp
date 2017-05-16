import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { OrderService } from '../../app/services/OrderService';
import { LoginService } from '../../app/services/LoginService';

@Component({
	templateUrl: 'checkAvailability.html'
})

export class CheckAvailabilityPage {

	//Variables
	deliveryFrom	    : String   // Address
	deliveryFromDetails : any     // Details Array
	deliveryTo		    : String   // Address
	deliveryToDetails	: any     // Details Array
	fromLat	 	  		: GLfloat
	fromLng	 	  		: GLfloat
	toLat  	 	 		: GLfloat
	toLng  	 	  		: GLfloat
	fromArea 	  		: String    // Main Delivery from Area
	toArea	 	  		: String    // Main Delivery to Area
	estimatedCost 		: GLfloat
	discount			: GLfloat
	distance	  		: GLfloat
	ridderId			: GLint
	userId				: GLint
	// title: String
	// description: String

	public event = {
		month: '2017-05-06',
		timeStarts: '07:43',
		timeEnds: '2017-05-07'
	}

	constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, private orderService: OrderService, private loginService: LoginService) {
		
		this.deliveryFrom 		 = this.params.get('deliveryFrom');
		this.deliveryFromDetails = this.params.get('deliveryFromDetails');
		this.deliveryTo 		 = this.params.get('deliveryTo');
		this.deliveryToDetails   = this.params.get('deliveryToDetails');
		this.discount            = 0.00
		this.estimatedCost       = 0.00
		this.userId				 = 1
	}

	ngOnInit() {
		this.fromLat   = this.deliveryFromDetails.lat
		this.fromLng   = this.deliveryFromDetails.lng
		this.toLat     = this.deliveryToDetails.lat
		this.toLng     = this.deliveryToDetails.lng
		this.fromArea  = this.deliveryFromDetails.components.administrative_area_level_2.long
		this.toArea    = this.deliveryToDetails.components.administrative_area_level_2.long

		// Calculate distance and cost
		this.distance      = this.getDistanceFromLatLonInKm(this.deliveryFromDetails.lat,this.deliveryFromDetails.lng,this.deliveryToDetails.lat, this.deliveryToDetails.lng);
		this.estimatedCost = this.distance * 100.0
	}

	//UI Controller Actions
	onClickCheckAvailabilityButton() {

		if (this.deliveryFrom != "" && this.deliveryTo != "") {
			this.checkAvailability(this.deliveryFrom, this.deliveryTo, this.event.month, this.fromLat, this.fromLng, this.toLat, this.toLng, this.fromArea, this.toArea);
		} else {
			this.showAlert("Error!", "Please fill all the fields.")
		}		
	}

	//Custom functions
	showConfirmAlert() {
		let prompt = this.alertCtrl.create({
			message: "Riders are avaialble! Do you want to continue?",
			buttons: [
				{
					text: 'Cancel',
					handler: data => { }
				},
				{
					text: 'Continue',
					handler: data => {
						this.navCtrl.push(OrderPage, {
							"deliveryFrom" 	: this.deliveryFrom,
							"deliveryTo" 	: this.deliveryTo,
							"fromLat" 		: this.fromLat,
							"fromLng" 		: this.fromLng,
							"toLat" 		: this.toLat,
							"toLng" 		: this.toLng,
							"fromArea" 		: this.fromArea,
							"toArea" 		: this.toArea,
							"estimatedCost" : this.estimatedCost,
							"discount" 		: this.discount,
							"distance" 		: this.distance,
							"ridderId"		: this.ridderId,
							"deliveryOn"	: this.event.month,
							"userId"		: this.userId
						});
					}
				}
			]
		});
		prompt.present();
	}

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

	getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
			;
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	deg2rad(deg) {
		return deg * (Math.PI / 180)
	}

	// Service calls
	checkAvailability(from, to, on, fromLat, fromLng, toLat, toLng, fromArea, toArea) {
		this.orderService.checkRidderAvailability(from, to, on, fromLat, fromLng, toLat, toLng, fromArea, toArea).subscribe(response => {
			
			if (response.status) {
				this.ridderId = response.ridderId;
				this.showConfirmAlert();
				
			} else {
				//Failed
				this.showAlert("Order Failed!", "No ridders available!");
			}
		});
	}

}
