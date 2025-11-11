import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  username = 'Fatema Akter';
  balance = 50.00;
  dailyAds = 0;
  dailyAdsLimit = 10;
  totalReferrals = 0;
  referralLink = 'https://t.me/cashrainvbot/app?startapp=7371907363';

  get adsProgress(): string {
    return (this.dailyAds / this.dailyAdsLimit * 100) + '%';
  }

  copyLink() {
    navigator.clipboard.writeText(this.referralLink)
      .then(() => alert('✅ লিঙ্ক কপি সম্পন্ন হয়েছে!'))
      .catch(() => alert('❌ কপি করতে ব্যর্থ হয়েছে'));
  }

  async shareLink() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cash Rain রেফারাল',
          text: 'আমার রেফারাল লিংক ব্যবহার করে সাইন আপ করুন এবং বোনাস পান!',
          url: this.referralLink
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      this.copyLink();
    }
  }
  

  setActiveNav(event: Event, index: number) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    (event.currentTarget as HTMLElement).classList.add('active');
  }

}
