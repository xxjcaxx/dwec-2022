import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MarketComponent } from './player/market/market.component';
import { LineupComponent } from './team/lineup/lineup.component';
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'lineup', component: LineupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'market', component: MarketComponent},
  {path: 'user/:id', component: UserProfileComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
