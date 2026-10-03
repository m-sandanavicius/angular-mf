import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  standalone: true,
  imports: [CurrencyPipe],
  template: ``,
})
export class CheckoutComponent {
  done = signal(false);
}
