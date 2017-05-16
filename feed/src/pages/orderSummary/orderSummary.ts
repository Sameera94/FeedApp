import { Component } from '@angular/core';
import { OrderService } from '../../app/services/OrderService';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RiderPage } from '../rider/rider';

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

	constructor(public navCtrl: NavController, public params: NavParams, private orderService: OrderService, public alertCtrl: AlertController) {

		this.deliveryFrom 		= this.params.get('deliveryFrom');
		this.deliveryTo 		= this.params.get('deliveryTo');
		this.estimatedCost 		= this.params.get('estimatedCost');
		this.distance 			= this.params.get('distance');
		this.ridderId			= this.params.get('ridderId');
		this.userId				= this.params.get('userId');
		this.deliveryOn			= this.params.get('deliveryOn');
		this.orderTitle 		= this.params.get('orderTitle');
		this.orderDescription 	= this.params.get('orderDescription'); 
	}

	

}
