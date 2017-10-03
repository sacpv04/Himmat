import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { QRCode } from '../qrcode/qrcode';
import { HandWrite } from '../handwrite/handwrite';
import { PhotoRecording } from '../photo_recording/photo_recording';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Patient } from '../services/PatientApi';

@Component({
    selector: 'detail-page',
    templateUrl: 'details_page.html',
  })
  export class DetailsPage {
    patient:any;   
    signature = '';
    private patients = []; 
    items:any = [];
    public signatureImage : any;
    constructor(
      public nav: NavController, 
      params: NavParams, 
      private barcodeScanner: BarcodeScanner,     
      private events: Events,
      private patientAPI: Patient,
      private alertCtrl: AlertController,
      public storage: Storage,
    ) {
      var item = params.data.item;
      var sexe : string;
      this.patient = new PatientModel();      
      this.events.subscribe("imageName", (imageName) => {
        this.storage.get(imageName).then((data) => {
          this.signature = data;         
        });
      })
      this.storage.get(this.patient.name).then((data) => {
        this.signature = data;        
      });
      // create data for scan code
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
    goHandWrite() {
      //console.log("ID: " + this.patient.id);
      console.log("NAME: " + this.patient.name);
      this.nav.push(HandWrite, {item: this.patient.name});
    }
    scanQRCode() {
      this.barcodeScanner.scan().then((barcodeData) => {                
        for (var i = 0; i < this.patients.length; i++) {
          var id = this.patients[i].id;             
          if (id === barcodeData.text) {
            this.patient = this.patients[i];
            this.patient.name = this.patients[i].name[0].family;
            this.patient.heathcareid = id;
            this.patient.brithday = this.patients[i].birthDate;
            var dateOfBirth = new Date(this.patients[i].birthDate);
            this.patient.age = this.getAge(dateOfBirth);
            break; 
          }                   
        }                
       }, (err) => {
           // An error occurred
       });
    }

    getAge(date) {
      var now = new Date();
      var age = now.getFullYear() - date.getFullYear();
      return age;
    }

    presentAlert(title, subTitle, buttons) {
      const alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: buttons
      });
      alert.present();
    }

    addPatient() {
      if (this.patient.heathcareid === "" || this.patient.heathcareid === undefined) {
        this.presentAlert("Heathcare ID", "Heathcare ID is null", ["OK"]);
      } else if (this.patient.id === "" || this.patient.id === undefined) {
        this.presentAlert("QR Code", "QR Code is null", ["OK"]);
      } else {
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
        if (this.patient.name  === "" || this.patient.name === undefined) {
          this.patient.display = false;
        } else if (this.patient.gender  === "" || this.patient.gender === undefined) {
          this.patient.display = false;
        } else if (this.patient.age  === "" || this.patient.age === undefined) {
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
            case "1":
                this.patient.color = "primary";
                break;
            case "2":
                this.patient.color = "red";
                break;
            case "3":
                this.patient.color = "orange";
                break;
            case "4":
                this.patient.color = "yellow";
                break;          
            default:
                this.patient.color = "oxygen";
        }          
        this.events.publish('users:created', this.patient);
        this.presentAlert("Patient Saving", "New Patient is saving successful !", ["OK"]);        
      }
    }

    openPhotoRecording(){
      this.nav.push(PhotoRecording);
    }


}

class PatientModel {
  id: string;
  name: string;
  gender: string;
  age: number;
  heathcareid: string;
  imageName: String;
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