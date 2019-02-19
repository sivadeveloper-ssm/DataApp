import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Routes,RouterModule} from '@angular/router';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const routes : Routes = [
  { path : 'dataapp' , loadChildren : './dataapp/dataapp.module#DataappModule'},
  { path : "**" , redirectTo : 'dataapp'}
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
