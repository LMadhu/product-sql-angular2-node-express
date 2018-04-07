import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
  private saveDataUrl;
  private getDataUrl;

  constructor(private http: Http) { }

  saveData(payload: any) {
    console.log('payload ==> ', payload);
    try {
      this.saveDataUrl = "http://localhost:3000/multiply/saveData"
      return this.http.post(this.saveDataUrl, payload)
        .map((response) => {
          return response;
        })
        .catch((error) => {
          console.log('error ==> ', error);
          return Observable.throw(JSON.stringify(error));
        });
    }
    catch (ex) {
      console.log('ex ==> ', ex);
    }
  }

  getData() {
    this.getDataUrl = "http://localhost:3000/multiply/getData"
    return this.http.get(this.getDataUrl)
      .map((response: any) => {
        return response.data;
      });
  }

}
