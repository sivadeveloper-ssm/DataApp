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



const routes : Routes = [
  { path : '', component : DataappComponent,
   children : [   
     { path : 'landingpage' , component : LandingPageComponent},
     { path : 'Areas' , component : GenericComponent},
     { path : 'SubAreas', component : GenericComponent},
     { path : 'GoverningBodies' , component : GenericComponent},
     {path : 'Industries' , component : GenericComponent},
     {path : 'Products' , component : GenericComponent},
     { path : 'TemplateTypes' , component : GenericComponent},
     { path : 'Citations' , component : GenericComponent},
     {path : 'Synonyms' , component : GenericComponent},
     {path : 'ContentTypes' , component : GenericComponent},
     {path : 'ContentSubTypes' , component : GenericComponent},
     { path : 'Geographies', component : GenericComponent},
     {path : 'FileTypes', component : GenericComponent}
   ]},
   
   {path : "**", redirectTo : ''}

];

@NgModule({
  declarations: [LandingPageComponent,
                  ToolbarComponent,
                  SidenavComponent, 
                  DataappComponent,
                  GenericComponent 
                ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers :[
    ContentService,
    HelperService
  ]
})
export class DataappModule { }
