import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Patient { 
  constructor(private http: Http) {

  }

  getPartients() {
    return new Promise (resolve => {
      // ${this.baseUrl}/tournaments.json
      this.http.get("https://fhirtest.uhn.ca/baseDstu3/Patient?_pretty=true")
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }
}

