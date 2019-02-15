import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { geography } from '../../models/geography';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-geography',
  templateUrl: './geography.component.html',
  styleUrls: ['./geography.component.scss']
})
export class GeographyComponent implements OnInit {

  @Input() results : geography[];
  @Input() geographyType : BasicEntity[];
 displayedColumns : string[] = ['id','description','abbr','geographyType'];
 dataSource : MatTableDataSource<geography>;
 @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  private attribute : string;

  constructor(private api : ContentService, private route : ActivatedRoute) { }

  ngOnInit() {

    this.attribute = this.route.snapshot.url[0].path.toLowerCase();

    this.api.getData('geographyTypes').subscribe( data => {
      this.geographyType = data;
    });

    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<geography>(this.results);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });

  }

  getGeographyType(typeId){
    if(this.geographyType)
     return this.geographyType.find( o => o.id == typeId).description;
}


applyFilter(filterValue : string){
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
