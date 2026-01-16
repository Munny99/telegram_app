import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { TaskComponent } from './task/task.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ReferComponent } from './refer/refer.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';

// const routes: Routes = [
//    { path: '', redirectTo: '/home', pathMatch: 'full' },
//    {path:'home',component:HomeComponent},
//    {path:'support',component:SupportComponent},
//    {path:'task',component:TaskComponent},
//    {path:'withdraw',component:WithdrawComponent},
//   { path: 'refer', component: ReferComponent },
//   { path: 'profile', component: ProfileComponent },
//   { path: 'history', component: HistoryComponent },
// ];
const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'home', component: TaskComponent }, // Temporary: using TaskComponent
  { path: 'task', component: TaskComponent },
  // { path: 'referral', component: ReferralComponent },
  // { path: 'wallet', component: WalletComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/task' } // Fallback route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
