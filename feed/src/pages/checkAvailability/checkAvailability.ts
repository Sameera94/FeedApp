import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { OrderService } from '../../app/services/OrderService';
import { LoginService } from '../../app/services/LoginService';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Component({
	selector: 'page-checkAvailability',
	templateUrl: 'checkAvailability.html'
})

export class CheckAvailabilityPage {

	//Variables
	deliveryFrom	    : String   // Address
	deliveryFromDetails : any     // Details Array
	deliveryTo		    : String   // Address
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
	loading 			: any;
	
	public event = {
		month: '2017-05-24',
		timeStarts: '07:43',
		timeEnds: '2017-05-07'
	}

	constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, private orderService: OrderService, private loginService: LoginService, private storage: Storage, public loadingCtrl: LoadingController) {
		
		this.deliveryFrom 		 = this.params.get('deliveryFrom');
		this.deliveryFromDetails = this.params.get('deliveryFromDetails');
		this.deliveryTo 		 = "Pearson Lanka, Orion City, Colombo 00900"
		this.discount            = 0.00
		this.estimatedCost       = 0.00

		this.storage.get('userId').then(
			(userId) => {
				this.userId = userId;
			}
		);
	}

	ngOnInit() {
		this.fromLat   = this.deliveryFromDetails.lat
		this.fromLng   = this.deliveryFromDetails.lng
		this.toLat     = 6.941512
		this.toLng     = 79.880925
		this.fromArea  = this.deliveryFromDetails.components.administrative_area_level_2.long
		this.toArea    = "Colombo"

		// Calculate distance and cost
		this.distance      = this.getDistanceFromLatLonInKm(this.deliveryFromDetails.lat,this.deliveryFromDetails.lng,this.toLat, this.toLng );
		this.estimatedCost = this.distance * 24.0
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

		// Loading Start
		this.loading = this.loadingCtrl.create({
			content: 'Loading...'
		});
		this.loading.present();

		this.orderService.checkRidderAvailability(from, to, on, fromLat, fromLng, toLat, toLng, fromArea, toArea).subscribe(response => {
			
			if (response.status) {
				setTimeout(() => {
					this.loading.dismiss();
					this.ridderId = response.ridderId;
					this.showConfirmAlert();
				}, 2000);
			} else {
				//Failed
				setTimeout(() => {
					this.loading.dismiss();
					this.showAlert("Order Failed!", "No ridders available!");
				}, 2000);
			}
		});
	}

}
