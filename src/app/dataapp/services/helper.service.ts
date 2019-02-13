import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  
  changeCaseFirstCharater(txt) {
    return txt.charAt(0).toLowerCase() + txt.slice(1); 
  }

}
