import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  standalone: true,
  imports: [CurrencyPipe],
  template: `<header class="nav">
      <a class="brand" href="/">NOVA<span>®</span></a>
      <nav><a href="/">Shop</a><a href="/admin">Admin</a></nav>
      <a class="bag" href="/cart"
        >Bag <span>{{ count() }}</span></a
      >
    </header>
    <main class="page">
      <section class="simple-head">
        <p class="eyebrow">YOUR SELECTION / CART REMOTE</p>
        <h1>
          Your bag <sup>{{ count() }}</sup>
        </h1>
      </section>
      <section class="cart-layout">
        <div class="lines">
          @for (line of items(); track line.name) {
            <article class="cart-line">
              <div class="mini-art" [style.background]="line.color">{{ line.mark }}</div>
              <div>
                <h3>{{ line.name }}</h3>
                <p>{{ line.category }}</p>
                <button (click)="remove(line.name)">Remove</button>
              </div>
              <div class="quantity">
                <button (click)="change(line.name, -1)">−</button><span>{{ line.qty }}</span
                ><button (click)="change(line.name, 1)">+</button>
              </div>
              <strong>{{ line.price * line.qty | currency: 'EUR' : 'symbol' : '1.0-0' }}</strong>
            </article>
          } @empty {
            <div class="empty">
              Your bag is waiting for its first object. <a href="/">Shop the collection →</a>
            </div>
          }
        </div>
        <aside class="summary">
          <p>ORDER SUMMARY</p>
          <div>
            <span>Subtotal</span
            ><strong>{{ total() | currency: 'EUR' : 'symbol' : '1.0-0' }}</strong>
          </div>
          <div><span>Delivery</span><span>Calculated at checkout</span></div>
          <hr />
          <a href="/checkout" class="button wide">Proceed to checkout <b>→</b></a
          ><small>Taxes and shipping calculated at checkout.</small>
        </aside>
      </section>
    </main>
    <footer><span>© 2026 NOVA OBJECTS</span><span>CART REMOTE / :4201</span></footer>`,
})
export class CartComponent {
  items = signal([
    { name: 'Contour Lamp', category: 'Lighting', price: 128, qty: 1, color: '#e9e0d3', mark: '⌁' },
    { name: 'Arc Chair', category: 'Furniture', price: 640, qty: 1, color: '#c6d0b8', mark: '◒' },
  ]);
  count = computed(() => this.items().reduce((t, x) => t + x.qty, 0));
  total = computed(() => this.items().reduce((t, x) => t + x.price * x.qty, 0));
  change(name: string, amount: number) {
    this.items.update((a) =>
      a.map((x) => (x.name === name ? { ...x, qty: x.qty + amount } : x)).filter((x) => x.qty > 0),
    );
  }
  remove(name: string) {
    this.items.update((a) => a.filter((x) => x.name !== name));
  }
}
