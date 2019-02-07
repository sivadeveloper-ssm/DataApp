import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { Type } from '../../models/generic';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  @Input() results : Type[]; 
  displayedColumns : string[] = ['id', 'description'];
  dataSource : MatTableDataSource<Type>;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  attribute : string;
  constructor(private api : ContentService , private route : ActivatedRoute ) { }

  ngOnInit() {  
    
    
    /* this.route.params.subscribe( params => {

      
      this.attribute = params['tag'];

      this.api.getData(this.attribute).subscribe( data => {
        this.results = data;
        this.dataSource = new MatTableDataSource<Type>(this.results);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
 */
   



    
  }

  applyFilter(filterValue : string){
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }

}
