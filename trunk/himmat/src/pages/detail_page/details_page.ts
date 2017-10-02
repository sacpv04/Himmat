import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QRCode } from '../qrcode/qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Patient } from '../services/PatientApi';

@Component({
    templateUrl: 'details_page.html',
  })
  export class DetailsPage {
    item;
    patient:any;
    maleGender:string;
    femaleGender:string;
    items:any = [];
    patients:any = [];
    constructor(public nav: NavController, params: NavParams, private barcodeScanner: BarcodeScanner, private patientAPI: Patient) {
      this.item = params.data.item;      
      this.patient = new PatientModel();             
    }
   
    goQRCode() {
      this.nav.push(QRCode);
    }

    scanQRCode() {
      
      this.patientAPI.getPartients().then(res => {
        this.items = res;
        this.items.entry.forEach(element => {                  
          this.patient.id = element.resource.id;
          if (element.resource.name) {
            this.patient.name = element.resource.name[0].family;
          } else {
            this.patient.name = "";
          }          
          this.patient.gender = element.resource.gender;
          this.patient.brithday = element.resource.birthDate;
          this.patient.severity = "";         
          this.patient.alleric = ""; 
          this.patient.bloodtype = ""; 
          this.patient.surgery_history = "";
          this.patient.mental_illness = "";
          this.patient.quick_note = "";
          console.log(this.patient)
          this.patients.push(this.patient);
        });
      });


      this.barcodeScanner.scan().then((barcodeData) => {
        for (var i = 0; i < this.patients.length; i++) {
          var id = this.patients[i].id;
          var gender = this.patients[i].gender;
          if (gender === "Male") {
            this.maleGender = "checked";
            this.femaleGender = ""
          } else {
            this.femaleGender = "checked";
            this.maleGender = "";
          }
          if (id === barcodeData.text) {
            this.patient = this.patients[i];
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

