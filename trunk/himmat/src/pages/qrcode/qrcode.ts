import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Patient } from '../services/PatientApi';

@Component({
  selector: 'qrcode',
  templateUrl: 'qrcode.html'
})
export class QRCode {  
  private qrcodes = [];
  items: any = [];  
  constructor(public nav: NavController, private patientAPI: Patient) { 
    this.patientAPI.getPartients().then(res => {
      this.items = res;     
      this.items.entry.forEach(element => {       
        if (element.resource.id) {         
          this.qrcodes.push(element.resource.id);
        }
      });
    });
  }
}
