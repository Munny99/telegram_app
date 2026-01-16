import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TelegramUser, TaskService } from './services/task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeNav: string = 'home';
  isTelegram = false;
  loading = true;
  authenticated = false;
  error = '';
  user: TelegramUser | null = null;

  constructor(
    private router: Router,
    private taskService: TaskService
  ) {
    // Track route changes for navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const route = event.url.split('/')[1] || 'home';
        this.activeNav = route;
      });
  }

  ngOnInit(): void {
    // Check if running in Telegram
    this.isTelegram = !!(window as any).Telegram?.WebApp;

    // Authenticate user
    this.authenticate();
  }

  /**
   * Navigate to a route
   */
  navigateTo(route: string): void {
    this.activeNav = route;
    this.router.navigate([`/${route}`]);
  }

  /**
   * Authenticate with Telegram
   */
  authenticate(): void {
    this.loading = true;
    this.error = '';

    // Check if running in Telegram WebApp
    if (!this.isTelegramWebApp()) {
      // For development/testing, you can comment out this check
      this.error = 'এই অ্যাপটি টেলিগ্রাম থেকে খুলতে হবে';
      this.loading = false;
      return;
    }

    // Authenticate with backend
    this.taskService.authenticate().subscribe({
      next: (user) => {
        this.user = user;
        this.authenticated = true;
        this.loading = false;
        console.log('User authenticated:', user);
      },
      error: (error) => {
        console.error('Authentication error:', error);
        this.error = error.error?.error || 'প্রমাণীকরণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';
        this.loading = false;
      }
    });
  }

  /**
   * Retry authentication
   */
  retryAuth(): void {
    this.authenticate();
  }

  /**
   * Check if running in Telegram WebApp environment
   */
  private isTelegramWebApp(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!(window as any).Telegram?.WebApp?.initData;
  }
}