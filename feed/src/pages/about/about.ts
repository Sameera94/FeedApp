import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    lat: number = 51.678418;
    lng: number = 7.809007;

    public enteredAddress: String;
    //public geocoder: google.maps.Geocoder;
    public results: Array<any>
    
    constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    }

    onClickGetMyLocation() {

        this.geolocation.getCurrentPosition().then((resp) => {

            this.lat = resp.coords.latitude
            this.lng = resp.coords.longitude
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    test() {

        // this.geocoder.geocode({'address': "colombo"}, function(results, status) {
        //     if (status === 'OK') {
        //         console.log("Successfull")
        //     } else {
        //         alert('Geocode failed for the following reason: ' + status);
        //     }
        // });

    }

}