import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdddialogComponent } from '../adddialog/adddialog.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})
export class EditdialogComponent implements OnInit {


  
  formControl = new FormControl('',[
    Validators.required
]);

constructor( private dialogDef : MatDialogRef<AdddialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data : any,
            public contentService : ContentService) { 
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

  /** The below hard coded values are because of the way database is designed..  */
  if(this.data.attribute == "contentTypes" ){
    if(this.data.id == 0){
      this.data.parent = "Content Types";
      this.data.level = 0;
    }
    else{
    this.data.parent = 0;
    this.data.level = 1;
    }
  }
  console.log(this.data);
 this.contentService.updateData(this.data);
}
}
