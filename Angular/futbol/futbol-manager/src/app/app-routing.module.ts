import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LineupComponent } from './team/lineup/lineup.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'lineup', component: LineupComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
