import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort, MatTab } from '@angular/material';
import { HelperService } from '../../services/helper.service';
import { Citation } from '../../models/citations';
import { FileType } from '../../models/fileTypes';
import { Synonyms } from '../../models/synonyms';
import { geography } from '../../models/geography';
import { ContentType } from '../../models/contenttype';
import { ContentSubType } from '../../models/contentSubType';

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
  @Input() topics : BasicEntity[];
  @Input() geographyType : BasicEntity[];
  @Input() templateTypes : BasicEntity[];
  @Input() contentTypes : BasicEntity[];
  displayedColumns : string[];
  private dataSource : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator : MatPaginator; 
  @ViewChild(MatSort) sort : MatSort;
  constructor( private api : ContentService,private route : ActivatedRoute,private helper : HelperService) { }

  ngOnInit() {

    this.attribute = this.helper.changeCaseFirstCharater(this.route.snapshot.url[0].path);
      
    this.additionalRestCallsIfNeeded();

    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
      console.log(this.results);
      this.defineattributeSpecificValues();
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
    });
  }

  applyFilter(filterValue : string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  additionalRestCallsIfNeeded(){
     if(this.attribute == 'synonyms')
     {
      this.api.getData('subAreas').subscribe( data => {
      this.topics = data;
       });
    }
    else if(this.attribute == 'geographies')
    {
      this.api.getData('geographyTypes').subscribe( data => {
        this.geographyType = data;
      });
    }
    else if(this.attribute == 'contentTypes')
      this.getTemplateTypes();
    else if(this.attribute == 'contentSubTypes')
    {
  
    }
  }


  getTemplateTypes(){
    this.api.getData('templateTypes').subscribe( data => {
      this.templateTypes = data;
    });
  }


  defineattributeSpecificValues() {
    
     if(this.attribute == 'areas' || this.attribute =='subAreas' || this.attribute == 'industries' ||
        this.attribute == 'products' || this.attribute == 'governingBodies' || this.attribute == 'governingBodies' ||
        this.attribute == 'templateTypes')
        {
          this.displayedColumns = ['id', 'description'];
          this.dataSource = new MatTableDataSource<BasicEntity>(this.results);
        }
      else if(this.attribute == 'citations')
      {
        this.displayedColumns = ['id','description','citationid'];
        this.dataSource = new MatTableDataSource<Citation>(this.results);
      }
      else if(this.attribute == 'fileTypes')
      {
        this.displayedColumns = ['id','description','extension'];
        this.dataSource = new MatTableDataSource<FileType>(this.results);
      }
      else if(this.attribute == 'synonyms')
      {
        this.displayedColumns = ['id','description','topic'];
        this.dataSource = new MatTableDataSource<Synonyms>(this.results);
      }
      else if(this.attribute == 'geographies')
      {
        this.displayedColumns = ['id','description','abbr','geographyType'];
        this.dataSource = new MatTableDataSource<geography>(this.results);
      }
      else if (this.attribute == 'contentTypes')
      {
        this.displayedColumns = ['id','description','templateType'];
        this.dataSource = new MatTableDataSource<ContentType>(this.results);
      }
      else if(this.attribute == 'contentSubTypes')
      {
        this.displayedColumns = ['id','description','parent','templateType'];
        this.dataSource = new MatTableDataSource<ContentSubType>(this.results);
        this.getTemplateTypes();
        this.api.getData('contentTypes').subscribe( data => {
          this.contentTypes = data;
        });
      }
  }


      getTopicName(topicId){
        if(this.topics)
        return this.topics.find( o => o.id == topicId).description;
    }


    getGeographyType(typeId){
      if(this.geographyType)
      return this.geographyType.find( o => o.id == typeId).description;
    }

    
    getTemplateName(templateId){
      if(this.templateTypes)
      return this.templateTypes.find( o => o.id == templateId).description;
  }


  getContentTypeName(contentTypeId){
    if(this.contentTypes)
    return this.contentTypes.find( o => o.id == contentTypeId).description;
  }


}
