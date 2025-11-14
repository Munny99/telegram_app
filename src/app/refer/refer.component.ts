import { Component } from '@angular/core';


interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
}

interface ReferralHistory {
  name: string;
  date: Date;
  status: 'active' | 'pending' | 'inactive';
  earnings: number;
}

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.scss'
})
export class ReferComponent {
 referralCode: string = 'REF2024XYZ';
  copied: boolean = false;
  showConfetti: boolean = false;

  stats: ReferralStats = {
    totalReferrals: 15,
    activeReferrals: 12,
    totalEarnings: 1250.50,
    pendingEarnings: 350.00
  };

  referralHistory: ReferralHistory[] = [
    { name: 'রহিম আহমেদ', date: new Date('2024-11-10'), status: 'active', earnings: 100 },
    { name: 'করিম হোসেন', date: new Date('2024-11-08'), status: 'active', earnings: 100 },
    { name: 'সালমা খাতুন', date: new Date('2024-11-05'), status: 'pending', earnings: 50 },
    { name: 'নাজমুল ইসলাম', date: new Date('2024-11-01'), status: 'active', earnings: 100 }
  ];

  rewards = [
    { icon: '🎁', title: 'প্রথম রেফারেল', amount: 100, description: 'প্রথম বন্ধু join করলে' },
    { icon: '🏆', title: '৫টি রেফারেল', amount: 500, description: '৫ জন active user' },
    { icon: '💎', title: '১০টি রেফারেল', amount: 1500, description: '১০ জন active user' },
    { icon: '👑', title: 'টপ রেফারার', amount: 5000, description: 'মাসিক সেরা রেফারার' }
  ];

  shareOptions = [
    {
      name: 'Telegram',
      icon: '📱',
      color: '#0088cc',
      url: () => `https://t.me/share/url?url=${encodeURIComponent('https://yourapp.com')}&text=${encodeURIComponent(`আমার রেফারেল কোড ব্যবহার করুন: ${this.referralCode}`)}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      url: () => `https://wa.me/?text=${encodeURIComponent(`আমার রেফারেল কোড: ${this.referralCode} - https://yourapp.com`)}`
    },
    {
      name: 'Facebook',
      icon: '👥',
      color: '#1877f2',
      url: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://yourapp.com')}`
    },
    {
      name: 'Email',
      icon: '📧',
      color: '#EA4335',
      url: () => `mailto:?subject=${encodeURIComponent('Join App')}&body=${encodeURIComponent(`আমার রেফারেল কোড ব্যবহার করুন: ${this.referralCode}\nhttps://yourapp.com`)}`
    }
  ];

  ngOnInit(): void {
    this.animateCounters();
  }

  copyReferral(): void {
    navigator.clipboard.writeText(this.referralCode).then(() => {
      this.copied = true;
      this.showConfetti = true;

      setTimeout(() => {
        this.copied = false;
      }, 2000);

      setTimeout(() => {
        this.showConfetti = false;
      }, 3000);
    });
  }

  shareVia(option: any): void {
    window.open(option.url(), '_blank');
  }

  animateCounters(): void {
    // Counter animation can be implemented with a library or custom logic
    // This is a placeholder for the animation trigger
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'সক্রিয়',
      'pending': 'অপেক্ষমাণ',
      'inactive': 'নিষ্ক্রিয়'
    };
    return statusMap[status] || status;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('bn-BD', options);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
