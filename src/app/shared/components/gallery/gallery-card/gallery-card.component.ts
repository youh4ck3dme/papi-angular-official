import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RevealOnScrollDirective } from '../../../directives'; // Corrected path

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, RevealOnScrollDirective]
})
export class GalleryCardComponent {
  item = input.required<GalleryItem>();
  index = input.required<number>(); // Used for stagger delay
}