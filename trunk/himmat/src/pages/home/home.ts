import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any = [];
  patients:any = [];
  constructor(public nav: NavController, private events: Events) {    
  }

  ngOnInit() {
    this.events.subscribe('users:created', (patient) => {
      console.log(patient);      
      this.patients.push(patient);
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
}
