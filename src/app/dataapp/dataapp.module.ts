import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from '../shared/material.module';

import { GenericComponent } from './components/generic/generic.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DataappComponent } from './dataapp.component';
import { ContentService } from './services/content.service';
import { CitationsComponent } from './components/citations/citations.component';



const routes : Routes = [
  { path : '', component : DataappComponent,
   children : [   
     { path : 'generic' , component : GenericComponent},
     { path : 'Citations' , component : CitationsComponent}
   ]},
   
   {path : "**", redirectTo : ''}

];

@NgModule({
  declarations: [GenericComponent,ToolbarComponent,SidenavComponent, DataappComponent, CitationsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers :[
    ContentService
  ]
})
export class DataappModule { }
