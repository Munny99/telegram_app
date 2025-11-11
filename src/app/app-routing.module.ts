import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { TaskComponent } from './task/task.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   {path:'home',component:HomeComponent},
   {path:'support',component:SupportComponent},
   {path:'task',component:TaskComponent},
   {path:'withdraw',component:WithdrawComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
