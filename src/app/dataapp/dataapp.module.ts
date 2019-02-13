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
import { CitationsComponent } from './components/citations/citations.component';
import { LandingPageComponent } from './components/landingpage/landingpage.component';
import { GenericComponent } from './components/generic/generic.component';
import { SynonymsComponent } from './components/synonyms/synonyms.component';
import { ContenttypeComponent } from './components/contenttype/contenttype.component';
import { HelperService } from './services/helper.service';



const routes : Routes = [
  { path : '', component : DataappComponent,
   children : [   
     { path : 'landingpage' , component : LandingPageComponent},
     { path : 'Citations' , component : CitationsComponent},
     { path : 'TemplateTypes' , component : GenericComponent},
     { path : 'Areas' , component : GenericComponent},
     { path : 'SubAreas', component : GenericComponent},
     { path : 'GoverningBodies' , component : GenericComponent},
     {path : 'Industries' , component : GenericComponent},
     {path : 'Products' , component : GenericComponent},
     {path : 'Synonyms' , component : SynonymsComponent},
     {path : 'ContentTypes' , component : ContenttypeComponent},
   ]},
   
   {path : "**", redirectTo : ''}

];

@NgModule({
  declarations: [LandingPageComponent,ToolbarComponent,SidenavComponent, DataappComponent, CitationsComponent, GenericComponent, SynonymsComponent, ContenttypeComponent],
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
