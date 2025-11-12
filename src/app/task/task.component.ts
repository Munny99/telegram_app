import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

 activeTab: string = 'home';
  telegramChannels = Array(15).fill(0);

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
