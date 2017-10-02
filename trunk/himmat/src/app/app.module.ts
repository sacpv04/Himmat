import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/detail_page/details_page';
import { HttpModule } from '@angular/http';
import { Patient } from '../pages/services/PatientApi';
import { QRCode } from '../pages/qrcode/qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HandWrite } from '../pages/handwrite/handwrite';
import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    QRCode,
    HandWrite
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxQRCodeModule,
    NgxBarcodeModule,
    SignaturePadModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    QRCode,
    HandWrite
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Patient,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
