import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Events, ToastController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Patient } from '../services/PatientApi';
@Component({
  selector: 'edit_photo',
  templateUrl: 'edit_photo.html',
})
export class EditPhoto implements AfterViewInit{
  ngAfterViewInit(){
    this.setBackgroundImage(this.params.data.base64Image);
  }
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  content = '';
  isDrawing = false;
  base64Image : any;
  canvas = '';

  constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public toastCtrl: ToastController,
      public params: NavParams,
      public elementRef: ElementRef
    ) {        
        
        
    }

    private InitializeCanvas(){
      let options : Object = {
        'minWidth': 2,
        'canvasWidth': window.screen.width,
        'canvasHeight': window.screen.height,
        'backgroundColor': '#fff',
        'penColor': '#666a73'
      };
      
      return options;     
    }

    private setBackgroundImage(img: string)
    {
      let canvas = this.elementRef.nativeElement.querySelector('canvas');
      let context = canvas.getContext('2d');
      let image = new Image();
      image.onload = function(){
        context.drawImage(image, 0, 0);
      }
      image.src = img;
    }  

  drawStart() {
    this.isDrawing = true;
  }

    drawCancel() {
      this.navCtrl.push(HomePage);
    }

    drawComplete() {
      this.content = this.signaturePad.toDataURL();
      this.storage.set(this.base64Image, this.content);
      this.signaturePad.clear();
      this.events.publish('imageName', this.base64Image);
      console.log(this.base64Image);
      this.navCtrl.pop();
    }

  drawClear() {
    this.signaturePad.clear();
  }

  private DisplayMessage(msg: string){
    this.toastCtrl.create({
        message: msg,
        position: 'bottom',
        duration: 20000
    }).present();
}
}