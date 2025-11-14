import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeNav: string = 'home';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const route = event.url.split('/')[1] || 'home';
        this.activeNav = route;
      });
  }

  navigateTo(route: string): void {
    this.activeNav = route;
    this.router.navigate([`/${route}`]);
  }
}