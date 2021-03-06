import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckAvailabilityPage } from '../checkAvailability/checkAvailability';

declare var google: any;

@Component({
	selector: 'retailer-page',
	templateUrl: 'retailer.html'
})

export class RetailerPage {

	// Variables
	deliveryFrom		: String;
	deliveryFromDetails	: any;

	deliveryTo			: String;
	deliveryToDetails	: any;

	address: any = {
		place: '',
		set: false,
	};
	placesService: any;
	map: any;
	markers = [];
	placedetails: any;

	autocompleteItems: any;
	autocomplete: any;
	acService: any;

	constructor(public navCtrl: NavController, public params: NavParams) {
		this.deliveryTo 		 = this.params.get('deliveryTo');
		this.deliveryToDetails   = this.params.get('deliveryToDetails');
	}

	ngOnInit() {
		this.initMap();
		this.initPlacedetails();

		this.acService = new google.maps.places.AutocompleteService();
		this.autocompleteItems = [];
		this.autocomplete = {
			query: ''
		};
	}

	private initMap() {
		var point = { lat: 6.927079, lng: 79.861243 };
		let divMap = (<HTMLInputElement>document.getElementById('map2'));
		this.map = new google.maps.Map(divMap, {
			center: point,
			zoom: 15,
			disableDefaultUI: true,
			draggable: true,
			zoomControl: true
		});
	}

	private initPlacedetails() {
		this.placedetails = {
			address: '',
			lat: '',
			lng: '',
			components: {
				route: { set: false, short: '', long: '' },                           // calle 
				street_number: { set: false, short: '', long: '' },                   // numero
				sublocality_level_1: { set: false, short: '', long: '' },             // barrio
				locality: { set: false, short: '', long: '' },                        // localidad, ciudad
				administrative_area_level_2: { set: false, short: '', long: '' },     // zona/comuna/partido 
				administrative_area_level_1: { set: false, short: '', long: '' },     // estado/provincia 
				country: { set: false, short: '', long: '' },                         // pais
				postal_code: { set: false, short: '', long: '' },                     // codigo postal
				postal_code_suffix: { set: false, short: '', long: '' },              // codigo postal - sufijo
			}
		};
	}

	private reset() {
		this.initPlacedetails();
		this.address.place = '';
		this.address.set = false;
	}

	private getPlaceDetail(place_id: string): void {
		var self = this;
		var request = {
			placeId: place_id
		};
		this.placesService = new google.maps.places.PlacesService(this.map);
		this.placesService.getDetails(request, callback);
		function callback(place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log('page > getPlaceDetail > place > ', place);
				// set full address
				self.placedetails.address = place.formatted_address;
				self.placedetails.lat = place.geometry.location.lat();
				self.placedetails.lng = place.geometry.location.lng();
				for (var i = 0; i < place.address_components.length; i++) {
					let addressType = place.address_components[i].types[0];
					let values = {
						short_name: place.address_components[i]['short_name'],
						long_name: place.address_components[i]['long_name']
					}
					if (self.placedetails.components[addressType]) {
						self.placedetails.components[addressType].set = true;
						self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
						self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
					}
				}
				// set place in map
				self.map.setCenter(place.geometry.location);
				self.createMapMarker(place);
				// populate
				self.address.set = true;
				console.log('page > getPlaceDetail > details > ', self.placedetails);
			} else {
				console.log('page > getPlaceDetail > status > ', status);
			}
		}
	}

	private createMapMarker(place: any): void {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: this.map,
			position: placeLoc
		});
		this.markers.push(marker);
	}

	updateSearch() {
		console.log('modal > updateSearch');
		if (this.autocomplete.query == '') {
			this.autocompleteItems = [];
			return;
		}
		let self = this;
		let config = {
			types: ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
			input: this.autocomplete.query,
			componentRestrictions: { country: 'LK' }
		}
		this.acService.getPlacePredictions(config, function (predictions, status) {
			console.log('modal > getPlacePredictions > status > ', status);
			self.autocompleteItems = [];
			if (predictions != null) {
				predictions.forEach(function (prediction) {
					self.autocompleteItems.push(prediction);
				});
			}
		});
	}

	chooseItem(item: any) {
		console.log('modal > chooseItem > item > ', item);
		if (item) {
			this.address.place = item.description;

			// Update Value in search box
			this.autocomplete = {
				query: item.description
			};

			// get details
			this.getPlaceDetail(item.place_id);
			this.autocompleteItems = [];
		}
	}

	// UI Controller actions
	onClickNextButton(retailersLocation) {
		this.navCtrl.push(CheckAvailabilityPage, {
			"deliveryFrom"		  : this.autocomplete.query,
			"deliveryFromDetails" : this.placedetails,
			"deliveryTo"  		  : this.deliveryTo,
			"deliveryToDetails"	  : this.deliveryToDetails
		});
	}
}
