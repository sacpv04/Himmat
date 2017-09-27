
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'details_page.html',
  })
  export class DetailsPage {
    item;
  
    constructor(params: NavParams) {
      this.item = params.data.item;
    }
}