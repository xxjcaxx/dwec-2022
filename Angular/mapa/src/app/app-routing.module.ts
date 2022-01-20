import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EdificiDetailComponent } from './components/edifici-detail/edifici-detail.component';
import { EdificiListComponent } from './components/edifici-list/edifici-list.component';

const routes: Routes = [
  {path: 'home', component: EdificiListComponent},
  {path: 'edifici/:id', component: EdificiDetailComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
