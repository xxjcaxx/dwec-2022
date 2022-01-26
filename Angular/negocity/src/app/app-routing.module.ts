import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalComponent } from './components/global/global.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'global', component: GlobalComponent},
   
 
   {path: 'login', component: LoginComponent},
   {path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
