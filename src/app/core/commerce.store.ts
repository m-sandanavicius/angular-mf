import { Injectable, computed, signal } from '@angular/core';
export interface Product { id: number; name: string; category: string; price: number; color: string; image: string; badge?: string; }
export interface CartLine { product: Product; quantity: number; }
const catalog: Product[] = [
  { id: 1, name: 'Contour Lamp', category: 'Lighting', price: 128, color: '#e9e0d3', image: '⌁', badge: 'New' },
  { id: 2, name: 'Arc Chair', category: 'Furniture', price: 640, color: '#c6d0b8', image: '◒', badge: 'Bestseller' },
  { id: 3, name: 'Tactile Vase', category: 'Objects', price: 72, color: '#d9c5b4', image: '▱' },
  { id: 4, name: 'Studio Clock', category: 'Objects', price: 96, color: '#b8cbd0', image: '◷' },
  { id: 5, name: 'Fold Side Table', category: 'Furniture', price: 280, color: '#d8cfbc', image: '⊞' },
  { id: 6, name: 'Halo Mirror', category: 'Objects', price: 220, color: '#e6e1db', image: '◯' },
];
@Injectable({ providedIn: 'root' }) export class CommerceStore {
  readonly products = signal<Product[]>(catalog); readonly cart = signal<CartLine[]>([]);
  readonly cartCount = computed(() => this.cart().reduce((t, x) => t + x.quantity, 0)); readonly subtotal = computed(() => this.cart().reduce((t, x) => t + x.product.price * x.quantity, 0));
  add(product: Product) { this.cart.update(lines => { const l = lines.find(x => x.product.id === product.id); return l ? lines.map(x => x.product.id === product.id ? {...x, quantity: x.quantity + 1} : x) : [...lines, {product, quantity: 1}]; }); }
  updateQuantity(id: number, quantity: number) { this.cart.update(lines => quantity < 1 ? lines.filter(x => x.product.id !== id) : lines.map(x => x.product.id === id ? {...x, quantity} : x)); } clear() { this.cart.set([]); }
  addProduct(product: Product) { this.products.update(items => [product, ...items]); }
}
