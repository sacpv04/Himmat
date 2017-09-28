import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'qrcode',
  templateUrl: 'qrcode.html'
})
export class QRCode { 
  qrcode1:string;
  qrcode2:string;
  qrcode3:string;
  qrcode4:string; 
  constructor(public nav: NavController) { 
    this.qrcode1 = "dd50aaf-6b03-4497-b074-d81703f07ee8";
    this.qrcode2 = "98c6857e-b0d1-4295-b89e-2d95a45437f2";
    this.qrcode3 = "dd50aaf-6b03-4497-b074-d81703f07ee8";
    this.qrcode4 = "89e13aa2-ba6d-4f55-9cc2-61eba6172c63";    
  }
}
