import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
    activeTab: string = 'সাপোর্ট';

  setActive(tab: string) {
    this.activeTab = tab;
  }
   setActiveNav(event: Event, index: number) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    (event.currentTarget as HTMLElement).classList.add('active');
  }
}
