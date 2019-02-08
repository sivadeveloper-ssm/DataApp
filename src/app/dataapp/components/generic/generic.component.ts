import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  private attribute;
  @Input() results :  [];
  displayedColumns : string[] = ['id', 'description'];
  private dataSource : MatTableDataSource<BasicEntity>;
  @ViewChild(MatPaginator) paginator : MatPaginator; 
  @ViewChild(MatSort) sort : MatSort;
  constructor( private api : ContentService,private route : ActivatedRoute) { }

  ngOnInit() {

    this.attribute = this.changeCaseFirstCharater(this.route.snapshot.url[0].path);
    console.log(this.attribute);
    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<BasicEntity>(this.results);
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

 
  changeCaseFirstCharater(txt) {
    return txt.charAt(0).toLowerCase() + txt.slice(1); 
  }


  applyFilter(filterValue : string){
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }



}
