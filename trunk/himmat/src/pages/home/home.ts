import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../detail_page/details_page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  
    constructor(public nav: NavController) {
      this.items = [
        {
          'title': 'Rose',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#E63135'
        },
        {
          'title': 'Bob',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#0CA9EA'
        },
        {
          'title': 'Anna',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#F46529'
        },
        {
          'title': 'Shara',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#FFD439'
        },
        {
          'title': 'Jim',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#CE6296'
        },
        {
          'title': 'Emma',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#78BD43'
        },
        {
          'title': 'Tony',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#3575AC'
        },
        {
          'title': 'John',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#412159'
        },
        {
          'title': 'Eva',
          'icon': 'tux',
          'description': 'Some discription for this user',
          'color': '#000'
        },
      ]
    }
  
    openNavDetailsPage(item) {
      this.nav.push(DetailsPage, { item: item });
  }
}
