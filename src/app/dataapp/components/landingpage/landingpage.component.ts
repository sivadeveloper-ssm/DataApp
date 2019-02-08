import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-generic',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingPageComponent implements OnInit {

  @Input() results : BasicEntity[]; 
  displayedColumns : string[] = ['id', 'description'];
  dataSource : MatTableDataSource<BasicEntity>;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  attribute : string;
  constructor(private api : ContentService , private route : ActivatedRoute ) { }

  ngOnInit() {  
    
   
  }


}
