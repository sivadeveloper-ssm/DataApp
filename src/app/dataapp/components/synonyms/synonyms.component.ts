import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Synonyms } from '../../models/synonyms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { BasicEntity } from '../../models/basicEntity';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss']
})
export class SynonymsComponent implements OnInit {

  @Input() results : Synonyms[];
  @Input() topics : BasicEntity[];
 displayedColumns : string[] = ['id','description','topic'];
 dataSource : MatTableDataSource<Synonyms>;
 @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  private attribute : string;

  constructor(private api : ContentService, private route : ActivatedRoute) { }

  ngOnInit() {

    this.attribute = this.route.snapshot.url[0].path.toLowerCase();

    this.api.getData('subAreas').subscribe( data => {
      this.topics = data;
    });

    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      this.dataSource = new MatTableDataSource<Synonyms>(this.results);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });

  }

  getTopicName(topicId){
    if(this.topics)
     return this.topics.find( o => o.id == topicId).description;
}

}
