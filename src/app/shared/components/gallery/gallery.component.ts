import { Component, ChangeDetectionStrategy, input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryCardComponent, GalleryItem } from './gallery-card/gallery-card.component'; // Direct import from sibling component
import { SeoService } from '../../../core/services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, GalleryCardComponent]
})
export class GalleryComponent {
  private seoService = inject(SeoService);

  // Input for gallery items
  items = input<GalleryItem[]>([
    // Example data
    { id: 1, title: 'Klasický Bob', category: 'Dámske strihy', imageUrl: 'https://picsum.photos/seed/bob/400/500' },
    { id: 2, title: 'Moderný Fade', category: 'Pánske strihy', imageUrl: 'https://picsum.photos/seed/fade/400/500' },
    { id: 3, title: 'Balayage Hnedá', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/balayage/400/500' },
    { id: 4, title: 'Svadobný účes', category: 'Spoločenské účesy', imageUrl: 'https://picsum.photos/seed/wedding/400/500' },
    { id: 5, title: 'Krátky strih s textúrou', category: 'Dámske strihy', imageUrl: 'https://picsum.photos/seed/texture/400/500' },
    { id: 6, title: 'Úprava brady', category: 'Pánske strihy', imageUrl: 'https://picsum.photos/seed/beard/400/500' },
    { id: 7, title: 'Ombré blond', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/ombre/400/500' },
    { id: 8, title: 'Plesový drdol', category: 'Spoločenské účesy', imageUrl: 'https://picsum.photos/seed/prom/400/500' },
    { id: 9, title: 'Pánsky klasický strih', category: 'Pánske strihy', imageUrl: 'https://picsum.photos/seed/classicmen/400/500' },
    { id: 10, title: 'Melír', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/highlights/400/500' }
  ]);

  selectedCategory = signal<string>('Všetky');

  // Computed signal to get unique categories from the items
  uniqueCategories = computed(() => {
    const categories = new Set<string>();
    this.items().forEach(item => categories.add(item.category));
    return ['Všetky', ...Array.from(categories).sort()];
  });

  // Computed signal for filtered items based on selected category
  filteredItems = computed(() => {
    const category = this.selectedCategory();
    if (category === 'Všetky') {
      return this.items();
    }
    return this.items().filter(item => item.category === category);
  });

  constructor() {
    this.seoService.updateMetaTags({
      description: 'Prehliadnite si naše výnimočné kreácie a objavte umenie, ktoré vkladáme do každého strihu, farby a stylingu. Inšpirujte sa majstrovskými premenami a nájdite svoj dokonalý vzhľad v PAPI Hair Design.'
    });
  }

  setFilter(category: string) {
    this.selectedCategory.set(category);
  }
}