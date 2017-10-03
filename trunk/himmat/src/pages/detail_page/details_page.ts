import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QRCode } from '../qrcode/qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Patient } from '../services/PatientApi';
import { Events } from 'ionic-angular';

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
    constructor(public nav: NavController, params: NavParams, private barcodeScanner: BarcodeScanner, private patientAPI: Patient, private evens: Events) {
      this.item = params.data.item;      
      this.patient = new PatientModel();
      this.patientAPI.getPartients().then(res => {
        this.items = res;
        this.items.entry.forEach(element => {
          this.patients.push(element.resource);
        });            
      });                     
    }
   
    goQRCode() {
      this.nav.push(QRCode);
    }

    addPatient() {
      var current_date = new Date();
      var hours = current_date.getHours();
      var minutes = current_date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var new_minutes = minutes < 10 ? '0'+ minutes : minutes;
      var strTime = hours + ':' + new_minutes + ' ' + ampm;
      this.patient.arrived = strTime;
      this.patient.display = true;
      if(this.patient.id === "" || this.patient.id === undefined) {
        this.patient.display = false;
      } else if (this.patient.name  === "" || this.patient.name === undefined) {
        this.patient.display = false;
      } else if (this.patient.gender  === "" || this.patient.gender === undefined) {
        this.patient.display = false;
      } else if (this.patient.birthday  === "" || this.patient.birthday === undefined) {
        this.patient.display = false;
      } else if (this.patient.severity === "" || this.patient.severity === undefined) {
        this.patient.display = false;
      } else if (this.patient.alleric === "" || this.patient.alleric === undefined) {
        this.patient.display = false;
      } else if (this.patient.bloodtype === "" || this.patient.bloodtype === undefined) {
        this.patient.display = false;
      } else if (this.patient.surgery_history === "" || this.patient.surgery_history === undefined) {
        this.patient.display = false;
      } else if (this.patient.mental_illness === "" || this.patient.mental_illness === undefined) {
        this.patient.display = false;
      }

      switch(this.patient.severity)
      {
          case "ESI 1":
              this.patient.color = "primary";
              break;
          case "ESI 2":
              this.patient.color = "red";
              break;
          case "ESI 3":
              this.patient.color = "orange";
              break;
          case "ESI 4":
              this.patient.color = "yellow";
              break;          
          default:
              this.patient.color = "oxygen";
      }      
      this.evens.publish('users:created', this.patient);
    }

    scanQRCode() {     
      this.barcodeScanner.scan().then((barcodeData) => {                
        for (var i = 0; i < this.patients.length; i++) {
          var id = this.patients[i].id;             
          if (id === barcodeData.text) {
            this.patient = this.patients[i];
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
  birthday: string;
  severity:string;
  alleric:string;
  bloodtype:string;
  surgery_history:string;
  mental_illness:string;
  quick_note:string;
  arrived:string;
  color:string;
  display:boolean;    
}

