import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FileType } from '../../models/fileTypes';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-file-types',
  templateUrl: './file-types.component.html',
  styleUrls: ['./file-types.component.scss']
})
export class FileTypesComponent implements OnInit {

  @Input() results : FileType[];
 displayedColumns : string[] = ['id','description','extension'];
 dataSource : MatTableDataSource<FileType>;
 @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  private attribute : string;

  constructor(private api : ContentService, private route : ActivatedRoute,private helper : HelperService) { }

  ngOnInit() {

    this.attribute = this.helper.changeCaseFirstCharater(this.route.snapshot.url[0].path);


    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<FileType>(this.results);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });

  }


applyFilter(filterValue : string){
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
