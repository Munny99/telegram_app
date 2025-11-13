import { Component } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent {
handleWithdraw() {
throw new Error('Method not implemented.');
}

 activeTab: string = 'wallet';

  user = {
    name: 'Fatema Akter',
    verified: true,
    balance: 50.00,
    referrals: 0
  };

  dhakaDeal = {
    title: 'ঢাকা উত্তোলন',
    minAmount: 1200.00,
    totalReferrals: 18,
    status: 'পণ্যটি বিদ্যমান করুন'
  };

  paymentMethods = [
    'একটি পদ্ধতি নির্বাচন করুন',
    'বিকাশ',
    'নগদ',
    'রকেট',
    'উপায়'
  ];
withdrawForm: any;



  // handleWithdraw(): void {
  //   if (this.withdrawForm.valid) {
  //     const { method, accountNumber, amount } = this.withdrawForm.value;
  //     alert(`✅ উত্তোলন সফল হয়েছে!\n\nপদ্ধতি: ${method}\nএকাউন্ট: ${accountNumber}\nপরিমাণ: ${amount} TAKA`);
  //     this.withdrawForm.reset();
  //   } else {
  //     Object.values(this.withdrawForm.controls).forEach(control => {
  //       control.markAsTouched(); // error দেখাবে
  //     });
  //   }
  // }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}
