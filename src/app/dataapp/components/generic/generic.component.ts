import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { BasicEntity } from '../../models/basicEntity';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Citation } from '../../models/citations';
import { FileType } from '../../models/fileTypes';
import { Synonyms } from '../../models/synonyms';
import { geography } from '../../models/geography';
import { ContentType } from '../../models/contenttype';
import { ContentSubType } from '../../models/contentSubType';
import { AdddialogComponent } from '../../dialogs/adddialog/adddialog.component';
import { EditdialogComponent } from '../../dialogs/editdialog/editdialog.component';


@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  private attribute;

  @Input() results :  [];
  @Input() topics : BasicEntity[];
  @Input() geographyTypes : BasicEntity[];
  @Input() templateTypes : BasicEntity[];
  @Input() contentTypes : BasicEntity[];
  displayedColumns : string[];
  private dataSource : MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator : MatPaginator; 
  @ViewChild(MatSort) sort : MatSort;
  constructor( private api : ContentService,private route : ActivatedRoute,
          public dialog : MatDialog,private changeDetectorRefs : ChangeDetectorRef) { }

  ngOnInit() {

    this.attribute = this.route.snapshot.url[0].path;
  
    this.additionalRestCallsIfNeeded();
    this.callAPIandSetMatTable();
    
  }

  // Make the rest call to get the table data and present in Material Design Table.
  callAPIandSetMatTable() : void {
    
    
    this.api.getData(this.attribute).subscribe( data => {
      this.results = data;
    
      this.defineattributeSpecificValues();
      setTimeout(() => this.dataSource.paginator = this.paginator);
      setTimeout(() => this.dataSource.sort = this.sort);
      this.refreshTable();
    });
  }

  firstLetterUpperCase(stringValue){
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  }

  // Open the Adding New Dialog Component
  openDialog(): void {
    
   
    const dailogRef = this.dialog.open(AdddialogComponent,{
      data : { title : this.firstLetterUpperCase(this.attribute),
               attribute : this.attribute ,
              templateTypes : this.templateTypes,
              topics : this.topics,
              isActive : true,
              contentTypes : this.contentTypes,
              geographyTypes : this.geographyTypes} 
    });

      dailogRef.afterClosed().subscribe( result => {
        if(typeof result !== 'undefined'){
        this.callAPIandSetMatTable();
      }
      });

  }


  // Open the Editing Dialong Component 
  openEditDialog(row : any) : void {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      data : { title : this.firstLetterUpperCase(this.attribute),
               attribute : this.attribute,
               id : row.id,
              description : row.description,
              isActive : row.isActive,
              citationId : row.citationId,
              templateId : row.templateId,
              templateTypes : this.templateTypes,
              contentId : row.contentId,
              contentTypes : this.contentTypes,
              extension : row.extension,
              topicId : row.topicId,
              topics : this.topics,
              type : row.type,
              geographyTypes : this.geographyTypes
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if(typeof result !== 'undefined'){
        this.callAPIandSetMatTable();
      }
    });
  }
  
  private refreshTable() {
    // Refreshing the table
     this.changeDetectorRefs.detectChanges();
  }

  //Apply filter to filter the table result.{applied only on description field}
  applyFilter(filterValue : string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  //Get additional mapping data for different fields based on attibute type
  additionalRestCallsIfNeeded(){
     if(this.attribute == 'synonyms')
     {
      this.api.getData('topics').subscribe( data => {
      this.topics = data;
       });
    }
    else if(this.attribute == 'contentTypes')
      this.getTemplateTypes();
    else if(this.attribute == 'types')
    {
      this.getTemplateTypes();
      this.api.getData('contentTypes').subscribe( data => {
        this.contentTypes = data;
      });
    }
  }

// Load the template type from REST Call 
  getTemplateTypes(){
    this.api.getData('templateTypes').subscribe( data => {
      this.templateTypes = data;
    });
  }


  defineattributeSpecificValues() {
    
     if(this.attribute == 'areas' || this.attribute =='topics' || this.attribute == 'industries' ||
        this.attribute == 'products' || this.attribute == 'governingBodies' || this.attribute == 'governingBodies' ||
        this.attribute == 'templateTypes' || this.attribute == 'geographies')
        {
          this.displayedColumns = ['id', 'description','isActive','modifybutton'];
          this.dataSource = new MatTableDataSource<BasicEntity>(this.results);
        }
      else if(this.attribute == 'citations')
      {
        this.displayedColumns = ['id','citationid','effectivedate','title','alttitle','isActive','modifybutton'];
        this.dataSource = new MatTableDataSource<Citation>(this.results);
      }
      else if(this.attribute == 'fileTypes')
      {
        this.displayedColumns = ['id','description','extension','modifybutton'];
        this.dataSource = new MatTableDataSource<FileType>(this.results);
      }
      else if(this.attribute == 'synonyms')
      {
        this.displayedColumns = ['id','description','topic','isActive','modifybutton'];
        this.dataSource = new MatTableDataSource<Synonyms>(this.results);
      }
      else if (this.attribute == 'contentTypes')
      {
        this.displayedColumns = ['id','description','templateType','isActive','modifybutton'];
        this.dataSource = new MatTableDataSource<ContentType>(this.results);
      }
      else if(this.attribute == 'types')
      {
        this.displayedColumns = ['id','description','contentType','templateType','isActive','modifybutton'];
        this.dataSource = new MatTableDataSource<ContentSubType>(this.results);
      }
  }


// get description of a selected topic with ID
      getTopicName(topicId){
        if(this.topics)
        return this.topics.find( o => o.id == topicId).description;
    }

// get description of a selected geography with Type ID
    getGeographyType(typeId){
      if(this.geographyTypes)
      return this.geographyTypes.find( o => o.id == typeId).description;
    }

  // Get template description with template id.
    getTemplateName(templateId){
      if(this.templateTypes)
      return this.templateTypes.find( o => o.id == templateId).description;
  }

// Get Content Type name with the content Type Id
  getContentTypeName(contentTypeId){
    if(this.contentTypes)
    return this.contentTypes.find( o => o.id == contentTypeId).description;
  }


}
