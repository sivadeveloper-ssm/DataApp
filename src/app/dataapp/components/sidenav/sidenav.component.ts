import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private databaseTables = ['areas','topics','citations',
                            'industries','products','governingBodies','contentTypes',
                          'types','geographies',
                          'synonyms','templateTypes'];

  constructor(private route : Router) { }

  ngOnInit() {
    if(!this.route.url.includes('/dataapp/'))
    this.route.navigate(['/dataapp/areas']);
  }

  firstLetterUpperCase(stringValue){
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  }


}
