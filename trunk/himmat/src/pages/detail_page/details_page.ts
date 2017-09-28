import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QRCode } from '../qrcode/qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
    templateUrl: 'details_page.html',
  })
  export class DetailsPage {
    item;
    patient:any;
    maleGender:string;
    femaleGender:string;
    constructor(public nav: NavController, params: NavParams, private barcodeScanner: BarcodeScanner) {
      this.item = params.data.item;
      this.maleGender = "";
      this.femaleGender = "";
      this.patient = new Patient();  
    }
    goQRCode() {
      this.nav.push(QRCode);
    }
    scanQRCode() {
      var patients = [{
                      id: "3dd50aaf-6b03-4497-b074-d81703f07ee8",
                      name: "Cager Classic",
                      gender: "Male",
                      age: "65",
                      heathcareid: "6b03-4497-b074"
                      },
                      {
                      id: "98c6857e-b0d1-4295-b89e-2d95a45437f2",
                      name: "Holiday Hoops Challenge",
                      gender: "Female",
                      age: "67",
                      heathcareid: "-b0d1-4295-b89e"
                      },
                      {
                      id: "46ebd526-8839-476a-9ba0-8a9b2c07f3c3",
                      name: "Summer Showdown",
                      gender: "Male",
                      age: "68",
                      heathcareid: "8839-476a-9ba0"
                      },
                      {
                      id: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
                      name: "March Madness Tournament",
                      gender: "Female",
                      age: "67",
                      heathcareid: "ba6d-4f55-9cc2"
                      }];
      this.barcodeScanner.scan().then((barcodeData) => {
        for (var i = 0; i < patients.length; i++) {
          var id = patients[i].id;
          var gender = patients[i].gender;
          if (gender === "Male") {
            this.maleGender = "checked";
          } else {
            this.femaleGender = "checked";
          }
          if (id === barcodeData.text) {
            this.patient = patients[i];
          }
          break;          
        }          
       }, (err) => {
           // An error occurred
       });
      
    }
}

class Patient {
  id: string;
  name: string;
  gender: string;
  age: string;
  heathcareid: string;
}