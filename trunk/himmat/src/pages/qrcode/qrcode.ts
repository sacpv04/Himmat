import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'qrcode',
  templateUrl: 'qrcode.html'
})
export class QRCode {  
  private qrcodes = [];
  constructor(public nav: NavController) {       
    this.qrcodes = ["dd50aaf","98c6857e", "dd50aaf", "89e13aa2"];
  }
}
