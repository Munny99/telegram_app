
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

interface Withdrawal {
  id: string;
  method: 'bKash' | 'Nagad' | 'Rocket';
  accountNumber: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'rejected' | 'processing';
  transactionId: string;
  note?: string;
}

interface FilterTab {
  label: string;
  value: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  // Summary data
  totalWithdrawn: string = '15,250.00';
  pendingCount: number = 2;
  completedCount: number = 15;
  rejectedCount: number = 1;

  // Filter tabs
  filterTabs: FilterTab[] = [
    { label: 'সব', value: 'all' },
    { label: 'অপেক্ষমাণ', value: 'pending' },
    { label: 'সম্পন্ন', value: 'completed' },
    { label: 'প্রক্রিয়াধীন', value: 'processing' },
    { label: 'প্রত্যাখ্যাত', value: 'rejected' }
  ];

  activeFilter: string = 'all';

  // Withdrawal data
  allWithdrawals: Withdrawal[] = [
    {
      id: '1',
      method: 'bKash',
      accountNumber: '01712345678',
      amount: 1000,
      date: new Date('2024-11-15T10:30:00'),
      status: 'completed',
      transactionId: 'WD001234567890',
      note: 'সফলভাবে সম্পন্ন হয়েছে'
    },
    {
      id: '2',
      method: 'Nagad',
      accountNumber: '01812345678',
      amount: 500,
      date: new Date('2024-11-14T15:20:00'),
      status: 'pending',
      transactionId: 'WD001234567891'
    },
    {
      id: '3',
      method: 'Rocket',
      accountNumber: '01912345678',
      amount: 750,
      date: new Date('2024-11-13T09:15:00'),
      status: 'completed',
      transactionId: 'WD001234567892'
    },
    {
      id: '4',
      method: 'bKash',
      accountNumber: '01712345678',
      amount: 1500,
      date: new Date('2024-11-12T14:45:00'),
      status: 'processing',
      transactionId: 'WD001234567893'
    },
    {
      id: '5',
      method: 'Nagad',
      accountNumber: '01812345678',
      amount: 300,
      date: new Date('2024-11-11T11:30:00'),
      status: 'rejected',
      transactionId: 'WD001234567894',
      note: 'অ্যাকাউন্ট নম্বর যাচাই করা যায়নি'
    },
    {
      id: '6',
      method: 'bKash',
      accountNumber: '01712345678',
      amount: 2000,
      date: new Date('2024-11-10T16:00:00'),
      status: 'completed',
      transactionId: 'WD001234567895'
    },
    {
      id: '7',
      method: 'Rocket',
      accountNumber: '01912345678',
      amount: 850,
      date: new Date('2024-11-09T13:20:00'),
      status: 'completed',
      transactionId: 'WD001234567896'
    },
    {
      id: '8',
      method: 'bKash',
      accountNumber: '01712345678',
      amount: 1200,
      date: new Date('2024-11-08T10:10:00'),
      status: 'pending',
      transactionId: 'WD001234567897'
    }
  ];

  filteredWithdrawals: Withdrawal[] = [];
  hasMore: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterWithdrawals();
  }

  // Go back to previous page
  goBack(): void {
    this.router.navigate(['/withdraw']);
  }

  // Set active filter
  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filterWithdrawals();
  }

  // Filter withdrawals based on active filter
  filterWithdrawals(): void {
    if (this.activeFilter === 'all') {
      this.filteredWithdrawals = [...this.allWithdrawals];
    } else {
      this.filteredWithdrawals = this.allWithdrawals.filter(
        w => w.status === this.activeFilter
      );
    }

    // Simulate pagination - show "load more" if more than 5 items
    this.hasMore = this.filteredWithdrawals.length > 5;
  }

  // Get status text in Bengali
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      pending: 'অপেক্ষমাণ',
      completed: 'সম্পন্ন',
      rejected: 'প্রত্যাখ্যাত',
      processing: 'প্রক্রিয়াধীন'
    };
    return statusMap[status] || status;
  }

  // Get method class for styling
  getMethodClass(method: string): string {
    return method.toLowerCase();
  }

  // Format date to Bengali
  formatDate(date: Date): string {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const bengaliMonths = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];

    return `${day} ${bengaliMonths[month - 1]}, ${year}`;
  }

  // Format time
  formatTime(date: Date): string {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  // View withdrawal details
  viewDetails(withdrawal: Withdrawal): void {
    console.log('Viewing details for:', withdrawal);
    // Navigate to details page or open modal
    // this.router.navigate(['/withdrawal-details', withdrawal.id]);
  }

  // Download receipt
  downloadReceipt(withdrawal: Withdrawal): void {
    console.log('Downloading receipt for:', withdrawal);
    // Implement receipt download logic
    alert(`রসিদ ডাউনলোড হচ্ছে: ${withdrawal.transactionId}`);
  }

  // Load more withdrawals
  loadMore(): void {
    console.log('Loading more withdrawals...');
    // Implement pagination logic
    this.hasMore = false;
  }

  // TrackBy function for ngFor optimization
  trackByIndex(index: number, item: any): number {
    return index;
  }
}