import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private databaseTables = ['Areas','SubAreas','Citations','ContentTypes','Industries','Products','GoverningBodies',
                    'ContentSubTypes','FileTypes','Geographies','Synonyms','TemplateTypes'];


  constructor(private route : Router) { }

  ngOnInit() {
    if(!this.route.url.includes('/dataapp/'))
    this.route.navigate(['/dataapp/landingpage']);
  }



}
