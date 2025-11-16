import { Component, ViewEncapsulation } from '@angular/core';


interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
}

interface ShareOption {
  name: string;
  icon: string;
  color: string;
  action: string;
}

interface Reward {
  icon: string;
  title: string;
  description: string;
  amount: number;
}

interface ReferralHistoryItem {
  name: string;
  date: Date;
  status: 'active' | 'pending' | 'inactive';
  earnings: number;
}
@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReferComponent {
  showConfetti = false;
  copied = false;
  referralCode = 'REF2024XYZ';

  stats: ReferralStats = {
    totalReferrals: 15,
    activeReferrals: 12,
    totalEarnings: 1200,
    pendingEarnings: 300
  };

  shareOptions: ShareOption[] = [
    { name: 'WhatsApp', icon: '💬', color: '#25D366', action: 'whatsapp' },
    { name: 'Facebook', icon: '📘', color: '#1877F2', action: 'facebook' },
    { name: 'Messenger', icon: '💬', color: '#0084FF', action: 'messenger' },
    { name: 'SMS', icon: '📱', color: '#34C759', action: 'sms' },
    { name: 'Email', icon: '📧', color: '#FF9500', action: 'email' },
    { name: 'Copy Link', icon: '🔗', color: '#8E8E93', action: 'copy' }
  ];

  rewards: Reward[] = [
    {
      icon: '🥉',
      title: '৫ জন রেফার',
      description: 'প্রথম মাইলস্টোন বোনাস',
      amount: 100
    },
    {
      icon: '🥈',
      title: '১০ জন রেফার',
      description: 'সিলভার মাইলস্টোন বোনাস',
      amount: 250
    },
    {
      icon: '🥇',
      title: '২৫ জন রেফার',
      description: 'গোল্ড মাইলস্টোন বোনাস',
      amount: 500
    },
    {
      icon: '💎',
      title: '৫০ জন রেফার',
      description: 'ডায়মন্ড মাইলস্টোন বোনাস',
      amount: 1000
    }
  ];

  referralHistory: ReferralHistoryItem[] = [
    { name: 'রহিম আহমেদ', date: new Date('2024-01-15'), status: 'active', earnings: 100 },
    { name: 'করিম হোসেন', date: new Date('2024-01-14'), status: 'active', earnings: 100 },
    { name: 'সালমা বেগম', date: new Date('2024-01-13'), status: 'pending', earnings: 0 },
    { name: 'নাসরিন আক্তার', date: new Date('2024-01-12'), status: 'active', earnings: 100 },
    { name: 'জামাল উদ্দিন', date: new Date('2024-01-11'), status: 'inactive', earnings: 0 }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  copyReferral(): void {
    const referralLink = `https://yourapp.com/ref/${this.referralCode}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(referralLink).then(() => {
        this.showCopiedState();
      }).catch(() => {
        this.fallbackCopy(referralLink);
      });
    } else {
      this.fallbackCopy(referralLink);
    }
  }

  private fallbackCopy(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      this.showCopiedState();
    } catch (err) {
      console.error('Failed to copy text:', err);
    }

    document.body.removeChild(textArea);
  }

  private showCopiedState(): void {
    this.copied = true;
    this.showConfetti = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);

    setTimeout(() => {
      this.showConfetti = false;
    }, 3000);
  }

  shareVia(option: ShareOption): void {
    const referralLink = `https://yourapp.com/ref/${this.referralCode}`;
    const message = `আমার রেফারেল কোড ব্যবহার করুন: ${this.referralCode} এবং ৳১০০ টাকা পান! ${referralLink}`;

    switch (option.action) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
        break;
      case 'messenger':
        window.open(`fb-messenger://share/?link=${encodeURIComponent(referralLink)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(message)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Referral Code&body=${encodeURIComponent(message)}`);
        break;
      case 'copy':
        this.copyReferral();
        break;
    }
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'আজ';
    if (diffDays === 1) return 'গতকাল';
    if (diffDays < 7) return `${diffDays} দিন আগে`;

    return date.toLocaleDateString('bn-BD');
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

  trackByIndex(index: number): number {
    return index;
  }
}
