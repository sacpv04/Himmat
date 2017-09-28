import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class Patient {
  private baseUrl = 'https://elite-schedule-app-i2-2da12.firebaseio.com\tournaments.json'; 

  constructor(private http: Http) {

  }

  getPartients() {
    return new Promise (resolve => {
      // ${this.baseUrl}/tournaments.json
      this.http.get("https://elite-schedule-app-i2-2da12.firebaseio.com/tournaments.json")
      .subscribe(res => {
        resolve(res.json());
      });
    });
  }
}

