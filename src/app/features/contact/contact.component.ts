import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ContactComponent {
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMetaTags({ 
      description: 'Nájdete nás v Spoločenskom pavilóne v Košiciach. Kontaktujte nás telefonicky alebo emailom. Tešíme sa na vašu návštevu.' 
    });
  }
}