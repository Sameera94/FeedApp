import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class OrderService {
    http: any;
    baseUrl: String;

    constructor(http: Http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3001'
    }

	// Check ridders availability
    checkRidderAvailability(from, to, date) {
        return this.http.post(this.baseUrl+'/checkRidderAvailability',{
			"diliveryFrom" : from,
			"diliveryTo"   : to,
			"deliveryOn"   : date
		}).map(res => res.json());
    }

	// Create new Order
	createNewOrder(from, to, title, description, on, userId) {
		return this.http.post(this.baseUrl+'/createNewOrder', {
			"deliveryFrom" : from,
			"deliveryTo"   : to,
			"deliveryDate" : on,
			"title"		   : title,
			"description"  : description,
			"user"		   : userId
		}).map(res => res.json());
	}

	// Get all Orders
	getAllOrders(userId) {
		return this.http.post(this.baseUrl+'/getAllOrders', {
			"user" : userId
		}).map(res => res.json());
	}
}