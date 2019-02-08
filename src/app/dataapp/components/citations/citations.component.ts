import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Citation } from '../../models/citations';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.scss']
})
export class CitationsComponent implements OnInit {

  @Input() results : Citation[]; 
  displayedColumns : string[] = ['id', 'citationid','description'];
  dataSource : MatTableDataSource<Citation>;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  attribute : string;
  constructor(private api : ContentService , private route : ActivatedRoute ) { }

  ngOnInit() {  
    
    
    this.attribute = this.route.snapshot.url[0].path.toLowerCase();

      this.api.getData(this.attribute).subscribe( data => {
        this.results = data;
        this.dataSource = new MatTableDataSource<Citation>(this.results);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
   

  }
}
