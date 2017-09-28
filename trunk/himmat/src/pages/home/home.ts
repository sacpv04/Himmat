import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';
import { Patient } from '../services/PatientApi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    items:any;    
    constructor(public nav: NavController, private patientAPI : Patient) {  
      this.patientAPI.getPartients().then(res => {
        this.items = res;       
      });
    }
  
    openNavDetailsPage(item) {
      this.nav.push(DetailsPage, { item: item });
  }
}
