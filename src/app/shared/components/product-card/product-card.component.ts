import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage]
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product());
  }
}