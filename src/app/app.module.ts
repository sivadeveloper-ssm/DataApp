import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Routes,RouterModule} from '@angular/router';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GenericComponent } from './dataapp/components/generic/generic.component';
import { SidenavComponent } from './dataapp/components/sidenav/sidenav.component';
import { ToolbarComponent } from './dataapp/components/toolbar/toolbar.component';

const routes : Routes = [
  { path : 'dataapp' , loadChildren : '../component/generic.module#GenericComponent'}
]


@NgModule({
  declarations: [
    AppComponent,
    GenericComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
