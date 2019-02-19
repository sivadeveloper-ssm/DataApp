import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from '../shared/material.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DataappComponent } from './dataapp.component';
import { ContentService } from './services/content.service';
import { LandingPageComponent } from './components/landingpage/landingpage.component';
import { GenericComponent } from './components/generic/generic.component';
import { HelperService } from './services/helper.service';
import { AdddialogComponent } from './dialogs/adddialog/adddialog.component';
import { EditdialogComponent } from './dialogs/editdialog/editdialog.component';



const routes : Routes = [
  { path : '', component : DataappComponent,
   children : [ 
     { path : 'areas' , component : GenericComponent},
     { path : 'subAreas', component : GenericComponent},
     { path : 'governingBodies' , component : GenericComponent},
     {path : 'industries' , component : GenericComponent},
     {path : 'products' , component : GenericComponent},
     { path : 'templateTypes' , component : GenericComponent},
     { path : 'citations' , component : GenericComponent},
     {path : 'synonyms' , component : GenericComponent},
     {path : 'contentTypes' , component : GenericComponent},
     {path : 'contentSubTypes' , component : GenericComponent},
     { path : 'geographies', component : GenericComponent},
     {path : 'fileTypes', component : GenericComponent}
   ]},
   
   {path : "**", redirectTo : ''}

];

@NgModule({
  declarations: [LandingPageComponent,
                  ToolbarComponent,
                  SidenavComponent, 
                  DataappComponent,
                  GenericComponent,
                  AdddialogComponent,
                  EditdialogComponent 
                ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  entryComponents : [
    AdddialogComponent,
    EditdialogComponent
  ],
  providers :[
    ContentService,
    HelperService
  ]
})
export class DataappModule { }
