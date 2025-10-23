import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NgOptimizedImage]
})
export class AboutComponent {
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMetaTags({ 
      description: 'PAPI Hair Design je viac než len kaderníctvo. Prečítajte si náš príbeh odvahy a odhodlania priniesť svetovú kvalitu do Košíc.' 
    });
  }
}