import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderService } from '../../app/services/OrderService';

@Component({
	selector: 'orders',
	templateUrl: 'orders.html'
})

export class OrdersPage {
	orders: any;

	constructor(public navCtrl: NavController, private orderService: OrderService) {
	}

	ngOnInit() {
		this.getAllOrders(1);
	}

	getAllOrders(userId) {
		this.orderService.getAllOrders(userId).subscribe(response => {
			this.orders = response;
		});
	}
}