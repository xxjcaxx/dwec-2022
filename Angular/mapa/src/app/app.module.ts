import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EdificiComponent } from './components/edifici/edifici.component';
import { EdificiDetailComponent } from './components/edifici-detail/edifici-detail.component';
import { EdificiListComponent } from './components/edifici-list/edifici-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EdificiComponent,
    EdificiDetailComponent,
    EdificiListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
