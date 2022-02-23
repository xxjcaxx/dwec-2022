import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LineupComponent } from './team/lineup/lineup.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerItemComponent } from './player/player-item/player-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { MarketComponent } from './player/market/market.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LineupComponent,
    HomeComponent,
    PlayerItemComponent,
    LoginComponent,
    UserProfileComponent,
    MarketComponent,
    SanitizerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
