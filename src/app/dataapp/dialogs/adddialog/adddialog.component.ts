import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-adddialog',
  templateUrl: './adddialog.component.html',
  styleUrls: ['./adddialog.component.scss']
})
export class AdddialogComponent implements OnInit {

  formControl = new FormControl('',[
      Validators.required
  ]);

  templateId : number;
  topicId : number;
  contentTypeId : number;
  geographyId : number;

  constructor( private dialogDef : MatDialogRef<AdddialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data : any ,public contentService : ContentService ) {
                dialogDef.disableClose = true;
               }


  getErrorMessage(){
    return this.formControl.hasError('required') ? 'Required Field' : '';
  }


  ngOnInit() {
    console.log(this.data);
  }

  onCancel() : void {
      this.dialogDef.close();
  }

onAdd() : void {
  
  if(this.data.attribute == "contentTypes"){
  this.data.templateId = this.templateId;
  this.data.templateTypes = null;
  // below lines added because of the database design..
  this.data.parent = 0;
  this.data.level = 1;
  }
  else if(this.data.attribute == 'synonyms'){
    this.data.topicId = this.topicId;
    this.data.topics = null;
  }
  else if(this.data.attribute == 'types'){
    this.data.templateId = this.templateId;
    this.data.contentId = this.contentTypeId;
    this.data.contentTypes = null;
    this.data.templateTypes = null;
  }
  this.contentService.setData(this.data);
}

}
