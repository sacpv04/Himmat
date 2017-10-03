import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
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
      public storage: Storage,
    ) {
      var item = params.data.item;
      var sexe : string;
      this.patient = new PatientModel();
      this.patient.name = item.name;
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
            break; 
          }                   
        }                
       }, (err) => {
           // An error occurred
       });
    }

    openPhotoRecording(){
      this.nav.push(PhotoRecording);
    }


}

class PatientModel {
  id: string;
  name: string;
  gender: string;
  age: string;
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