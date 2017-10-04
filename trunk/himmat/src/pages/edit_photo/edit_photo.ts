import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';
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
        this.InitializeCanvas();
        
    }

    ngAfterViewInit(){    
      this.setBackgroundImage(this.params.data.base64Image);
    }

    private InitializeCanvas(){
      let options : Object = {
        'minWidth': 2,
        'canvasWidth': window.screen.width,
        'canvasHeight': window.screen.height,
        'penColor': '#000'
      };
      
      return options;     
    }

    private setBackgroundImage(img: string)
    {
      let canvas = this.elementRef.nativeElement.querySelector('canvas');
      let context = canvas.getContext('2d');
      let image = new Image();
      image.onload = function(){
        context.drawImage(image, 0, 0, image.width, image.height,
                                  0, 0, canvas.width, canvas.height);
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
  
    }

  drawClear() {
    this.signaturePad.clear();
  }

  savePhoto(){
    this.content = this.signaturePad.toDataURL();
    var patient = this.params.get('patient');
    let photoID = (patient.id == undefined) ? 'photo:unknow_id' : 'photo' + patient.id;
    this.storage.set(photoID, this.content);
    this.signaturePad.clear();
    this.navCtrl.push(DetailsPage, {item: patient});
  }

  private goBack(){
    this.signaturePad.clear();
    this.navCtrl.popToRoot();
  }

  setColor(color: string, fab: FabContainer){    
    this.signaturePad.set('penColor', color);
    fab.close();
  }

  clearContent(){
    this.signaturePad.clear();
    this.setBackgroundImage(this.params.data.base64Image);
  }
}