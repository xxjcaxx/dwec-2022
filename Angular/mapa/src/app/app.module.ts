import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EdificiComponent } from './components/edifici/edifici.component';
import { EdificiDetailComponent } from './components/edifici-detail/edifici-detail.component';
import { EdificiListComponent } from './components/edifici-list/edifici-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltreEdificisPipe } from './pipes/filtre-edificis.pipe';


@NgModule({
  declarations: [
    AppComponent,
    EdificiComponent,
    EdificiDetailComponent,
    EdificiListComponent,
    MenuComponent,
    HomeComponent,
    FiltreEdificisPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
