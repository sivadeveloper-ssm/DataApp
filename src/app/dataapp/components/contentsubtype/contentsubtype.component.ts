import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContentSubType } from '../../models/contentSubType';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-contentsubtype',
  templateUrl: './contentsubtype.component.html',
  styleUrls: ['./contentsubtype.component.scss']
})
export class ContentsubtypeComponent implements OnInit {

  
  @Input() results : ContentSubType[];
  @Input() templateTypes : BasicEntity[];
  @Input() contentTypes : BasicEntity[];
 displayedColumns : string[] = ['id','description','parent','templateType'];
 dataSource : MatTableDataSource<ContentSubType>;
 @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  private attribute : string;

  constructor(private api : ContentService, private route : ActivatedRoute,
              private helper : HelperService) { }

  ngOnInit() {

    this.attribute = this.helper.changeCaseFirstCharater(this.route.snapshot.url[0].path);

 

    this.api.getData('templateTypes').subscribe( data => {
      this.templateTypes = data;
    });


    this.api.getData('contentTypes').subscribe( data => {
      this.contentTypes = data;
    });


    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<ContentSubType>(this.results);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });

  }

  getTemplateName(templateId){
    if(this.templateTypes)
     return this.templateTypes.find( o => o.id == templateId).description;
}

getContentTypeName(contentTypeId){
  if(this.contentTypes)
   return this.contentTypes.find( o => o.id == contentTypeId).description;
}


applyFilter(filterValue : string){
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
