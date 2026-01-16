import { Component, OnInit } from '@angular/core';
import { UserTask, TelegramUser, TaskService } from '../services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: UserTask[] = [];
  user: TelegramUser | null = null;
  loading = false;
  processingTaskId: number | null = null;
  errorMessage = '';

  // For daily task progress
  dailyTaskLimit = 15;
  dailyTasksCompleted = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadUserAndTasks();
  }

  loadUserAndTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    // Subscribe to user
    this.taskService.user$.subscribe(user => {
      this.user = user;
    });

    // Subscribe to tasks
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.calculateDailyProgress();
      this.loading = false;
    });

    // Load data
    this.taskService.getCurrentUser().subscribe({
      error: (error) => {
        this.errorMessage = 'ব্যবহারকারী ডেটা লোড করতে ব্যর্থ';
        this.loading = false;
      }
    });

    this.taskService.getTasks().subscribe({
      error: (error) => {
        this.errorMessage = 'টাস্ক লোড করতে ব্যর্থ';
        this.loading = false;
      }
    });
  }

  /**
   * Calculate daily task progress
   */
  calculateDailyProgress(): void {
    this.dailyTasksCompleted = this.tasks.filter(t => t.status === 'COMPLETED').length;
  }

  /**
   * Get tasks by type
   */
  get telegramTasks(): UserTask[] {
    return this.tasks.filter(t => t.taskType === 'TELEGRAM_CHANNEL' && t.status === 'PENDING');
  }

  get videoAdTasks(): UserTask[] {
    return this.tasks.filter(t => t.taskType === 'CUSTOM_LINK' && t.status === 'PENDING');
  }

  get completedTasks(): UserTask[] {
    return this.tasks.filter(t => t.status === 'COMPLETED');
  }

  get totalEarningsToday(): number {
    return this.completedTasks.reduce((sum, task) => sum + task.rewardAmount, 0);
  }

  /**
   * Start a task
   */
  startTask(task: UserTask): void {
    this.processingTaskId = task.id;
    this.errorMessage = '';

    this.taskService.startTask(task.id).subscribe({
      next: (updatedTask) => {
        // Open the task link
        this.taskService.openTaskLink(task);
        this.processingTaskId = null;
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'টাস্ক শুরু করতে ব্যর্থ';
        this.processingTaskId = null;
      }
    });
  }

  /**
   * Verify task completion
   */
  verifyTask(task: UserTask): void {
    this.processingTaskId = task.id;
    this.errorMessage = '';

    this.taskService.verifyTask(task.id).subscribe({
      next: (completedTask) => {
        this.processingTaskId = null;
        this.showSuccessMessage(completedTask);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'যাচাইকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে টাস্ক সম্পূর্ণ করুন।';
        this.processingTaskId = null;
      }
    });
  }

  /**
   * Show success message
   */
  private showSuccessMessage(task: UserTask): void {
    const message = `টাস্ক সম্পন্ন! আপনি ${task.rewardAmount} TAKA আয় করেছেন`;

    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      (window as any).Telegram.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  }

  /**
   * Share referral
   */
  shareReferral(): void {
    if (this.user?.referralCode) {
      this.taskService.shareReferral(this.user.referralCode);
    }
  }

  /**
   * Get task icon
   */
  getTaskIcon(taskType: string): string {
    const icons: { [key: string]: string } = {
      'TELEGRAM_CHANNEL': 'bi-telegram',
      'REFERRAL': 'bi-people-fill',
      'YOUTUBE': 'bi-youtube',
      'TWITTER': 'bi-twitter',
      'INSTAGRAM': 'bi-instagram',
      'CUSTOM_LINK': 'bi-camera-video-fill'
    };
    return icons[taskType] || 'bi-star-fill';
  }

  /**
   * Check if task is being processed
   */
  isProcessing(taskId: number): boolean {
    return this.processingTaskId === taskId;
  }

  /**
   * Track by function for ngFor
   */
  trackByTaskId(index: number, task: UserTask): number {
    return task.id;
  }

  /**
   * Get user rating
   */
  get userRating(): string {
    return this.user?.rating ? (this.user.rating / 10).toFixed(1) : '4.9';
  }

  /**
   * Get user sessions count (using completed tasks)
   */
  get userSessions(): number {
    return this.user?.completedTasks || 0;
  }

  /**
   * Get pending balance in TAKA
   */
  get pendingBalance(): string {
    if (!this.user) return '0.00';
    return (this.user.pendingBalance / 100).toFixed(2);
  }
}