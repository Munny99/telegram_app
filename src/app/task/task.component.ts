import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
   tasks = [
    { id: 1, completed: 0, total: 15, reward: 50 },
    { id: 2, completed: 0, total: 3, reward: 200 }
  ];


 activeTab: string = 'home';
  telegramChannels = Array(15).fill(0);

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

    get totalCompleted(): number {
    return this.tasks.reduce((acc, t) => acc + t.completed, 0);
  }

  get totalEarnings(): string {
    const sum = this.tasks.reduce((acc, t) => acc + (t.completed * t.reward / t.total), 0);
    return sum.toFixed(2);
  }
}
