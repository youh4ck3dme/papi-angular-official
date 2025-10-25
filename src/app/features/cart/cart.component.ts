import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, NotificationService } from '../../core/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NgOptimizedImage]
})
export class CartComponent {
  cartService = inject(CartService);
  notificationService = inject(NotificationService);

  cartItems = this.cartService.items;
  totalPrice = this.cartService.totalPrice;

  onUpdateQuantity(productId: number, newQuantity: number) {
    this.cartService.updateQuantity(productId, newQuantity);
    if (newQuantity > 0) {
      this.notificationService.show('Košík bol aktualizovaný.', 'info');
    } else {
      this.notificationService.show('Položka bola odstránená z košíka.', 'info');
    }
  }

  onRemoveItem(productId: number, productName: string) {
    this.cartService.removeItem(productId);
    this.notificationService.show(`'${productName}' bol odstránený z košíka.`, 'info');
  }
}