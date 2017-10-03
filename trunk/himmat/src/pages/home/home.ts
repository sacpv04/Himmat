import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any = []; 
  patients:any = [];
  constructor(public nav: NavController, public platform: Platform,
    public actionsheetCtrl: ActionSheetController, private events: Events) {
  }

  ngOnInit() {
    this.events.subscribe('users:created', (res) => {
      this.patients.push(res);     
    });      
  }

  openNavDetailsPage(patient) {
    this.nav.push(DetailsPage, { item: patient });
  }

  newDetailsPage() {    
    this.nav.push(DetailsPage);
  }

  openMenu() {
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
            console.log('Action 1');
          }
        },
        {
          text: 'Action 2',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Action 2');
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
