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
            public contentService : ContentService) { }



getErrorMessage(){
  return this.formControl.hasError('required') ? 'Required Field' : '';
}


ngOnInit() {}

onCancel() : void {
    this.dialogDef.close();
}

onAdd() : void {
 this.contentService.updateData(this.data);
}
}
