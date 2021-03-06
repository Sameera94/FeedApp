import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { RedditsPage } from '../pages/reddits/reddits';
import { SettingsPage } from '../pages/settings/settings';
import { DetailsPage } from '../pages/details/details';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { OrderSummaryPage } from '../pages/orderSummary/orderSummary';
import { OrderSummaryPage2 } from '../pages/orderSummary2/orderSummary2';
import { RegisterPage } from '../pages/register/register';
import { ContactPage } from '../pages/contact/contact';
import { PostPage } from '../pages/post/post';
import { RetailerPage } from '../pages/retailer/retailer';
import { CheckAvailabilityPage } from '../pages/checkAvailability/checkAvailability';
import { RiderPage } from '../pages/rider/rider';
import { OrdersPage } from '../pages/orders/orders';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Storage } from '@ionic/storage';
//import { LoginPage } from '../pages/login-page/login-page';

 
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    RedditsPage,
    SettingsPage,
    DetailsPage,
    TabsPage,
    HomePage,
	LoginPage,
	RegisterPage,
    ContactPage,
    PostPage,
    RetailerPage,
    CheckAvailabilityPage,
    RiderPage,
    OrdersPage,
	OrderPage,
	OrderSummaryPage,
	OrderSummaryPage2
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxt0AleM1loQVTofGa2zmBizyUNIjgMLA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    RedditsPage,
    SettingsPage,
    DetailsPage,
    TabsPage,
    HomePage,
	LoginPage,
	RegisterPage,
    ContactPage,
    PostPage,
    RetailerPage,
    CheckAvailabilityPage,
    RiderPage,
    OrdersPage,
	OrderPage,
	OrderSummaryPage,
	OrderSummaryPage2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Geolocation,NativeGeocoder, Storage]
})
export class AppModule {}
