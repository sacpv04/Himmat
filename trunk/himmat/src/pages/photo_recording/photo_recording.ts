import { Diagnostic } from '@ionic-native/diagnostic';
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EditPhoto } from '../edit_photo/edit_photo';
import { NavController, ToastController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

@Component({
    selector: 'photo_recording',
    templateUrl: 'photo_recording.html'
})

export class PhotoRecording{

    private readonly NO_PERMESSION_CAMERA: string = 'Cannot access camera';
    public base64Image: string;
    
    
    constructor(public nav: NavController, public toastCtrl: ToastController,
                 public diagnostic: Diagnostic, public cameraPreview: CameraPreview,
                public params: NavParams){
        this.checkPermission();
    }

    private checkPermission(){
        //TODO: check permission access camera on device
        this.diagnostic.isCameraAuthorized(false).then((authorized) => {
            if(authorized)
            {
                this.initializePreview();
                this.cameraPreview.startCamera(this.initializePreview()).then((res) => {
                    
                }, (err) => {
                    
                })
            }   
            else{
                //Request permission to access camera
                this.diagnostic.requestCameraAuthorization(false).then((status) => {                    
                    if(status == this.diagnostic.permissionStatus.GRANTED)
                    {                       
                        this.initializePreview();
                        //start preview
                        this.cameraPreview.startCamera(this.initializePreview()).then((res) => {
                           
                        }, (err) => {
                            
                        });
                    }                        
                    else{
                        this.DisplayMessage(this.NO_PERMESSION_CAMERA);
                    }
                })
            }
        });
    }

    private initializePreview(){
        //Initial camera preview
        let cameraOptions: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            tapPhoto: false,
            previewDrag: false,
            toBack: true,
            alpha: 1
        }
        
        return cameraOptions;
    }

    takePicture(){
        let pictureOpts: CameraPreviewPictureOptions = {
            width: window.screen.width,
            height: window.screen.height,
            quality: 85
        };
        this.cameraPreview.takePicture(pictureOpts).then((imageData) => {            
            this.nav.push(EditPhoto, {base64Image: 'data:image/jpeg;base64,' + imageData,
                                    patient: this.params.data.patient});
        }, (err) => {
            this.DisplayMessage("TakePicture: " + err);
        })
    }

    // function for test getting patient id
    // should remove
    showInfo(){
        //this.DisplayMessage('Xinh chao: ' + this.params.get('patient'));
    }

    private DisplayMessage(msg: string){
        this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        }).present();
    }
}