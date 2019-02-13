import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  private attribute;
  private cardTitleArray = ['Areas','Sub Areas', 'Template Types', 'Governing Bodies'];
  private cardTitleStr ; 
  @Input() results :  [];
  displayedColumns : string[] = ['id', 'description'];
  private dataSource : MatTableDataSource<BasicEntity>;
  @ViewChild(MatPaginator) paginator : MatPaginator; 
  @ViewChild(MatSort) sort : MatSort;
  constructor( private api : ContentService,private route : ActivatedRoute,private helper : HelperService) { }

  ngOnInit() {

    this.attribute = this.helper.changeCaseFirstCharater(this.route.snapshot.url[0].path);
    

    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<BasicEntity>(this.results);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });
  }

  applyFilter(filterValue : string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
