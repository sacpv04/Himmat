import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QRCode } from '../qrcode/qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Patient } from '../services/PatientApi';
import { AlertController } from 'ionic-angular';

@Component({
    templateUrl: 'details_page.html',
  })
  export class DetailsPage {
    item;
    patient:any;
    maleGender:string;
    femaleGender:string;
    items:any = [];
    private patients = [];   
    constructor(public nav: NavController, params: NavParams, private barcodeScanner: BarcodeScanner, private patientAPI: Patient, private alertCtr: AlertController) {
      this.item = params.data.item;      
      this.patient = new PatientModel();
      this.patientAPI.getPartients().then(res => {
        this.items = res;
        this.items.entry.forEach(element => {
          this.patients.push(element.resource);
          console.log( this.patients);
        });            
      });                     
    }
   
    goQRCode() {
      this.nav.push(QRCode);
    }

    scanQRCode() {     
      this.barcodeScanner.scan().then((barcodeData) => {                
        for (var i = 0; i < this.patients.length; i++) {
          var id = this.patients[i].id;             
          if (id === barcodeData.text) {
            this.patient = this.patients[i];            
            // this.patient.id = this.patients[i].id;
            this.patient.name = this.patients[i].name[0].family;
            this.patient.brithday = this.patients[i].birthDate;
            var gender = this.patients[i].gender;
            if (gender === "Male") {
              this.maleGender = "checked";
              this.femaleGender = ""
            } else {
              this.femaleGender = "checked";
              this.maleGender = "";
            }           
            break; 
          }                   
        }                
       }, (err) => {
           // An error occurred
       });       
    }
}

class PatientModel {
  id: string;
  name: string;
  gender: string;
  brithday: string;
  severity:string;
  alleric:string;
  bloodtype:string;
  surgery_history:string;
  mental_illness:string;
  quick_note:string;    
}

