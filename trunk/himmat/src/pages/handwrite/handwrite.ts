import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Patient } from '../services/PatientApi';
import {ElementRef} from '@angular/core';

@Component({
  selector: 'page-signature',
  templateUrl: 'handwrite.html',
})
export class HandWrite {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  signature = '';
  isDrawing = false;
  patientId : any;
  canvas = '';
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };
  public signatureImage : string;

  constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public navParams:NavParams,
      public elRef: ElementRef
    ) {
        this.patientId = this.navParams.data.item;
        console.log(this.patientId);
    }
 
   //Other Functions
   ionViewDidEnter() {
       this.signaturePad.clear();
       this.storage.get(this.patientId).then((data) => {
       this.signature = data;
       if(this.signature) {
           let canvas = this.elRef.nativeElement.querySelector('canvas');
           let ctx = canvas.getContext("2d");

           let image = new Image();
           image.onload = function() {
              ctx.drawImage(image, 0,0);
           }
           image.src = this.signature;
           //this.signaturePad.fromDataURL(this.signature);
       }
    });
    
  }

  drawStart() {
    this.isDrawing = true;
  }

  drawCancel() {
    this.navCtrl.push(HomePage);
  }

   drawComplete() {
    /*this.signatureImage = this.signaturePad.toDataURL();
    this.storage.set('image2', this.signature);
    this.signaturePad.clear();
    console.log("done");
    this.navCtrl.push(HomePage, {signatureImage: this.signatureImage}); */

    this.signature = this.signaturePad.toDataURL();
    this.storage.set(this.patientId, this.signature);
    this.signaturePad.clear();
    this.events.publish('imageName', this.patientId);
    console.log(this.patientId);
    this.navCtrl.pop();
  }

  drawClear() {
    this.signaturePad.clear();
  }
  
  
}