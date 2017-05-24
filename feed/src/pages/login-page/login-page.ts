import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html',

  animations: [

    //Para o logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0, 2000px, 0)'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //Para os detalhes de background
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0, 2000px, 0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //Para o formulário de login
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0, 2000px, 0)', offset: 0}),
          style({transform: 'translate3d(0, -20px, 0)', offset: 0.9}),
          style({transform: 'translate3d(0, 0, 0)', offset: 1})
        ]))
      ])
    ]),

    //Para o botão de login
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}