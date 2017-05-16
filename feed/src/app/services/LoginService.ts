import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class LoginService {
    http: any;
    baseUrl: String;

    constructor(http: Http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3001'
    }

	// Validate User Login
    validateUser(username, password) {
        return this.http.post(this.baseUrl + '/login',{
			"username": username,
			"password": password
		}).map(res => res.json());
    }

	createNewUser(fname, lname, phone, email, password) {
		return this.http.post(this.baseUrl + '/createNewUser',{
			"firstName"	  : fname,
			"lastName"	  : lname,
			"phoneNumber" : phone,
			"email"		  : email,
			"password"    : password 
		}).map(res => res.json());
	}

	getTestUser() {
		return this.http.post(this.baseUrl + '/getTestUser',{
		}).map(res => res.json());
	}

}