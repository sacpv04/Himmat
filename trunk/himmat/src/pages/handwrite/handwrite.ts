import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
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
    'canvasWidth': window.screen.width,
    'canvasHeight': window.screen.height,
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
        console.log("1:" + window.screen.width + "2:" + window.screen.height);
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
    this.navCtrl.pop();
  }

   drawComplete() {
    if (this.patientId == undefined) {
      console.log("enter id");
      this.navCtrl.pop();
    } else {
      this.signature = this.signaturePad.toDataURL();
      this.storage.set(this.patientId, this.signature);
      this.signaturePad.clear();
      this.events.publish('imageName', this.patientId);
      console.log(this.patientId);
      this.navCtrl.pop();
    }
  
  }

  drawClear() {
    //this.signaturePad.clear();
    this.storage.clear();
  }
  
  
}