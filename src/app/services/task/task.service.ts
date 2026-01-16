import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserTask {
  id: number;
  taskType: 'TELEGRAM_CHANNEL' | 'REFERRAL' | 'YOUTUBE' | 'TWITTER' | 'INSTAGRAM' | 'CUSTOM_LINK';
  taskTitle: string;
  taskDescription: string;
  taskLink: string;
  rewardAmount: number;
  status: 'PENDING' | 'COMPLETED';
  requiresVerification: boolean;
}

export interface TelegramUser {
  id: number;
  telegramId: string;
  firstName: string;
  lastName?: string;
  userName?: string;
  referralCode: string;
  totalEarnings: number;
  totalWithdrawn: number;
  pendingBalance: number;
  totalReferrals: number;
  completedTasks: number;
  totalTasks: number;
  rating: number;
  isActive: boolean;
  isPremium: boolean;
  languageCode?: string;
  photoUrl?: string;
}

export interface TaskStatistics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://67832a84aa43.ngrok-free.app/api/telegram';
  private tasksSubject = new BehaviorSubject<UserTask[]>([]);
  private userSubject = new BehaviorSubject<TelegramUser | null>(null);

  public tasks$ = this.tasksSubject.asObservable();
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get headers with Telegram init data
   */
  private getHeaders(): HttpHeaders {
    const initData = this.getTelegramInitData();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': initData
    });
  }

  /**
   * Get Telegram WebApp init data
   */
  private getTelegramInitData(): string {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      return (window as any).Telegram.WebApp.initData;
    }
    return '';
  }

  /**
   * Authenticate user with Telegram
   */
  authenticate(): Observable<TelegramUser> {
    const initData = this.getTelegramInitData();
    return this.http.post<TelegramUser>(`${this.apiUrl}/auth`, { initData }).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  /**
   * Get current user info
   */
  getCurrentUser(): Observable<TelegramUser> {
    return this.http.get<TelegramUser>(`${this.apiUrl}/me`, {
      headers: this.getHeaders()
    }).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  /**
   * Get all tasks for user
   */
  getTasks(): Observable<UserTask[]> {
    return this.http.get<UserTask[]>(`${this.apiUrl}/tasks`, {
      headers: this.getHeaders()
    }).pipe(
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

  /**
   * Start a task
   */
  startTask(taskId: number): Observable<UserTask> {
    return this.http.post<UserTask>(
      `${this.apiUrl}/tasks/${taskId}/start`,
      {},
      { headers: this.getHeaders() }
    ).pipe(
      tap(() => this.refreshTasks())
    );
  }

  /**
   * Verify and complete a task
   */
  verifyTask(taskId: number): Observable<UserTask> {
    return this.http.post<UserTask>(
      `${this.apiUrl}/tasks/${taskId}/verify`,
      {},
      { headers: this.getHeaders() }
    ).pipe(
      tap(() => {
        this.refreshTasks();
        this.getCurrentUser().subscribe();
      })
    );
  }

  /**
   * Refresh tasks list
   */
  private refreshTasks(): void {
    this.getTasks().subscribe();
  }

  /**
   * Get task statistics
   */
  getTaskStatistics(): Observable<TaskStatistics> {
    return this.http.get<TaskStatistics>(`${this.apiUrl}/tasks/statistics`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Open task link in Telegram
   */
  openTaskLink(task: UserTask): void {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      (window as any).Telegram.WebApp.openLink(task.taskLink);
    } else {
      window.open(task.taskLink, '_blank');
    }
  }

  /**
   * Share referral link
   */
  shareReferral(referralCode: string): void {
    const botUsername = 'YOUR_BOT_USERNAME'; // Replace with your bot username
    const shareUrl = `https://t.me/${botUsername}?start=${referralCode}`;
    const shareText = `Join me and earn rewards! Use my referral code: ${referralCode}`;

    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      (window as any).Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
      );
    } else {
      // Fallback for web
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Referral link copied to clipboard!');
    }
  }
}