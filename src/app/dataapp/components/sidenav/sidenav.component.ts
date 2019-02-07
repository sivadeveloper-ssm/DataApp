import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private databaseTables = ['Areas','SubAreas','Citations','ContentTypes','Industries','Products','GoverningBodies',
                    'ContentSubTypes','FileTypes','Geographies','GeographyTypes','Synonyms','Taxonomy','TemplateTypes'];


  constructor(private route : Router) { }

  ngOnInit() {
    this.route.navigate(['/dataapp/generic']);
  }


  changeCaseFirstCharater(txt) {
    return txt.charAt(0).toLowerCase() + txt.slice(1); 
  }
}
