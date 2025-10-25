import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../core/services';
import { RevealOnScrollDirective } from '../../directives';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, RevealOnScrollDirective]
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
  index = input.required<number>(); // Used for stagger delay

  onAddToCart() {
    this.addToCart.emit(this.product());
  }
}