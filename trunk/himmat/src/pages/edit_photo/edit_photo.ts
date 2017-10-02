import { Component, ViewChild } from '@angular/core';
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
export class EditPhoto {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  content = '';
  isDrawing = false;
  base64Image : any;
  canvas = '';
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public toastCtrl: ToastController,
      public params: NavParams
    ) {
        //this.base64Image = this.params.data.base64Image;
        this.DisplayMessage(this.params.data.base64Image);
        this.InitializeCanvas();
        //this.setBackgroundImage(this.params.data.base64Image);
        
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
      var canvas = document.querySelector('canvas');
      var context = canvas.getContext('2d');
      var image = new Image();
      image.onload = function(){
        context.drawImage(image, window.screen.width, window.screen.height);
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