import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SupportComponent } from './support/support.component';
import { TaskComponent } from './task/task.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ReferComponent } from './refer/refer.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SupportComponent,
    TaskComponent,
    WithdrawComponent,
    ReferComponent,
    ProfileComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
