import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RiderPage } from '../rider/rider';
import { OrderService } from '../../app/services/OrderService';
import { LoginService } from '../../app/services/LoginService';

@Component({
	templateUrl: 'checkAvailability.html'
})

export class CheckAvailabilityPage {

	//Variables
	deliveryFrom: String
	deliveryFromDetails: any;
	deliveryTo: String
	deliveryToDetails: any;
	title: String
	description: String

	public event = {
		month: '2017-05-06',
		timeStarts: '07:43',
		timeEnds: '2017-05-07'
	}

	constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, private orderService: OrderService, private loginService: LoginService) {
		this.deliveryFrom = this.params.get('deliveryFrom');
		this.deliveryFromDetails = this.params.get('deliveryFromDetails');
		this.deliveryTo = this.params.get('deliveryTo');
		this.deliveryToDetails = this.params.get('deliveryToDetails');

		this.title = ""
		this.description = ""
	}

	//UI Controller Actions
	onClickCheckAvailabilityButton() {

		console.log(this.deliveryFromDetails)
		console.log("* * * * * * * * * *")
		console.log(this.deliveryToDetails)

		// if (this.deliveryFrom != "" && this.deliveryTo != "") {
		// 	this.checkAvailability(this.deliveryFrom, this.deliveryTo, "2017-05-27");
		// } else {
		// 	this.showAlert("Error!", "Please fill all the fields.")
		// }

		var distance = this.getDistanceFromLatLonInKm(this.deliveryFromDetails.lat,this.deliveryFromDetails.lng,this.deliveryToDetails.lat, this.deliveryToDetails.lng);
		console.log("Distance: " + distance+ " km")

	}

	//Custom functions
	showConfirmAlert() {
		let prompt = this.alertCtrl.create({
			title: 'Confirm',
			message: "Riders are avaialble and extimated cost will be Rs. 270.00/=, are you sure want to place the order?",
			buttons: [
				{
					text: 'Cancel',
					handler: data => { }
				},
				{
					text: 'Confirm',
					handler: data => {
						this.createNewOrder(this.deliveryFrom, this.deliveryTo, this.title, this.description, this.event.month, 1);
					}
				}
			]
		});
		prompt.present();
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

	// Service calls
	checkAvailability(from, to, on) {
		this.orderService.checkRidderAvailability(from, to, on).subscribe(response => {
			if (response) {
				//Success
				this.showConfirmAlert();
			} else {
				//Failed
				this.showAlert("Order Failed!", "No ridders available!");
			}
		});
	}

	// Create new order
	createNewOrder(from, to, title, description, on, userId) {
		this.orderService.createNewOrder(from, to, title, description, on, userId).subscribe(response => {
			if (response) {
				this.navCtrl.push(RiderPage, {});
			} else {
				this.showAlert("Order Failed!", "Internal error!");
			}
		});
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
}
