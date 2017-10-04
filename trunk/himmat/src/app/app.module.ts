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
import { PhotoRecording } from '../pages/photo_recording/photo_recording';
import { EditPhoto } from '../pages/edit_photo/edit_photo';
import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    QRCode,
    HandWrite,
    PhotoRecording,
    EditPhoto
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
    HandWrite,
    PhotoRecording,
    EditPhoto
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Patient,
    BarcodeScanner,
    Diagnostic,
    CameraPreview,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
