import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { finalize } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent]
})
export class ShopComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);

  products = signal<Product[]>([]);
  isLoading = signal(true);

  constructor() {
    this.productService.getProducts()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(products => this.products.set(products));
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.notificationService.show(`'${product.name}' bol pridaný do košíka.`);
  }
}
