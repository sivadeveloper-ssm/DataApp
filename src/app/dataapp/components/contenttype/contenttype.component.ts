import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContentType } from '../../models/contenttype';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-contenttype',
  templateUrl: './contenttype.component.html',
  styleUrls: ['./contenttype.component.scss']
})
export class ContenttypeComponent implements OnInit {

  @Input() results : ContentType[];
  @Input() templateTypes : BasicEntity[];
 displayedColumns : string[] = ['id','description','parentId','templateType'];
 dataSource : MatTableDataSource<ContentType>;
 @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  private attribute : string;

  constructor(private api : ContentService, private route : ActivatedRoute,
              private helper : HelperService) { }

  ngOnInit() {

    this.attribute = this.helper.changeCaseFirstCharater(this.route.snapshot.url[0].path);

    console.log(this.attribute);

    this.api.getData('templateTypes').subscribe( data => {
      this.templateTypes = data;
    });

    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<ContentType>(this.results);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });

  }

  getTopicName(templateId){
    if(this.templateTypes)
     return this.templateTypes.find( o => o.id == templateId).description;
}

}
