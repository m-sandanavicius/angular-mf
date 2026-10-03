import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommerceStore } from '../core/commerce.store';
import { ShellComponent } from '../shared/shell.component';
@Component({
  selector: 'checkout-remote',
  imports: [ShellComponent, CurrencyPipe, RouterLink],
  template: `<shop-shell label="CHECKOUT REMOTE">
    @if (complete()) {
      <section class="confirmation">
        <p class="eyebrow">ORDER CONFIRMED</p>
        <h1>Thank you.<br /><em>It’s on its way.</em></h1>
        <p>
          We’ve sent the details to your inbox. Your objects will leave our studio in 2–4 working
          days.
        </p>
        <a routerLink="/" class="button">Back to shop →</a>
      </section>
    } @else {
      <section class="checkout">
        <div>
          <p class="eyebrow">SECURE CHECKOUT / 01</p>
          <h1>Delivery details</h1>
          <div class="form-grid">
            <label>Email address<input placeholder="you@example.com" /></label
            ><label>Phone number<input placeholder="+370" /></label
            ><label class="full">Address<input placeholder="Street and number" /></label
            ><label>City<input placeholder="Vilnius" /></label
            ><label>Postal code<input placeholder="LT-00000" /></label>
          </div>
          <h2>Payment</h2>
          <div class="payment"><span>●</span> Card ending in 4242 <small>Change</small></div>
          <button class="button" (click)="placeOrder()">Place order <b>→</b></button>
        </div>
        <aside class="order-preview">
          <p>ORDER SUMMARY</p>
          @for (line of store.cart(); track line.product.id) {
            <div class="preview-line">
              <div class="tiny-art" [style.background]="line.product.color">
                {{ line.product.image }}
              </div>
              <span>{{ line.product.name }} × {{ line.quantity }}</span
              ><strong>{{
                line.product.price * line.quantity | currency: 'EUR' : 'symbol' : '1.0-0'
              }}</strong>
            </div>
          }
          <hr />
          <div class="total">
            <span>Total</span
            ><strong>{{ store.subtotal() | currency: 'EUR' : 'symbol' : '1.0-0' }}</strong>
          </div>
        </aside>
      </section>
    }
  </shop-shell>`,
})
export class CheckoutComponent {
  complete = signal(false);
  constructor(public store: CommerceStore) {}
  placeOrder() {
    this.complete.set(true);
    this.store.clear();
  }
}
