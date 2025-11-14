import { Component } from '@angular/core';

interface Transaction {
  id: number;
  type: string;
  amount: string;
  date: string;
  status: string;
}

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent {
  selectedMethod: string = '';
  accountNumber: string = '';
  amount: string = '1200.00';
  balance: string = '50.00';

  withdrawalMethods: string[] = [
    'একটি পদ্ধতি নির্বাচন করুন',
    'বিকাশ',
    'নগদ',
    'রকেট',
    'উপায়',
  ];

  recentTransactions: Transaction[] = [
    {
      id: 1,
      type: 'Withdrawal',
      amount: '500 TAKA',
      date: 'Nov 10, 2025',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Withdrawal',
      amount: '300 TAKA',
      date: 'Nov 08, 2025',
      status: 'Pending'
    },
  ];

  stats: Stat[] = [
    {
      label: 'Total Withdrawn',
      value: '5,800 ৳',
      icon: 'trending-up',
      color: 'green'
    },
    {
      label: 'Pending',
      value: '300 ৳',
      icon: 'clock',
      color: 'yellow'
    },
    {
      label: 'Referrals',
      value: '18 জন',
      icon: 'user',
      color: 'blue'
    },
  ];

  handleSubmit(): void {
    if (!this.selectedMethod || this.selectedMethod === 'একটি পদ্ধতি নির্বাচন করুন') {
      alert('অনুগ্রহ করে একটি পদ্ধতি নির্বাচন করুন');
      return;
    }

    if (!this.accountNumber) {
      alert('অনুগ্রহ করে একাউন্ট নম্বর দিন');
      return;
    }

    alert('রিকোয়েস্ট জমা দিন - Withdrawal request submitted!');
  }

  getStatusClass(status: string): string {
    return status === 'Completed' ? 'status-completed' : 'status-pending';
  }

  getStatColorClass(color: string): string {
    return `stat-${color}`;
  }
}

