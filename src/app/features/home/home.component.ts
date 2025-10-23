import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink]
})
export class HomeComponent {
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMetaTags({ 
      description: 'Objavte miesto, kde sa precízne remeslo stretáva s moderným umením. V PAPI Hair Design vytvárame viac než len účesy – tvoríme osobnosť.' 
    });
  }
}