import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItem[]>([]);

  totalItems = computed(() => 
    this.items().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() => 
    this.items().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  addToCart(product: Product) {
    this.items.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        // Increase quantity of existing item
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  updateQuantity(productId: number, newQuantity: number) {
    this.items.update(items => {
      if (newQuantity <= 0) {
        // Remove item if quantity is zero or less
        return items.filter(item => item.product.id !== productId);
      } else {
        return items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        );
      }
    });
  }

  removeItem(productId: number) {
    this.items.update(items => 
      items.filter(item => item.product.id !== productId)
    );
  }

  clearCart() {
    this.items.set([]);
  }
}
