import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface UserData {
  username: string;
  userId: string;
  balance: number;
  dailyAds: number;
  dailyAdsLimit: number;
  totalReferrals: number;
  completedTasks: number;
  totalPoints: number;
  referralLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  userData: UserData = {
    username: 'Fatema Akter',
    userId: '7371907363',
    balance: 50.00,
    dailyAds: 0,
    dailyAdsLimit: 10,
    totalReferrals: 0,
    completedTasks: 15,
    totalPoints: 850,
    referralLink: 'https://t.me/cashrainvbot/app?startapp=7371907363'
  };

  constructor() { }

  ngOnInit(): void { }

  get adsProgressPercentage(): number {
    return (this.userData.dailyAds / this.userData.dailyAdsLimit) * 100;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.userData.referralLink)
      .then(() => {
        alert('✅ লিঙ্ক কপি সম্পন্ন হয়েছে!');
      })
      .catch(() => {
        alert('❌ কপি করতে ব্যর্থ হয়েছে');
      });
  }

  async shareLink(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cash Rain রেফারাল',
          text: 'আমার রেফারাল লিংক ব্যবহার করে সাইন আপ করুন এবং বোনাস পান!',
          url: this.userData.referralLink
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      this.copyLink();
    }
  }

  onWithdraw(): void {
    console.log('Withdraw clicked');
  }

  onHistory(): void {
    console.log('History clicked');
  }

  onNotification(): void {
    console.log('Notification clicked');
  }
}
