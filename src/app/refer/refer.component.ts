import { Component } from '@angular/core';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.scss'
})
export class ReferComponent {
 referralCode: string = 'FM12345';
  copied: boolean = false;

  copyReferral() {
    navigator.clipboard.writeText(this.referralCode);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000); // reset message after 2s
  }
}
