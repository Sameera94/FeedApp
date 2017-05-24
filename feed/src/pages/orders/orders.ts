import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderService } from '../../app/services/OrderService';
import { OrderSummaryPage2 } from '../orderSummary2/orderSummary2';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'orders',
	templateUrl: 'orders.html'
})

export class OrdersPage {
	orders: any;
	ordersDue : any;

	constructor(public navCtrl: NavController, private orderService: OrderService, private storage: Storage) {
		
		// this.storage.get('userId').then(
		// 	(userId) => {
		// 		this.getAllOrders(userId);
		// 	}
		// );
	}

	ngOnInit() {

		console.log("oninit");

		// TODO: Change user id, since it is hardcorded
		this.storage.get('userId').then(
			(userId) => {
				this.getAllOrders(userId);
			}
		);
	}

	// ionViewWillEnter() {
	// 	console.log("ionViewWillEnter");
	// }

	// ionViewDidLoad() {
	// 	console.log("ionViewDidLoad");
	// }
	
	ionViewDidEnter() {
		this.storage.get('userId').then(
			(userId) => {
				this.getAllOrders(userId);
			}
		);
	}

	// ionViewDidLeave() {
	// 	console.log("ionViewDidLeave");
	// }


	getAllOrders(userId) {
		this.orderService.getAllOrders(userId).subscribe(response => {
			this.orders = response;
console.log("--------	");
			console.log(response);
		});

		this.orderService.getAllOrdersDue(userId).subscribe(response => {
			this.ordersDue = response;
		});
	}

	onClickOrder(order) {

		this.navCtrl.push(OrderSummaryPage2, {
			"deliveryFrom"  : order.deliveryFrom,
			"deliveryTo"    : order.deliveryTo,
			"estimatedCost" : order.estimatedCost,
			"distance"		: order.distance,
			"ridderId"		: order.ridderId,
			"userId"        : order.userId,
			"deliveryOn"    : order.deliveryOn,
			"orderTitle"    : order.title,
			"orderDescription" : order.description,
			"orderId"		: order.id
		},{
      		animation: 'ios-transition'
 		});
	}

	onRefreshButton() {
		this.storage.get('userId').then(
			(userId) => {
				this.getAllOrders(userId);
			}
		);
	}
}