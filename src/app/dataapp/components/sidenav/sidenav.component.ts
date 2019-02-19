import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private databaseTables = ['areas','subAreas','citations','contentTypes',
                            'industries','products','governingBodies',
                          'contentSubTypes','fileTypes','geographies',
                          'synonyms','templateTypes'];

 map = new Map([['areas','Areas'],
                ['subAreas','Sub Areas'],
                ['citations','Citations'],
                ['contentTypes','Content Types'],
                ['industries','Industries'],
                ['products','Products'],
                ['governingBodies','Governing Bodies'],
                ['contentSubTypes','Content Sub Types'],
                ['fileTypes','File Types'],
                ['geographies','Geographies'],
                ['synonyms','Synonyms'],
                ['templateTypes','Template Types']]);
  constructor(private route : Router) { }

  ngOnInit() {
    if(!this.route.url.includes('/dataapp/'))
    this.route.navigate(['/dataapp/areas']);
  }



}
