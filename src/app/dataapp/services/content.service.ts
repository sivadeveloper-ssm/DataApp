import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment} from '../../../environments/environment';
import { Observable, of } from 'rxjs';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private endPoint = environment.baseUrl;

  constructor(private http : HttpClient) { }

  getData(attribute) : Observable<any> {
    return this.http.get(this.endPoint + attribute).pipe(
      map(this.extractData));
  }

  private extractData( res : Response){
    let body = res;
    return body || {};
  }

}
