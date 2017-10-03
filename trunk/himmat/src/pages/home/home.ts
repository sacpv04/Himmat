import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Patient } from '../services/PatientApi';
import { Platform, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any = [];
  private users = [];
  private names = [];
  constructor(public nav: NavController, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, private patientAPI: Patient) {
    this.patientAPI.getPartients().then(res => {
      this.items = res;
      this.items.entry.forEach(element => {
        if (element.resource.name) {
          this.names.push(element.resource.name);
        }
      });
      this.names.forEach(element => {
        this.users.push(element[0].family);
      });
    });
    
    
  }

  openNavDetailsPage(user) {
    var patient = {   
      'name': '',
      "icon": "person"
    }
    patient.name = user;
    this.nav.push(DetailsPage, { item: patient });
  }

  newDetailsPage() {
    var patient = {
      'name': 'New User',
      'icon': 'person'
    }
    this.nav.push(DetailsPage, { item: patient });
  }

  openMenu() {
    console.log('Click');
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Actions',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Atcion 1',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Item 1');
          }
        },
        {
          text: 'Action 2',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Item 2');
          }
        },
        {
          text: 'Log out',
          icon: !this.platform.is('ios') ? 'log-out' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
