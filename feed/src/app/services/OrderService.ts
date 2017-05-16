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
    checkRidderAvailability(from, to, on, fromLat, fromLng, toLat, toLng, fromArea, toArea) {
        return this.http.post(this.baseUrl+'/checkRidderAvailability',{
			"diliveryFrom" 	: from,
			"diliveryTo"   	: to,
			"deliveryOn"   	: on,
			"fromLat"		: fromLat,
			"fromLng"   	: fromLng,
			"toLat"			: toLat,
			"toLng"			: toLng,
			"fromArea"	    : fromArea,
			"toArea"	    : toArea
		}).map(res => res.json());
    }

	// Create new Order
	createNewOrder(from, to, on, estimatedCost, discount, distance, userId, ridderId, title, description) {
		return this.http.post(this.baseUrl+'/createNewOrder', {
			"deliveryFrom" : from,
			"deliveryTo"   : to,
			"deliveryDate" : on,
			"title"		   : title,
			"description"  : description,
			"userId"	   : userId,
			"ridderId"	   : ridderId,
			"estimatedCost": estimatedCost,
			"distance"	   : distance,
			"discount"     : discount
		}).map(res => res.json());
	}

	// Get all Orders
	getAllOrders(userId) {
		return this.http.post(this.baseUrl+'/getAllOrders', {
			"user" : userId
		}).map(res => res.json());
	}
}