import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { QRCode } from '../qrcode/qrcode';
import { HandWrite } from '../handwrite/handwrite';
import { PhotoRecording } from '../photo_recording/photo_recording';
import { EditPhoto } from '../edit_photo/edit_photo';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Patient } from '../services/PatientApi';

import { ToastController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { MediaPlugin } from 'ionic-native';

@Component({
    selector: 'detail-page',
    templateUrl: 'details_page.html',
  })
  export class DetailsPage {
    patient:any;   
    signature = '';
    photoCaptured = '';
    isShowPhoto = false;
    private patients = []; 
    items:any = [];
    public showHandWrite = false;
    media: MediaPlugin;
    isRecording = false;
    isPlaying = false;
    isDisableRecord = false;
    isDisablePlay = true;

    constructor(
      public nav: NavController, 
      params: NavParams, 
      private barcodeScanner: BarcodeScanner,     
      public events: Events,
      private patientAPI: Patient,
      private alertCtrl: AlertController,
      public storage: Storage,
      private speechRecognition: SpeechRecognition,
      private cd: ChangeDetectorRef,
      public toastCtrl: ToastController
    ) {
      var item = params.data.item;
      if (item === undefined) {
        this.patient = new PatientModel(); 
      } else {
        this.patient = item;
      } 
  
      this.events.subscribe("imageName", (imageName) => {
        this.showHandWrite = true;  
        this.signature = imageName;
      });

      // Load Photo
      this.loadPhotoCaptured();     

      this.storage.get(this.patient.id).then((data) => {
        console.log(this.patient.id);
        if(data != null) {
          this.signature = data;
          this.showHandWrite = true;        
        }
               
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
      this.nav.push(HandWrite, {item: this.patient.id});
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

    private loadPhotoCaptured(){
      var photoID = (this.patient.id == undefined) ? 'photo:unknow_id' : 'photo' + this.patient.id;
      this.storage.get(photoID).then((pic) =>{
        if(pic != null || pic != undefined)
        {
          this.isShowPhoto = true;
          this.photoCaptured = pic;
        }else
          this.isShowPhoto = false;
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

    goBack() {
      this.nav.pop();
    }

    goEdit(){
      this.nav.push(EditPhoto);
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
        this.nav.first; 

        //Save photo unknow id
        this.storage.set(this.patient.id, this.photoCaptured);
      }
    }

    openPhotoRecording(){     
      this.nav.push(PhotoRecording, {patient: this.patient});
    }

    editPhoto(){
      this.nav.push(EditPhoto);
    }

    ionViewDidEnter() {
      this.getPermissionSpeechRecognition();
      this.media = new MediaPlugin('recording.wav');
      
    }

    getPermissionSpeechRecognition(){
      this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission().then(
            () => console.log('Granted'),
            () => this.showToast('Denied')
          );
        }
      });
    }

    showToast(messageString: string) {
      const toast = this.toastCtrl.create({
        message: messageString,
        duration: 2000,
        position: 'bottom'
      });
  
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
  
      toast.present();
    }

    speechToTextPatientName() {
      let options = {
        language: 'en-US'
      };

      this.getPermissionSpeechRecognition();
  
      this.speechRecognition.startListening(options).subscribe(matches => {
        this.cd.detectChanges();
        this.patient.name = matches[0];
      });
    }

    speechToTextQuickNote() {
      let options = {
        language: 'en-US'
      };

      this.getPermissionSpeechRecognition();
  
      this.speechRecognition.startListening(options).subscribe(matches => {
        this.cd.detectChanges();
        if(!this.patient.quick_note){
          this.patient.quick_note = "";
        }
        this.patient.quick_note += matches[0] + '\n';
      });
    }

    // this part belong to quick input
    showPrompt() {
      let prompt = this.alertCtrl.create({
        title: 'Quick input',
        message: "Enter {name} {age} M/F {symptom}",
        inputs: [
          {
            name: 'input',
            placeholder: 'Input Patern'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              console.log('Saved clicked');
              this.inputAnalysic(data.input);
            }
          }
        ]
      });
      prompt.present();
    }

    inputAnalysic(inputTexts :string) {      
      var arrayOfStrings = inputTexts.split(" ");
      var name = arrayOfStrings[0];

      for (var index = 1; index < arrayOfStrings.length; index++) {
        var text = arrayOfStrings[index];
        var regex=/^[0-9]+$/;
        if (text.match(regex)){         
          this.patient.name = name;
          this.patient.age = text;
          var gender = arrayOfStrings[index+1];
          if (gender==='m' || gender === 'M') {
            this.patient.gender = "Male";
          } else {
            this.patient.gender = "Female"
          }
          var symptom = arrayOfStrings[index+2];
          for (var i = index+3; i < arrayOfStrings.length; i++) {
            var element = arrayOfStrings[i];
            symptom +=" "+ element;
          }
          this.patient.symptom = symptom;
          break;
        } else {
          name+=" " + text;
        }
      }
    }

    // Function for Record and Play/Stop audio
    startRecording() {
      try {
        this.isDisablePlay = true;
        this.toggleRecord()
        this.media.startRecord();
      }
      catch (e) {
        this.showToast('Could not start recording!');
      }
    }
  
    stopRecording() {
      try {
        this.isDisablePlay = false;
        this.toggleRecord()
        this.media.stopRecord();
      }
      catch (e) {
        this.showToast('Could not stop recording.');
      }
    }
  
    startPlayBack() {
      try {
        this.isDisableRecord = true;
        this.togglePlay()
        this.media.play();
      }
      catch (e) {
        this.showToast('Could not play recording.');
      }
    }
  
    stopPlayBack() {
      try {
        this.isDisableRecord = false;
        this.togglePlay()
        this.media.stop();
        this.media.release();
      }
      catch (e) {
        this.showToast('Could not stop playing recording.');
      }
    } 
    toggleRecord(){
      this.isRecording = !this.isRecording;
    }
    togglePlay(){
      this.isPlaying = !this.isPlaying;
    }
    doRecord()
    {
      if(!this.isRecording)
      {
        this.startRecording();
      }
      else{
        this.stopRecording();
      }
    }
  
    doPlay()
    {
      if(!this.isPlaying)
      {
        this.startPlayBack();
      }
      else{
        this.stopPlayBack();
      }
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
  symptom: string;
}