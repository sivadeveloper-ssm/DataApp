import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {environment} from '../../../environments/environment';
import { Observable, of } from 'rxjs';

import {map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

 
  private endPoint = environment.baseUrl;

  constructor(private http : HttpClient,private snackBar : MatSnackBar) { }

  getData(attribute) : Observable<any> {
    return this.http.get(this.endPoint + attribute).pipe(
      map(this.extractData));
  }

  private extractData( res : Response){
    let body = res;
    return body || {};
  }

  setData(entity : any)  {
    console.log(entity);
    return this.http.post(this.endPoint + entity.attribute,entity).subscribe(data => {
      this.snackBar.open( "Successfully Completed","Ok", {
        duration : 2000,
      })
    },
    (err : HttpErrorResponse) => {
      this.snackBar.open("Error Occured. Details " + err.name + "  " + err.message,"Ok " , {
        duration : 2000,
      });
    });
  }
// { params : { id  : entity.id}}
  updateData(entity : any){
    
    return this.http.put(this.endPoint + entity.attribute + "/" + entity.id, entity).subscribe(data => {
                            this.snackBar.open( "Successfully Completed","Ok", {
                              duration : 2000,
                            })
                          },
                          (err : HttpErrorResponse) => {
                            this.snackBar.open("Error Occured. Details " + err.name + "  " + err.message,"Ok " , {
                              duration : 2000,
                            }); 
                          })
  }

}
