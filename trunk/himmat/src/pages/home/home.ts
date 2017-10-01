import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Patient } from '../services/PatientApi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any = [];
  private users = [];
  private names = [];
  constructor(public nav: NavController, private patientAPI: Patient) {
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
}
